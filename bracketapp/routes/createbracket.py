from bracketapp.queries import bracket_queries, default_bracket_queries, group_queries
from flask import Blueprint, render_template, redirect, url_for, request, flash
from flask_login import current_user, login_required
from bracketapp.utils import bracket_utils, cache_invalidator
from bracketapp.config import CAN_EDIT_BRACKET, YEAR
from bracketapp.utils.Sqids import sqids
from bracketapp import cache
from bracketapp.utils.constants import (
    bracket_cache_key,
    my_brackets_cache_key,
    LEADERBOARD_CACHE_KEY,
    group_cache_key,
)


createbracket_bp = Blueprint("createbracket_bp", __name__)


@createbracket_bp.get("/create_bracket")
@login_required
def create_bracket():
    if not CAN_EDIT_BRACKET:
        # if we don't have a bracket id and we can't edit, go to viewing my brackets
        flash("Editing is disabled", "danger")
        return redirect(url_for("mybrackets_bp.my_brackets"))

    my_bracket_count = bracket_queries.my_bracket_count()
    if my_bracket_count >= 5:
        # if we don't have a bracket id and we are already at the max number of
        # # brackets, flash a message and go to viewing my brackets
        flash("You have already created 5/5 brackets for this year", "danger")
        return redirect(url_for("mybrackets_bp.my_brackets"))

    bracket = bracket_queries.get_empty_bracket_dict()
    default = default_bracket_queries.get_default_bracket()

    return render_template(
        "edit_bracket.html", bracket=bracket, default=default.to_dict()
    )


@createbracket_bp.post("/create_bracket")
@login_required
def create_bracket_post():
    if not CAN_EDIT_BRACKET:
        # if we can't edit, go to viewing my brackets
        return redirect(url_for("mybrackets_bp.my_brackets"))

    group_sqid = request.args.get("group_sqid")
    group_id = None
    if group_sqid:
        group_id = sqids.decode_one(group_sqid)

    print(f"group_sqid: {group_sqid}, group_id: {group_id}")

    my_bracket_count = bracket_queries.my_bracket_count()
    if my_bracket_count >= 5:
        # if we don't have a bracket id and we are already at the max number of
        # # brackets, flash a message and go to viewing my brackets
        flash("You have already created 5/5 brackets for this year")
        return redirect(url_for("mybrackets_bp.my_brackets"))

    new_bracket_id = bracket_queries.create_bracket_from_form(request.form)

    cache_invalidator.new_bracket(group_id)
    flash("Bracket created", "success")

    if group_id:
        print("how are we here????", group_id)
        group_queries.create_group_bracket(group_id=group_id, bracket_id=new_bracket_id)

        return redirect(url_for("groups_bp.view_group", sqid=group_sqid))

    return redirect(url_for("mybrackets_bp.my_brackets"))
