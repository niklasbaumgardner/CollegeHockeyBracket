from flask import Blueprint, render_template
from bracketapp.utils import bracket_utils
from bracketapp.config import CAN_EDIT_BRACKET, YEAR
from bracketapp.queries import bracket_queries, group_queries
from flask import Blueprint, render_template, redirect, url_for, request, flash
from flask_login import current_user, login_required


groups_bp = Blueprint("groups_bp", __name__)


@groups_bp.route("/groups", methods=["GET"])
def groups():
    standings = bracket_utils.get_bracket_standings()
    standings_json = [
        b.to_dict(safe_only=CAN_EDIT_BRACKET, include_games=False) for b in standings
    ]

    message = bracket_utils.get_standings_message(standings)

    return render_template(
        "standings.html",
        standings=standings_json,
        CAN_EDIT_BRACKET=CAN_EDIT_BRACKET,
        message=message,
        year=YEAR,
    )


@groups_bp.get("/view_group/<int:id>")
def view_group(id):
    group = group_queries.get_group(group_id=id)

    # if group.is_private and not group_queries.get_group_member(group_id=id):
    #     flash("You must join this group to view it")
    #     return redirect(url_for("groups_bp.groups"))

    if not group:
        flash("Sorry. This group doesn't exist")
        return redirect(url_for("leaderboard_bp.index"))

    return render_template("view_group.html", group=group)


@groups_bp.get("/api/view_group/<int:id>")
def api_view_group(id):
    group = group_queries.get_group(group_id=id)

    member = group_queries.get_group_member(group_id=id)
    is_member = member is not None

    brackets, winners, correct = bracket_utils.get_group_standings(
        group_id=id, year=group.year
    )

    safe_only = group.year == YEAR and CAN_EDIT_BRACKET
    brackets_dict = [
        b.to_dict(safe_only=safe_only, include_games=False) for b in brackets
    ]
    winners_dict = [
        b.to_dict(safe_only=safe_only, include_games=False) for b in winners
    ]

    return dict(
        is_member=is_member,
        group=group.to_dict(),
        brackets=brackets_dict,
        winners=winners_dict,
    )


@groups_bp.post("/edit_group/<int:id>")
@login_required
def edit_group(id):
    group = group_queries.get_group(group_id=id)
    if group.created_by != current_user.id:
        flash("You can't edit a group you didn't create")

    group_name = request.form.get("name")
    is_private = request.form.get("is_private") == "true"
    password = request.form.get("password")
    locked = request.form.get("locked") == "true"

    group_queries.edit_group(
        group_id=id,
        name=group_name,
        is_private=is_private,
        password=password,
        locked=locked,
    )

    flash("Group updated", "success")
    return redirect(url_for("groups_bp.view_group", id=id))


@groups_bp.post("/delete_group/<int:id>")
@login_required
def delete_group(id):
    group = group_queries.get_group(group_id=id)
    if group.created_by != current_user.id:
        flash("You can't delete a group you didn't create")
        return redirect(url_for("groups_bp.view_group", id=id))

    group_queries.delete_group(group_id=id)

    flash("Group deleted", "success")
    return redirect(url_for("groups_bp.my_brackets"))


@groups_bp.post("/create_group")
@login_required
def create_group():
    group_name = request.form.get("name")
    is_private = request.form.get("is_private", type=bool, default=False)
    password = request.form.get("password")

    group = group_queries.create_group(
        name=group_name, is_private=is_private, password=password
    )

    group_queries.maybe_create_group_member(group_id=group.id)

    return redirect(url_for("groups_bp.view_group", id=group.id))


@groups_bp.route("/join_group/<int:id>", methods=["GET", "POST"])
@login_required
def join_group(id):
    group = group_queries.get_group(group_id=id)
    if not group:
        flash("Sorry. This group doesn't exist", "danger")
        return redirect(url_for("leaderboard_bp.index"))

    member = group_queries.get_group_member(group_id=id)
    if member:
        flash("You are already a member of this group")
        return redirect(url_for("groups_bp.view_group", id=id))

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
            return redirect(url_for("groups_bp.view_group", id=id))

    group_queries.maybe_create_group_member(group_id=id)

    return redirect(url_for("groups_bp.view_group", id=id))


@groups_bp.post("/lock_group/<int:id>")
@login_required
def lock_group(id):
    group = group_queries.get_group(group_id=id)
    if group.created_by != current_user.id:
        flash("You can't lock a group you didn't create")
        return redirect(url_for("groups_bp.view_group", id=id))

    group_queries.lock_group(group_id=id)

    return redirect(url_for("groups_bp.view_group", id=id))


@groups_bp.get("/search_groups")
@login_required
def search_groups():
    group_name = request.args.get("name")

    groups = group_queries.search_groups(group_name=group_name)

    return [g.to_dict() for g in groups]
