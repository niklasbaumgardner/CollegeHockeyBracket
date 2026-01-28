from bracketapp.queries import bracket_queries, group_queries
from flask import Blueprint, render_template, redirect, url_for, flash, request
from flask_login import current_user, login_required
from bracketapp.utils import bracket_utils
from bracketapp.config import YEAR, CAN_EDIT_BRACKET
from bracketapp.utils.cache import timed_cache
from bracketapp.utils.constants import MY_BRACKETS_BASE_CACHE_KEY


mybrackets_bp = Blueprint("mybrackets_bp", __name__)


@mybrackets_bp.get("/my_brackets")
@login_required
def my_brackets():
    return render_template("my_brackets.html")


@mybrackets_bp.get("/api/my_brackets")
@login_required
def api_my_brackets():
    cache_key = f"{MY_BRACKETS_BASE_CACHE_KEY}_{current_user.id}"
    if (
        result := timed_cache.get(cache_key)
        and request.args.get("skip_cache") != "true"
    ):
        return result

    brackets = [
        b.to_dict(safe_only=False)
        for b in bracket_queries.get_my_brackets(include_group_brackets=True)
    ]

    groups = group_queries.get_all_groups_for_user()
    # TODO: Make this better?
    # I unfortunately don't have a better way to do this.
    for g in groups:
        group_brackets = []
        for b in g.brackets:
            group_brackets.append(b.to_dict(safe_only=False))
        g.brackets = group_brackets

    groups = [g.to_dict() for g in groups]

    timed_cache.set(cache_key, dict(brackets=brackets, groups=groups, year=YEAR))

    return timed_cache.get(cache_key)
