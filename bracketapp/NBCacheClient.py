import pickle
from typing import Any, Dict, Iterable, List

import sentry_sdk
from pymemcache import serde
from pymemcache.client.base import Client
from redis import Redis
from valkey import Valkey

# class ValkeyClient(Valkey):
#     def set(self, name, value):
#         if value is None:
#             self.delete(name)

#         return super().set(name, pickle.dumps(value))

#     def get(self, name):
#         value = super().get(name)
#         if value is None:
#             return None
#         return pickle.loads(value)

#     def keys(self, name):
#         keys = super().keys(name)

#         return [k.decode("utf-8") for k in keys]


class RedisClient(Redis):
    def set(self, name, value):
        if value is None:
            self.delete(name)

        return super().set(name, pickle.dumps(value))

    def get(self, name):
        value = super().get(name)
        if value is None:
            return None
        return pickle.loads(value)

    def keys(self, name):
        keys = super().keys(name)

        return [k.decode("utf-8") for k in keys]


class NBClient(Client):
    @sentry_sdk.trace(op="cache.set", name="pymemcache")
    def set(
        self,
        key: bytes | str,
        value: Any,
        expire: int = 0,
        noreply: bool | None = None,
        flags: int | None = None,
    ) -> bool | None:
        span = sentry_sdk.get_current_span()
        span.set_data("cache.key", [key])
        return super().set(key, value, expire, noreply, flags)

    @sentry_sdk.trace(op="cache.set_many", name="pymemcache")
    def set_many(
        self,
        values: Dict[bytes | str, Any],
        expire: int = 0,
        noreply: bool | None = None,
        flags: int | None = None,
    ) -> List[bytes | str]:
        span = sentry_sdk.get_current_span()
        span.set_data("cache.key", list(values.keys()))
        return super().set_many(values, expire, noreply, flags)

    @sentry_sdk.trace(op="cache.get", name="pymemcache")
    def get(self, key: bytes | str, default: Any | None = None) -> Any:
        span = sentry_sdk.get_current_span()
        span.set_data("cache.key", [key])
        value = super().get(key, default)
        if value is None:
            span.set_data("cache.hit", False)
        else:
            span.set_data("cache.hit", True)
        return value

    @sentry_sdk.trace(op="cache.get_many", name="pymemcache")
    def get_many(self, keys: Iterable[bytes | str]) -> Dict[bytes | str, Any]:
        span = sentry_sdk.get_current_span()
        span.set_data("cache.key", keys)
        value = super().get_many(keys)
        if len(value) == 0:
            span.set_data("cache.hit", False)
        else:
            span.set_data("cache.hit", True)
        return value

    @sentry_sdk.trace(op="cache.delete", name="pymemcache")
    def delete(self, key: bytes | str, noreply: bool | None = None) -> bool:
        span = sentry_sdk.get_current_span()
        span.set_data("cache.key", [key])
        return super().delete(key, noreply)

    @sentry_sdk.trace(op="cache.delete_many", name="pymemcache")
    def delete_many(
        self, keys: Iterable[bytes | str], noreply: bool | None = None
    ) -> bool:
        span = sentry_sdk.get_current_span()
        span.set_data("cache.key", keys)
        return super().delete_many(keys, noreply)

    @sentry_sdk.trace(op="cache.flush_all", name="pymemcache")
    def flush_all(self, delay: int = 0, noreply: bool | None = None) -> bool:
        return super().flush_all(delay, noreply)


class ValkeyClient(Valkey):
    @sentry_sdk.trace(op="cache.set", name="valkey_cache")
    def set(self, key: bytes | str, value: Any) -> bool | None:
        span = sentry_sdk.get_current_span()
        span.set_data("cache.key", [key])

        if value is None:
            self.delete(key)

        return super().set(key, pickle.dumps(value))

    @sentry_sdk.trace(op="cache.set_many", name="valkey_cache")
    def set_many(self, values: Dict[bytes | str, Any]):
        span = sentry_sdk.get_current_span()
        span.set_data("cache.key", list(values.keys()))

        return super().mset({k: pickle.dumps(v) for k, v in values.items()})

    @sentry_sdk.trace(op="cache.get", name="valkey_cache")
    def get(self, key: bytes | str) -> Any:
        span = sentry_sdk.get_current_span()
        span.set_data("cache.key", [key])
        value = super().get(key)
        if value is None:
            span.set_data("cache.hit", False)
            return None
        else:
            span.set_data("cache.hit", True)
        return pickle.loads(value)

    @sentry_sdk.trace(op="cache.get_many", name="valkey_cache")
    def get_many(self, keys: Iterable[bytes | str]) -> Dict[bytes | str, Any]:
        span = sentry_sdk.get_current_span()
        span.set_data("cache.key", keys)
        values = super().mget(keys)

        result = {}
        for i in range(len(keys)):
            value = values[i]
            if value is not None:
                result[keys[i]] = pickle.loads(value)

        if len(result) == 0:
            span.set_data("cache.hit", False)
        else:
            span.set_data("cache.hit", True)

        return result

    @sentry_sdk.trace(op="cache.delete", name="valkey_cache")
    def delete(self, key: bytes | str, noreply: bool | None = None) -> bool:
        span = sentry_sdk.get_current_span()
        span.set_data("cache.key", [key])
        return super().delete(key, noreply)

    @sentry_sdk.trace(op="cache.delete_many", name="valkey_cache")
    def delete_many(
        self, keys: Iterable[bytes | str], noreply: bool | None = None
    ) -> bool:
        span = sentry_sdk.get_current_span()
        span.set_data("cache.key", keys)
        return super().delete(*keys, noreply)

    @sentry_sdk.trace(op="cache.flush_all", name="valkey_cache")
    def flush_all(self, delay: int = 0, noreply: bool | None = None) -> bool:
        return super().flushall()

    def keys(self, name):
        keys = super().keys(name)

        return [k.decode("utf-8") for k in keys]


def create_cache(type, config):
    if type == "pymemcache":
        return NBClient(
            config.CACHE_MEMCACHED_SERVER,
            serde=serde.pickle_serde,
            connect_timeout=2,
            timeout=1,
            ignore_exc=True,
        )

    elif type == "valkey":
        return ValkeyClient(
            host=config.VALKEY_HOST,
            port=config.VALKEY_PORT,
            password=config.VALKEY_PASSWORD,
        )

    elif type == "redis":
        return RedisClient(
            host=config.KEYDB_HOST,
            port=config.KEYDB_PORT,
            password=config.KEYDB_PASSWORD,
        )
