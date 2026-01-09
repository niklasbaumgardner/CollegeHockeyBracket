from sqlalchemy.inspection import inspect as sa_inspect
from typing import Any, Optional


class SerializerMixin:
    serialize_only: Optional[tuple[str, ...]] = None
    serialize_rules: Optional[tuple[str, ...]] = None
    custom_mappings: Optional[dict[str, str]] = None

    def get_self_attributes(self):
        inspector = sa_inspect(self)
        attributes = {a.key for a in inspector.mapper.attrs}
        return attributes

    def get_serialize_only(self, only):
        only = only or tuple()
        only = (self.serialize_only or tuple()) + only
        return only

    def get_serialize_rules(self, rules):
        rules = rules or tuple()
        rules = (self.serialize_rules or tuple()) + rules
        return rules

    def get_custom_mappings(self, mappings):
        mappings = mappings or {}
        mappings = (self.custom_mappings or {}) | mappings
        return mappings

    def is_excluded(self, key, path, excludes):
        if key in excludes:
            return True

        for exclusion in excludes:
            if path.endswith(exclusion):
                return True

        return False

    def to_dict(self, rules=None, only=None, mappings=None, path=None, depth=0) -> dict:
        # print(path, depth)
        if depth > 5:
            return {}

        attributes = self.get_self_attributes()

        if path is None:
            path = ""

        include = set()
        exclude = set()

        only = self.get_serialize_only(only)
        rules = self.get_serialize_rules(rules)

        keys = None
        if only is not None and len(only) > 0:
            keys = only

        else:
            keys = tuple(attributes)
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
            if not hasattr(self, key):
                continue
            current_path = path
            if len(current_path):
                current_path += "."
            current_path += key
            # print(f"CURRENT PATH: {current_path}, KEY: {key}, EXCLUDE: {exclude}")

            if self.is_excluded(key, current_path, exclude):
                continue

            if key in custom_mappings:
                data[key] = self.serialize(
                    key, getattr(self, custom_mappings[key]), current_path, depth, rules
                )
            else:
                data[key] = self.serialize(
                    key, getattr(self, key), current_path, depth, rules
                )

        return data

    def serialize(self, key, value, path, depth, rules):
        KEEP_DEFAULT_TYPES = [int, float, str, bool]
        value_type = type(value)
        if value is None:
            return None
        elif value_type in KEEP_DEFAULT_TYPES:
            return value
        elif isinstance(value, list):
            # if len(path):
            #     path += "."
            # path += key
            return [self.serialize(key, v, path, depth, rules) for v in value]
        elif isinstance(value, dict):
            if len(path):
                path += "."
            path += key
            return {
                self.serialize(key, k, path, depth + 1, rules): self.serialize(
                    k, v, path, depth + 1, rules
                )
                for k, v in value.items()
            }
        elif callable(value):
            return self.serialize(key, value(), path, depth, rules)
        elif isinstance(value, SerializerMixin):
            return value.to_dict(depth=depth + 1, path=path, rules=rules)
        elif hasattr(value, "to_dict"):
            return value.to_dict()
        else:
            return str(value)
