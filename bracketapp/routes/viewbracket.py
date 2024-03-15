from bracketapp.queries import bracket_queries
from flask import Blueprint, render_template, redirect, url_for
from flask_login import current_user
from bracketapp.utils import bracket_utils
from bracketapp.config import YEAR, CAN_EDIT_BRACKET


viewbracket_bp = Blueprint("viewbracket_bp", __name__)


def isAdmin():
    return current_user.id == 1


@viewbracket_bp.route("/view_bracket", defaults={"id": None}, methods=["GET"])
@viewbracket_bp.route("/view_bracket/<int:id>", methods=["GET"])
def view_bracket(id):
    bracket = None

    if id:
        bracket = bracket_queries.get_bracket_for_bracket_id(bracket_id=id)
        if not (
            bracket.user_id == current_user.id
            or not CAN_EDIT_BRACKET
            or bracket.year < YEAR
        ):
            return redirect(url_for("index_bp.index"))

    elif current_user.is_authenticated:
        if CAN_EDIT_BRACKET:
            return redirect(url_for("editbracket_bp.edit_bracket"))
        else:
            bracket = bracket_queries.get_bracket_for_user_id(user_id=current_user.id)
    else:
        return redirect(url_for("auth_bp.login"))

    default = bracket_utils.DefaultBracketInterface()
    try:
        correct = bracket_utils.CorrectBracketInterface()
    except:
        correct = None

    if not bracket and CAN_EDIT_BRACKET and current_user.is_authenticated():
        return redirect(url_for("editbracket_bp.edit_bracket"))
    elif not bracket:
        return redirect(url_for("index_bp.index"))

    mine = "active" if current_user.id == bracket.user_id else ""

    bracket = bracket_utils.BracketInterface(
        bracket_id=bracket.id, bracket=bracket, safe_only=False
    )

    return render_template(
        "view_bracket.html",
        CAN_EDIT_BRACKET=CAN_EDIT_BRACKET,
        mine=mine,
        correct=correct.to_json(),
        default=default.to_json(),
        bracket=bracket.to_json(),
        bracket_winner_img=bracket.img_url,
        correct_winner_img=correct.img_url,
        name=bracket.bracket.name,
        year=bracket.bracket.year,
    )


@viewbracket_bp.route("/view_cbracket/<int:year>", methods=["GET"])
def view_cbracket(year):
    if year >= YEAR and not isAdmin():
        return redirect(url_for("archive_bp.archive"))

    correct = bracket_utils.CorrectBracketInterface(year=year)

    if not correct:
        return redirect(url_for("archive_bp.archive"))

    default = bracket_utils.DefaultBracketInterface(year=year)

    return render_template(
        "view_cbracket.html",
        correct=correct.to_json(),
        default=default.to_json(),
        year=correct.bracket.year,
    )
