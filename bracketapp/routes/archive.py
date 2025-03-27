from bracketapp.queries import bracket_queries
from flask import Blueprint, render_template, redirect, url_for
from bracketapp.utils import bracket_utils


archive_bp = Blueprint("archive_bp", __name__)


@archive_bp.get("/archive")
def archive():
    archived_years = bracket_queries.get_all_completed_correct_brackets()

    return render_template("archive.html", archived_years=archived_years)


@archive_bp.get("/archive/<int:year>")
def archive_year(year):
    standings, winners, correct = bracket_utils.get_bracket_standings_for_year(year)

    if len(standings) == 0:
        return redirect(url_for("viewbracket_bp.view_cbracket", year=correct.year))

    return render_template(
        "standings.html",
        content_url=url_for("archive_bp.api_archive_year", year=correct.year),
    )


@archive_bp.get("/api/archive/<int:year>")
def api_archive_year(year):
    # TODO: return the correct bracket if possible?
    # I forgot what I meant by this. Maybe bring correct to the
    # page to show correct winners on brackets table?
    standings, winners, correct = bracket_utils.get_bracket_standings_for_year(year)

    standings_dict = [correct.to_dict(include_games=False)] + [
        b.to_dict(safe_only=False, include_games=False) for b in standings
    ]
    winners_dict = [b.to_dict(safe_only=False, include_games=False) for b in winners]

    return dict(
        standings=standings_dict,
        winners=winners_dict,
        year=year,
    )
