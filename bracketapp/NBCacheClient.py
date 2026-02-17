from typing import Any, Dict, Iterable, List
import sentry_sdk
from pymemcache.client.base import Client


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
