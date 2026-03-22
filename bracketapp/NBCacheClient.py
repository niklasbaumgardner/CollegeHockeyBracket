import pickle
from typing import Any, Dict, Iterable, List

import sentry_sdk
from pymemcache import serde
from pymemcache.client.base import Client
from redis import Redis
from valkey import Valkey


class SimpleValkeyClient(Valkey):
    def set(self, name, value):
        if value is None:
            self.delete(name)

        return super().set(name, pickle.dumps(value))

    def get(self, name):
        value = super().get(name)
        if value is None:
            return None
        return pickle.loads(value)

    def set_many(self, values: Dict[bytes | str, Any]):
        return super().mset({k: pickle.dumps(v) for k, v in values.items()})

    def get_many(self, keys: Iterable[bytes | str]) -> Dict[bytes | str, Any]:
        values = super().mget(keys)

        result = {}
        for i in range(len(keys)):
            value = values[i]
            if value is not None:
                result[keys[i]] = pickle.loads(value)

        return result

    def keys(self, name):
        keys = super().keys(name)

        return [k.decode("utf-8") for k in keys]


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

    def set_many(self, values: Dict[bytes | str, Any]):
        return super().mset({k: pickle.dumps(v) for k, v in values.items()})

    def get_many(self, keys: Iterable[bytes | str]) -> Dict[bytes | str, Any]:
        values = super().mget(keys)

        result = {}
        for i in range(len(keys)):
            value = values[i]
            if value is not None:
                result[keys[i]] = pickle.loads(value)

        return result

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
        if not key:
            return
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
        return super().set_many([v for v in values if v], expire, noreply, flags)

    @sentry_sdk.trace(op="cache.get", name="pymemcache")
    def get(self, key: bytes | str, default: Any | None = None) -> Any:
        if not key:
            return None
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
        value = super().get_many([k for k in keys if k])
        if len(value) == 0:
            span.set_data("cache.hit", False)
        else:
            span.set_data("cache.hit", True)
        return value

    @sentry_sdk.trace(op="cache.delete", name="pymemcache")
    def delete(self, key: bytes | str, noreply: bool | None = None) -> bool:
        if not key:
            return False

        span = sentry_sdk.get_current_span()
        span.set_data("cache.key", [key])
        return super().delete(key, noreply)

    @sentry_sdk.trace(op="cache.delete_many", name="pymemcache")
    def delete_many(
        self, keys: Iterable[bytes | str], noreply: bool | None = None
    ) -> bool:
        span = sentry_sdk.get_current_span()
        span.set_data("cache.key", keys)
        return super().delete_many([k for k in keys if k], noreply)

    @sentry_sdk.trace(op="cache.flush_all", name="pymemcache")
    def flush_all(self, delay: int = 0, noreply: bool | None = None) -> bool:
        return super().flush_all(delay, noreply)


class ValkeyClient(Valkey):
    @sentry_sdk.trace(op="cache.set", name="valkey_cache")
    def set(
        self,
        name,
        value,
        ex=None,
        px=None,
        nx=False,
        xx=False,
        keepttl=False,
        get=False,
        exat=None,
        pxat=None,
    ):
        span = sentry_sdk.get_current_span()
        span.set_data("cache.key", [name])

        if value is None:
            self.delete(name)

        return super().set(
            name, pickle.dumps(value), ex, px, nx, xx, keepttl, get, exat, pxat
        )

    @sentry_sdk.trace(op="cache.set_many", name="valkey_cache")
    def set_many(self, mapping):
        span = sentry_sdk.get_current_span()
        span.set_data("cache.key", list(mapping.keys()))

        return self.mset({k: pickle.dumps(v) for k, v in mapping.items()})

    @sentry_sdk.trace(op="cache.get", name="valkey_cache")
    def get(self, name):
        span = sentry_sdk.get_current_span()
        span.set_data("cache.key", [name])
        value = super().get(name)
        if value is None:
            span.set_data("cache.hit", False)
            return None
        else:
            span.set_data("cache.hit", True)
        return pickle.loads(value)

    @sentry_sdk.trace(op="cache.get_many", name="valkey_cache")
    def get_many(self, keys, *args):
        span = sentry_sdk.get_current_span()
        span.set_data("cache.key", keys)
        values = self.mget(keys, *args)

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
    def delete(self, *names):
        span = sentry_sdk.get_current_span()
        span.set_data("cache.key", names)
        return super().delete(*names)

    @sentry_sdk.trace(op="cache.delete_many", name="valkey_cache")
    def delete_many(self, names):
        span = sentry_sdk.get_current_span()
        span.set_data("cache.key", names)
        return super().delete(*names)

    @sentry_sdk.trace(op="cache.flush_all", name="valkey_cache")
    def flush_all(self):
        return self.flushall()

    def keys(self, pattern="*", **kwargs):
        keys = super().keys(pattern, **kwargs)

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

    elif type == "simple_valkey":
        return SimpleValkeyClient(
            host=config.VALKEY_HOST,
            port=config.VALKEY_PORT,
            password=config.VALKEY_PASSWORD,
        )

    elif type == "keydb":
        return RedisClient(
            host=config.KEYDB_HOST,
            port=config.KEYDB_PORT,
            password=config.KEYDB_PASSWORD,
        )
