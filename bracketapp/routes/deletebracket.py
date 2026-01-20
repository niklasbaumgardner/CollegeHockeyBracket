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
    # bracket = bracket_queries.get_my_bracket_for_bracket_id(bracket_id=bracket_id)
    # if bracket and bracket.year == YEAR and CAN_EDIT_BRACKET:
    rowcount_deleted = bracket_queries.delete_bracket(bracket_id=bracket_id)
    if rowcount_deleted == 1:
        flash("Bracket successfully deleted", "success")
    else:
        flash("Something went wrong", "danger")

    return redirect(url_for("mybrackets_bp.my_brackets"))


@deletebracket_bp.post("/delete_group_bracket/<string:sqid>")
@login_required
def delete_group_bracket(sqid):
    group_bracket_id = sqids.decode_one(sqid)
    group_bracket = group_queries.get_my_group_bracket_for_id(
        group_bracket_id=group_bracket_id
    )
    if not group_bracket:
        return redirect(url_for("mybrackets_bp.my_brackets"))

    bracket = bracket_queries.get_my_bracket_for_bracket_id(
        bracket_id=group_bracket.bracket_id
    )
    if bracket and bracket.year == YEAR:
        rowcount_deleted = group_queries.delete_group_bracket(
            group_bracket_id=group_bracket.id
        )
        if rowcount_deleted == 1:
            flash("Bracket successfully removed from group", "success")
        else:
            flash("Something went wrong", "danger")

    return redirect(url_for("mybrackets_bp.my_brackets"))
