from click import group
from bracketapp.utils import cache_invalidator
from bracketapp.utils.constants import bracket_cache_key, group_cache_key
from bracketapp import cache
from bracketapp.queries import bracket_queries, group_queries
from flask import Blueprint, redirect, url_for, flash
from flask_login import login_required
from bracketapp.config import CAN_EDIT_BRACKET, YEAR
from bracketapp.utils.Sqids import sqids


deletebracket_bp = Blueprint("deletebracket_bp", __name__)


@deletebracket_bp.post("/delete_bracket/<string:sqid>")
@login_required
def delete_bracket(sqid):
    bracket_id = sqids.decode_one(sqid)

    rowcount = bracket_queries.delete_bracket(bracket_id=bracket_id)
    if rowcount == 1:
        flash("Bracket successfully deleted")
        cache_invalidator.delete_bracket(bracket_id)
    else:
        flash("Something went wrong", "danger")

    return redirect(url_for("mybrackets_bp.my_brackets"))


@deletebracket_bp.post("/delete_group_bracket/<string:sqid>")
@login_required
def delete_group_bracket(sqid):
    group_bracket_id = sqids.decode_one(sqid)

    rowcount, bracket_id, group_id = group_queries.delete_group_bracket(
        group_bracket_id=group_bracket_id
    )

    if rowcount == 1:
        flash("Bracket successfully removed from group")
        cache_invalidator.delete_group_bracket(group_id, bracket_id)
    else:
        flash("Something went wrong", "danger")

    return redirect(url_for("mybrackets_bp.my_brackets"))
