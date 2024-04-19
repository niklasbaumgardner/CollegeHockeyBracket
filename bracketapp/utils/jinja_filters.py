from jinja2.filters import FILTERS


def to_json(object):
    return object.to_json()


def add_filters():
    FILTERS["to_json"] = to_json
