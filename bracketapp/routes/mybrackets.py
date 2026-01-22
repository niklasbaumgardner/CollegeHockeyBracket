from bracketapp.queries import bracket_queries, group_queries
from flask import Blueprint, render_template, redirect, url_for, flash
from flask_login import current_user, login_required
from bracketapp.utils import bracket_utils
from bracketapp.config import YEAR, CAN_EDIT_BRACKET
from bracketapp import app


mybrackets_bp = Blueprint("mybrackets_bp", __name__)


@mybrackets_bp.get("/my_brackets")
@login_required
def my_brackets():
    return render_template("my_brackets.html")


@mybrackets_bp.get("/api/my_brackets")
@login_required
def api_my_brackets():
    brackets = [
        b.to_dict(safe_only=False)
        for b in bracket_queries.get_my_brackets(include_group_brackets=True)
    ]

    groups = group_queries.get_all_groups_for_user()
    # TODO: Make this better?
    # I unfortunately don't have a better way to do this.
    for g in groups:
        group_brackets = []
        for b in g.brackets:
            group_brackets.append(b.to_dict(safe_only=False))
        g.brackets = group_brackets

    groups = [g.to_dict() for g in groups]

    return dict(brackets=brackets, groups=groups, year=YEAR)
