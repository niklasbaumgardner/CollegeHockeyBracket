from sqlalchemy.inspection import inspect as sa_inspect
from typing import Any, Optional


class SerializerMixin:
    serialize_only: Optional[tuple[str, ...]] = None
    serialize_rules: Optional[tuple[str, ...]] = None
    custom_mappings: Optional[dict[str, str]] = None

    def get_serialize_only(self, only):
        only = only or tuple()
        only = self.serialize_only or tuple() + only
        return only

    def get_serialize_rules(self, rules):
        rules = rules or tuple()
        rules = self.serialize_rules or tuple() + rules
        return rules

    def get_custom_mappings(self, mappings):
        mappings = mappings or {}
        mappings = self.custom_mappings or {} | mappings
        return mappings

    def to_dict(self, rules=None, only=None, mappings=None) -> dict:
        inspector = sa_inspect(self)
        sa_keys = {a.key for a in inspector.mapper.attrs}

        include = set()
        exclude = set()

        only = self.get_serialize_only(only)
        rules = self.get_serialize_rules(rules)

        keys = None
        if only is not None and len(only) > 0:
            keys = only

        else:
            keys = tuple(sa_keys)
            for rule in rules:
                if rule.startswith("-"):
                    exclude.add(rule[1:])
                else:
                    include.add(rule)

            keys += tuple(include)

        keys = tuple(sorted(list(keys)))

        data: dict[Any, Any] = {}

        custom_mappings = self.get_custom_mappings(mappings)

        for key in keys:
            if key in exclude:
                continue

            if key in custom_mappings:
                data[key] = serialize(getattr(self, custom_mappings[key]))
            else:
                data[key] = serialize(getattr(self, key))

        return data


def serialize(value):
    KEEP_DEFAULT_TYPES = [int, float, str, bool]
    value_type = type(value)
    if value is None:
        return None
    elif value_type in KEEP_DEFAULT_TYPES:
        return value
    elif isinstance(value, list):
        return [serialize(v) for v in value]
    elif isinstance(value, dict):
        return {serialize(k): serialize(v) for k, v in value.items()}
    elif callable(value):
        return serialize(value())
    elif hasattr(value, "to_dict"):
        return value.to_dict()
    else:
        return str(value)
