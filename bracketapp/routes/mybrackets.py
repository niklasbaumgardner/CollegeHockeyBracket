from flask import Blueprint, render_template
from flask_login import current_user, login_required

from bracketapp import cache
from bracketapp.globals import YEAR
from bracketapp.queries import bracket_queries, group_queries
from bracketapp.utils.constants import my_bracket_years_cache_key, my_brackets_cache_key

mybrackets_bp = Blueprint("mybrackets_bp", __name__)


@mybrackets_bp.get("/my_brackets")
@login_required
def my_brackets():
    return render_template("my_brackets.html")


@mybrackets_bp.get("/api/my_brackets")
@mybrackets_bp.get("/api/my_brackets/<int:year>")
@login_required
def api_my_brackets(year=None):
    my_b_cache_key = my_brackets_cache_key(current_user.id, year)
    years_cache_key = my_bracket_years_cache_key(current_user.id)
    cache_dict = cache.get_many([my_b_cache_key, years_cache_key])

    cache_hits = 0

    if not (brackets_data := cache_dict.get(my_b_cache_key)):
        brackets = [
            b.to_dict(safe_only=False) for b in bracket_queries.get_my_brackets(year)
        ]

        groups = group_queries.get_all_groups_for_user(year)
        # TODO: Make this better?
        # I unfortunately don't have a better way to do this.
        for g in groups:
            group_brackets = []
            for b in g.brackets:
                group_brackets.append(b.to_dict(safe_only=False))
            g.brackets = group_brackets

        groups = [g.to_dict() for g in groups]

        brackets_data = dict(
            brackets=brackets,
            groups=groups,
            year=year or YEAR,
        )
    else:
        cache_hits += 1

    if not (years := cache_dict.get(years_cache_key)):
        years = bracket_queries.get_my_bracket_years()
    else:
        cache_hits += 1

    if cache_hits == 2:
        return dict(**brackets_data, years=years)

    cache.set_many({my_b_cache_key: brackets_data, years_cache_key: years})

    return dict(**brackets_data, years=years)
