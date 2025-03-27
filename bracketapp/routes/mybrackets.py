from bracketapp.queries import bracket_queries, group_queries
from flask import Blueprint, render_template, redirect, url_for
from flask_login import current_user, login_required
from bracketapp.utils import bracket_utils
from bracketapp.config import YEAR, CAN_EDIT_BRACKET
from bracketapp import app


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
    return render_template("my_brackets.html")


@mybrackets_bp.get("/api/my_brackets")
@login_required
def api_my_brackets():
    brackets = [
        b.to_dict(safe_only=False)
        for b in bracket_queries.get_all_my_brackets(
            sort=True, include_group_brackets=True
        )
    ]

    groups = [g.to_dict() for g in group_queries.get_all_groups_for_user(sort=True)]

    return dict(
        brackets=brackets,
        groups=groups,
        year=YEAR,
    )
