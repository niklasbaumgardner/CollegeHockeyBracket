from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import login_required

from bracketapp.config import CAN_EDIT_BRACKET
from bracketapp.queries import bracket_queries, default_bracket_queries, group_queries
from bracketapp.utils import cache_invalidator
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
        return redirect(url_for("mybrackets_bp.my_brackets"))

    default = default_bracket_queries.get_default_bracket()

    return render_template(
        "edit_bracket.html",
        bracket=bracket.to_dict(safe_only=False),
        default=default.to_dict(),
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
