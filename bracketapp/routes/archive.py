from flask import Blueprint, render_template
from bracketapp.utils import queries, bracketUtils


archive_bp = Blueprint("archive_bp", __name__)


@archive_bp.route("/archive", defaults={"year": None}, methods={"GET"})
@archive_bp.route("/archive/<int:year>", methods={"GET"})
def archive(year):
    if not year:
        archived_years = []

        for y in range(2022, 2015, -1):
            if y == 2020:
                # covid
                continue
            bracket = queries.getCorrectBracketForYear(y)
            if bracket and bracket.winner:
                archived_years.append(bracketUtils.baseCorrectBracket(year=y))

        return render_template("archive.html", archived_years=archived_years)
    else:
        standings, correct = bracketUtils.getBracketStandingsForYear(year)
        return render_template(
            "standings.html", brackets=standings, correct=correct, can_click=True
        )
