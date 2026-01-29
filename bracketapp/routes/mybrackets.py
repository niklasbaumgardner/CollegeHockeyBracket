from bracketapp.queries import bracket_queries, group_queries
from flask import Blueprint, render_template, redirect, url_for, flash, request
from flask_login import current_user, login_required
from bracketapp.utils import bracket_utils
from bracketapp.config import YEAR, CAN_EDIT_BRACKET
from bracketapp import cache
from bracketapp.utils.constants import my_brackets_cache_key


mybrackets_bp = Blueprint("mybrackets_bp", __name__)


@mybrackets_bp.get("/my_brackets")
@login_required
def my_brackets():
    return render_template("my_brackets.html")


@mybrackets_bp.get("/api/my_brackets")
@login_required
def api_my_brackets():
    cache_key = my_brackets_cache_key(current_user.id)
    if result := cache.get(cache_key):
        return result

    brackets = [b.to_dict(safe_only=False) for b in bracket_queries.get_my_brackets()]

    groups = group_queries.get_all_groups_for_user()
    # TODO: Make this better?
    # I unfortunately don't have a better way to do this.
    for g in groups:
        group_brackets = []
        for b in g.brackets:
            group_brackets.append(b.to_dict(safe_only=False))
        g.brackets = group_brackets

    groups = [g.to_dict() for g in groups]

    value = dict(brackets=brackets, groups=groups, year=YEAR)

    cache.set(cache_key, value)

    return value
