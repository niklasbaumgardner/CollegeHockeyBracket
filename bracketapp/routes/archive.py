from flask import Blueprint, redirect, render_template, url_for

from bracketapp import cache
from bracketapp.queries import correct_bracket_queries
from bracketapp.utils import bracket_utils
from bracketapp.utils.constants import ARCHIVE_YEARS_CACHE_KEY, archive_year_cache_key

archive_bp = Blueprint("archive_bp", __name__)


@archive_bp.get("/archive")
def archive():
    if result := cache.get(ARCHIVE_YEARS_CACHE_KEY):
        archived_years = result
    else:
        archived_years = [
            cb.to_dict()
            for cb in correct_bracket_queries.get_all_completed_correct_brackets()
        ]

        cache.set(ARCHIVE_YEARS_CACHE_KEY, archived_years)

    return render_template("archive.html", archived_years=archived_years)


@archive_bp.get("/archive/<int:year>")
def archive_year(year):
    standings, winners, correct = bracket_utils.get_bracket_standings(year)

    if len(standings) == 0:
        return redirect(url_for("viewbracket_bp.view_cbracket", year=correct.year))

    return render_template(
        "standings.html",
        content_url=url_for("archive_bp.api_archive_year", year=correct.year),
    )


@archive_bp.get("/api/archive/<int:year>")
def api_archive_year(year):
    cache_key = archive_year_cache_key(year)
    if result := cache.get(cache_key):
        return result

    standings, winners, correct = bracket_utils.get_bracket_standings(year)

    standings_dict = [correct.to_dict()] + [
        b.to_dict(safe_only=False) for b in standings
    ]
    winners_dict = [b.to_dict(safe_only=False) for b in winners]

    value = dict(
        standings=standings_dict,
        winners=winners_dict,
        year=year,
    )

    cache.set(
        cache_key,
        value,
    )

    return value
