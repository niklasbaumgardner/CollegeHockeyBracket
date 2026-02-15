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


editbracket_bp = Blueprint("editbracket_bp", __name__)


@editbracket_bp.get("/edit_bracket/<string:sqid>")
@login_required
def edit_bracket(sqid):
    bracket_id = sqids.decode_one(sqid)

    if not CAN_EDIT_BRACKET:
        # if we have a bracket id and we can't edit, go to viewing the bracket
        return redirect(
            url_for("viewbracket_bp.view_bracket", sqid=sqids.encode_one(bracket_id))
        )

    bracket = bracket_queries.get_my_bracket_for_bracket_id(
        bracket_id=bracket_id, include_games=True
    )

    if not bracket:
        return redirect(url_for("mybrackets_bp.my_brackets"))

    default = default_bracket_queries.get_default_bracket()

    return render_template(
        "edit_bracket.html",
        bracket=bracket.to_dict(safe_only=False),
        default=default.to_dict(),
    )


@editbracket_bp.get("/new_bracket")
@login_required
def new_bracket():
    my_bracket_count = bracket_queries.my_bracket_count()
    if my_bracket_count >= 5:
        # if we don't have a bracket id and we are already at the max number of
        # # brackets, flash a message and go to viewing my brackets
        flash("You have already created 5/5 brackets for this year", "danger")
        return redirect(url_for("mybrackets_bp.my_brackets"))

    if not CAN_EDIT_BRACKET:
        # if we don't have a bracket id and we can't edit, go to viewing my brackets
        flash("Editing is disabled", "danger")
        return redirect(url_for("mybrackets_bp.my_brackets"))

    bracket = bracket_queries.get_empty_bracket_dict()
    default = default_bracket_queries.get_default_bracket()

    return render_template(
        "edit_bracket.html", bracket=bracket, default=default.to_dict()
    )


@editbracket_bp.post("/edit_bracket/<string:sqid>")
@login_required
def edit_bracket_post(sqid):
    bracket_id = sqids.decode_one(sqid)

    if not CAN_EDIT_BRACKET:
        # if we have a bracket id and we can't edit, go to viewing the bracket
        return redirect(url_for("viewbracket_bp.view_bracket", sqid=sqid))

    name_changed = bracket_queries.update_bracket_from_form(bracket_id, request.form)

    cache_invalidator.edit_bracket(bracket_id, name_changed)

    flash("Bracket saved", "success")
    return redirect(url_for("mybrackets_bp.my_brackets"))


@editbracket_bp.post("/new_bracket")
@login_required
def new_bracket_post():
    group_sqid = request.args.get("group_sqid")
    group_id = None
    if group_sqid:
        group_id = sqids.decode_one(group_sqid)

    my_bracket_count = bracket_queries.my_bracket_count()
    if my_bracket_count >= 5:
        # if we don't have a bracket id and we are already at the max number of
        # # brackets, flash a message and go to viewing my brackets
        flash("You have already created 5/5 brackets for this year", "danger")
        return redirect(url_for("mybrackets_bp.my_brackets"))

    if not CAN_EDIT_BRACKET:
        # if we can't edit, go to viewing my brackets
        return redirect(url_for("mybrackets_bp.my_brackets"))

    if not group_queries.is_group_member(group_id=group_id):
        flash("You must join this group to submit a bracket", "danger")
        return redirect(url_for("groups_bp.view_group", sqid=group_sqid))

    new_bracket_id = bracket_queries.create_bracket_from_form(request.form)

    cache_invalidator.new_bracket(group_id)

    if group_id:
        group_queries.create_group_bracket(group_id=group_id, bracket_id=new_bracket_id)

        flash("Bracket saved", "success")
        return redirect(url_for("groups_bp.view_group", sqid=group_sqid))

    flash("Bracket saved", "success")
    return redirect(url_for("mybrackets_bp.my_brackets"))


@editbracket_bp.post("/bracket_join_group/<string:sqid>")
@login_required
def bracket_join_group(sqid):
    bracket_id = sqids.decode_one(sqid)

    group_sqid = request.form.get("group_sqid")
    group_id = None
    if group_sqid:
        group_id = sqids.decode_one(group_sqid)

    rowcount = group_queries.create_group_bracket(
        group_id=group_id, bracket_id=bracket_id
    )

    if rowcount == 1:
        flash("Bracket successfully added to group", "success")
        cache_invalidator.new_group_bracket(group_id, bracket_id)
    else:
        flash("Something went wrong", "danger")
        return redirect(url_for("mybrackets_bp.my_brackets"))

    return redirect(url_for("groups_bp.view_group", sqid=group_sqid))
