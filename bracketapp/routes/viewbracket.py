from flask import Blueprint, redirect, render_template, request, url_for
from flask_login import current_user

from bracketapp.globals import CAN_EDIT_BRACKET, YEAR
from bracketapp.queries import (
    bracket_queries,
    correct_bracket_queries,
    default_bracket_queries,
)
from bracketapp.utils.Sqids import sqids

viewbracket_bp = Blueprint("viewbracket_bp", __name__)


@viewbracket_bp.get("/bracket/<string:sqid>")
def view_bracket(sqid):
    bracket_id = sqids.decode_one(sqid)
    bracket = bracket_queries.get_bracket_for_bracket_id(bracket_id=bracket_id)
    if not bracket:
        return redirect(url_for("leaderboard_bp.index"))

    force_view = "force" in request.args

    my_bracket = current_user.is_authenticated and bracket.user_id == current_user.id

    if CAN_EDIT_BRACKET and bracket.year == YEAR:
        if my_bracket:
            if not force_view:
                return redirect(url_for("editbracket_bp.edit_bracket", sqid=sqid))
        else:
            return redirect(url_for("leaderboard_bp.index"))

    default = default_bracket_queries.get_default_bracket(year=bracket.year)
    correct = correct_bracket_queries.get_correct_bracket(
        year=bracket.year, include_games=True
    )

    return render_template(
        "view_bracket.html",
        correct=correct.to_dict(),
        default=default.to_dict(),
        bracket=bracket.to_dict(safe_only=False),
        bracket_winner_img=bracket.winner_team.team.icon_path,
        correct_winner_img=(
            correct.winner_team.team.icon_path if correct.winner_team else ""
        ),
        name=bracket.name,
        year=bracket.year,
        my_bracket=my_bracket,
    )


@viewbracket_bp.get("/finalbracket/<int:year>")
def view_cbracket(year):
    if (CAN_EDIT_BRACKET and year == YEAR) and not current_user.is_admin():
        return redirect(url_for("archive_bp.archive"))

    correct = correct_bracket_queries.get_correct_bracket(year, include_games=True)

    if not correct or (correct and not correct.winner_id):
        return redirect(url_for("archive_bp.archive"))

    default = default_bracket_queries.get_default_bracket(year)

    return render_template(
        "view_cbracket.html",
        correct=correct.to_dict(),
        default=default.to_dict(),
        year=correct.year,
    )
