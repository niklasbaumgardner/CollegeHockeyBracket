from bracketapp.queries import bracket_queries
from flask import Blueprint, render_template
from bracketapp.utils import bracket_utils


archive_bp = Blueprint("archive_bp", __name__)


@archive_bp.route("/archive", defaults={"year": None}, methods={"GET"})
@archive_bp.route("/archive/<int:year>", methods={"GET"})
def archive(year):
    if not year:
        archived_years = bracket_queries.get_all_completed_correct_brackets()

        return render_template("archive.html", archived_years=archived_years)
    else:
        standings, correct = bracket_utils.get_bracket_standings_for_year(year)
        message = bracket_utils.get_archive_message(standings)
        standings_json = [correct.to_dict(include_games=False)] + [
            b.to_dict(safe_only=False, include_games=False) for b in standings
        ]

        return render_template(
            "standings.html",
            standings=standings_json,
            CAN_CLICK=True,
            year=year,
            message=message,
        )
