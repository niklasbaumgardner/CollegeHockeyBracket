from bracketapp.queries import bracket_queries
from flask import Blueprint, render_template, redirect, url_for
from flask_login import current_user
from bracketapp.utils import bracket_utils
from bracketapp.config import CAN_EDIT_BRACKET, YEAR


viewbracket_bp = Blueprint("viewbracket_bp", __name__)


def is_admin():
    return (
        current_user.is_authenticated
        and current_user.role is not None
        and current_user.role > 1
    )


@viewbracket_bp.get("/view_bracket/<int:id>")
def view_bracket(id):
    bracket = bracket_queries.get_bracket_for_bracket_id(bracket_id=id)
    if not bracket:
        return redirect(url_for("leaderboard_bp.index"))

    my_bracket = current_user.is_authenticated and bracket.user_id == current_user.id

    if CAN_EDIT_BRACKET and bracket.year == YEAR:
        if my_bracket:
            # if not app.debug:
            return redirect(url_for("editbracket_bp.edit_bracket", id=bracket.id))
        else:
            return redirect(url_for("leaderboard_bp.index"))

    default = bracket_queries.get_default_bracket_for_year(year=bracket.year)
    correct = bracket_queries.get_correct_bracket_for_year(year=bracket.year)

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


@viewbracket_bp.route("/view_cbracket/<int:year>", methods=["GET"])
def view_cbracket(year):
    if (CAN_EDIT_BRACKET and year == YEAR) and not is_admin():
        return redirect(url_for("archive_bp.archive"))

    correct = bracket_queries.get_correct_bracket_for_year(year)

    if not correct or (correct and not correct.winner):
        return redirect(url_for("archive_bp.archive"))

    default = bracket_queries.get_default_bracket_for_year(year)

    return render_template(
        "view_cbracket.html",
        correct=correct.to_dict(),
        default=default.to_dict(),
        year=correct.year,
    )
