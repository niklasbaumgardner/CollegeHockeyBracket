from bracketapp.queries import bracket_queries
from flask import Blueprint, render_template, redirect, url_for
from flask_login import current_user, login_required
from bracketapp.utils import bracket_utils
from bracketapp.config import YEAR, CAN_EDIT_BRACKET


mybrackets_bp = Blueprint("mybrackets_bp", __name__)


def is_admin():
    return (
        current_user.is_authenticated
        and current_user.role is not None
        and current_user.role > 1
    )


@mybrackets_bp.get("/my_brackets")
@login_required
def my_brackets():
    brackets = [
        b.to_dict(safe_only=False)
        for b in bracket_queries.get_all_brackets_for_user(sort=True)
    ]

    if len(brackets) == 1 and not CAN_EDIT_BRACKET:
        return redirect(url_for("viewbracket_bp.view_bracket", id=brackets[0]["id"]))

    return render_template(
        "my_brackets.html",
        CAN_EDIT_BRACKET=CAN_EDIT_BRACKET,
        brackets=brackets,
        number_of_brackets=len(brackets),
        year=YEAR,
    )
