from bracketapp.queries import bracket_queries
from flask import Blueprint, render_template
from bracketapp.utils import bracket_utils


archive_bp = Blueprint("archive_bp", __name__)


@archive_bp.route("/archive", defaults={"year": None}, methods={"GET"})
@archive_bp.route("/archive/<int:year>", methods={"GET"})
def archive(year):
    if not year:
        archived_years = []
        for cb in bracket_queries.get_all_completed_correct_brackets():
            archived_years.append(bracket_utils.BaseCorrectBracketInterface(bracket=cb))

        return render_template("archive.html", archived_years=archived_years)
    else:
        standings, correct = bracket_utils.get_bracket_standings_for_year(year)
        standings_json = [correct.to_json()] + [b.to_json() for b in standings]
        return render_template(
            "standings.html",
            standings=standings_json,
            CAN_CLICK=True,
            year=year,
        )
