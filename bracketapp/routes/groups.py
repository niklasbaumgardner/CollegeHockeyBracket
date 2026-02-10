from flask import Blueprint, render_template
from bracketapp.utils import bracket_utils, cache_invalidator
from bracketapp.config import CAN_EDIT_BRACKET, YEAR
from bracketapp.queries import bracket_queries, group_queries
from flask import Blueprint, render_template, redirect, url_for, request, flash
from flask_login import current_user, login_required
from bracketapp.utils.Sqids import sqids
from bracketapp import cache
from bracketapp.utils.constants import (
    group_cache_key,
    bracket_cache_key,
    my_brackets_cache_key,
)


groups_bp = Blueprint("groups_bp", __name__)


@groups_bp.get("/group/<string:sqid>")
def view_group(sqid):
    group_id = sqids.decode_one(sqid)

    cache_key = group_cache_key(group_id)
    if result := cache.get(cache_key):
        group = result["group"]
    else:
        group = group_queries.get_group(group_id=group_id)
        group = group.to_dict() if group else None

    # TODO: fix viewability
    # ESPN allows viewing any group (public and private) while logged in and not logged in
    # maybe it's not allowed while CAN_EDIT_BRACKET?

    if not group:
        flash("Sorry. This group doesn't exist")
        return redirect(url_for("leaderboard_bp.index"))

    return render_template("view_group.html", group=group)


@groups_bp.get("/api/group/<string:sqid>")
def api_view_group(sqid):
    group_id = sqids.decode_one(sqid)

    # todo: is_member needs to be cached separately
    cache_key = group_cache_key(group_id)
    if result := cache.get(cache_key):
        return result

    group = group_queries.get_group(group_id=group_id)

    is_member = group_queries.is_group_member(group_id=group_id)

    brackets, winners, correct = bracket_utils.get_group_standings(
        group_id=group_id, year=group.year
    )

    brackets_dict = [b.to_dict(safe_only=CAN_EDIT_BRACKET) for b in brackets]
    winners_dict = [b.to_dict(safe_only=CAN_EDIT_BRACKET) for b in winners]
    group_dict = group.to_dict()

    value = dict(
        is_member=is_member,
        group=group_dict,
        brackets=brackets_dict,
        winners=winners_dict,
    )

    cache.set(cache_key, value)

    return value


@groups_bp.post("/create_group")
@login_required
def create_group():
    group_name = request.form.get("name")
    is_private = request.form.get("is_private", type=bool, default=False)
    password = request.form.get("password")

    group_id = group_queries.create_group(
        name=group_name, is_private=is_private, password=password
    )

    group_queries.upsert_group_member(group_id=group_id)

    cache_invalidator.new_group()

    return redirect(url_for("groups_bp.view_group", sqid=sqids.encode_one(group_id)))


@groups_bp.post("/edit_group/<string:sqid>")
@login_required
def edit_group(sqid):
    group_id = sqids.decode_one(sqid)

    group = group_queries.get_my_group(group_id=group_id)
    if not group:
        flash("Something went wrong", "danger")
        return redirect(url_for("groups_bp.view_group", sqid=sqid))

    group_name = request.form.get("name")
    old_name = request.form.get("old_name")
    is_private = request.form.get("is_private") == "true"
    password = request.form.get("password")
    locked = request.form.get("locked") == "true"

    group_queries.update_group(
        group_id=group_id,
        name=group_name,
        is_private=is_private,
        password=password,
        locked=locked,
    )

    print(group_name, old_name, group_name != old_name)

    cache_invalidator.edit_group(group_id, name_changed=group_name != old_name)

    flash("Group updated", "success")
    return redirect(url_for("groups_bp.view_group", sqid=sqid))


@groups_bp.post("/delete_group/<string:sqid>")
@login_required
def delete_group(sqid):
    group_id = sqids.decode_one(sqid)

    group = group_queries.get_my_group(group_id=group_id)
    if not group:
        flash("Something went wrong", "danger")
        return redirect(url_for("groups_bp.view_group", sqid=sqid))

    cache_invalidator.delete_group(group_id)
    group_queries.delete_group(group_id=group_id)

    flash("Group successfully deleted", "success")
    return redirect(url_for("mybrackets_bp.my_brackets"))


@groups_bp.route("/join_group/<string:sqid>", methods=["GET", "POST"])
@login_required
def join_group(sqid):
    group_id = sqids.decode_one(sqid)
    group = group_queries.get_group(group_id=group_id)
    if not group:
        flash("Sorry. This group doesn't exist", "danger")
        return redirect(url_for("leaderboard_bp.index"))

    member = group_queries.get_group_member(group_id=group_id)
    if member:
        flash("You are already a member of this group")
        return redirect(url_for("groups_bp.view_group", sqid=sqid))

    if group.locked:
        flash("Sorry. This group is locked.")
        return redirect(url_for("mybrackets_bp.my_brackets"))

    if group.is_private:
        password_get = request.args.get("password")
        password_post = request.form.get("password")
        password = password_get or password_post
        if password != group.password:
            flash("Incorrect password. Please try again.")
            # Go pass to viewing private group password page
            return redirect(url_for("groups_bp.view_group", sqid=sqid))

    group_queries.upsert_group_member(group_id=group_id)

    cache_invalidator.join_group(group_id)

    return redirect(url_for("groups_bp.view_group", sqid=sqid))


@groups_bp.post("/group_add_bracket/<string:sqid>")
@login_required
def group_add_bracket(sqid):
    group_id = sqids.decode_one(sqid)

    bracket_sqid = request.form.get("bracket_sqid")
    bracket_id = None
    if bracket_sqid:
        bracket_id = sqids.decode_one(bracket_sqid)

    bracket = bracket_queries.get_my_bracket_for_bracket_id(bracket_id=bracket_id)
    if not bracket:
        flash("Sorry, this bracket could not be found", "danger")
        return redirect(url_for("mybrackets_bp.my_brackets"))

    group = group_queries.get_group(group_id=group_id)
    if not group:
        flash("Sorry, this group could not be found", "danger")
        return redirect(url_for("mybrackets_bp.my_brackets"))

    group_queries.create_group_bracket(group_id=group.id, bracket_id=bracket.id)

    cache_invalidator.new_group_bracket(group.id, bracket.id)

    flash(f"Your bracket has been added to {group.name}", "success")
    return redirect(url_for("groups_bp.view_group", sqid=sqid))


@groups_bp.get("/search_groups")
@login_required
def search_groups():
    group_name = request.args.get("name")

    groups = group_queries.search_groups(group_name=group_name)

    return [g.to_dict() for g in groups]
