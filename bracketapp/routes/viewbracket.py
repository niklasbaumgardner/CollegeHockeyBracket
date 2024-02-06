from flask import Blueprint, render_template, redirect, url_for
from flask_login import current_user
from bracketapp.utils import queries, bracketUtils
from bracketapp.config import YEAR, CAN_EDIT_BRACKET


viewbracket_bp = Blueprint("viewbracket_bp", __name__)


def isAdmin():
    return current_user.id == 1


@viewbracket_bp.route("/view_bracket/<int:year>/<int:id>", methods=["GET"])
def view_archive_bracket(year, id):
    if year == YEAR and CAN_EDIT_BRACKET:
        return redirect(url_for("index_bp.index"))

    bracket = bracketUtils.userBracket(bracket_id=id, year=year)
    default = bracketUtils.fullDefaultBracket(year=year)
    correct = bracketUtils.fullCorrectBracket(year=year)

    mine = "active" if current_user.get_id() == str(bracket.user_id) else ""

    return render_template(
        "view_bracket.html",
        mine=mine,
        correct_json=correct.tojson(),
        default_json=default.tojson(),
        bracket_json=bracket.tojson(),
        bracket_winner_img=bracket.img_url,
        correct_winner_img=correct.img_url,
        name=bracket.bracket.name,
        year=bracket.bracket.year,
    )


@viewbracket_bp.route("/view_bracket", defaults={"id": None}, methods=["GET"])
@viewbracket_bp.route("/view_bracket/<int:id>", methods=["GET"])
def view_bracket(id):
    current_user_id = current_user.get_id()
    can_view_brackets = not CAN_EDIT_BRACKET

    if id and can_view_brackets:
        bracket = queries.getUserBracketForBracketId(id)

    else:
        if current_user_id:
            bracket = queries.getUserBracketForUserId(user_id=current_user_id)
            if not bracket:
                if CAN_EDIT_BRACKET:
                    return redirect(url_for("editbracket_bp.edit_bracket"))
                else:
                    return redirect(url_for("index_bp.index"))
        else:
            return redirect(url_for("auth_bp.login"))

    default = bracketUtils.fullDefaultBracket()
    try:
        correct = bracketUtils.fullCorrectBracket()
    except:
        correct = None

    if not bracket and CAN_EDIT_BRACKET and current_user.is_authenticated():
        return redirect(url_for("editbracket_bp.edit_bracket"))
    elif not bracket:
        return redirect(url_for("index_bp.index"))

    mine = "active" if current_user_id == str(bracket.user_id) else ""

    bracket = bracketUtils.userBracket(bracket_id=bracket.id, bracket=bracket)

    return render_template(
        "view_bracket.html",
        can_edit=CAN_EDIT_BRACKET,
        mine=mine,
        correct_json=correct.tojson(),
        default_json=default.tojson(),
        bracket_json=bracket.tojson(),
        bracket_winner_img=bracket.img_url,
        correct_winner_img=correct.img_url,
        name=bracket.bracket.name,
        year=bracket.bracket.year,
    )


@viewbracket_bp.route("/view_cbracket/<int:year>", methods=["GET"])
def view_cbracket(year):
    if year >= YEAR and not isAdmin():
        return redirect(url_for("archive_bp.archive"))

    correct = bracketUtils.fullCorrectBracket(year=year)

    if not correct:
        return redirect(url_for("archive_bp.archive"))

    default = bracketUtils.fullDefaultBracket(year=year)

    return render_template(
        "view_cbracket.html",
        correct_json=correct.tojson(),
        default_json=default.tojson(),
        year=correct.bracket.year,
    )
