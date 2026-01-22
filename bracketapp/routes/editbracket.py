from bracketapp.queries import bracket_queries, default_bracket_queries, group_queries
from flask import Blueprint, render_template, redirect, url_for, request, flash
from flask_login import current_user, login_required
from bracketapp.utils import bracket_utils
from bracketapp.config import CAN_EDIT_BRACKET
from bracketapp.utils.Sqids import sqids


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
        # This seems better
        return redirect(url_for("mybrackets_bp.my_brackets"))
        # is this really what i want to do?
        # return redirect(
        #     url_for("viewbracket_bp.view_bracket", sqid=sqids.encode_one(bracket_id))
        # )

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
        return redirect(url_for("viewbracket_bp.view_bracket", id=bracket_id))

    bracket_queries.update_bracket_from_form(bracket_id, request.form)

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

    group = group_queries.get_group(group_id=group_id)
    if not group:
        flash("Sorry, this group could not be found", "danger")
        return redirect(url_for("mybrackets_bp.my_brackets"))

    bracket = bracket_queries.get_my_bracket_for_bracket_id(bracket_id=bracket_id)
    if not bracket:
        flash("Sorry, this bracket could not be found", "danger")
        return redirect(url_for("mybrackets_bp.my_brackets"))

    group_queries.create_group_bracket(group_id=group.id, bracket_id=bracket.id)

    flash(f"Your bracket has been added to {group.name}", "success")
    return redirect(url_for("groups_bp.view_group", sqid=group_sqid))
