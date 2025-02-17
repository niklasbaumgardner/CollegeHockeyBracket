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
# @login_required
def view_group(id):
    group = group_queries.get_group(group_id=id)

    # if group.is_private and not group_queries.get_group_member(group_id=id):
    #     flash("You must join this group to view it")
    #     return redirect(url_for("groups_bp.groups"))

    if not group:
        flash("Sorry. This group doesn't exist")
        return redirect(url_for("index_bp.index"))

    member = group_queries.get_group_member(group_id=id)
    is_member = member is not None

    brackets = []
    winners = []

    if member or not group.is_private:
        brackets, winners, correct = bracket_utils.get_group_standings(group_id=id)

    brackets_dict = [
        b.to_dict(safe_only=CAN_EDIT_BRACKET, include_games=False) for b in brackets
    ]
    winners_dict = [
        b.to_dict(safe_only=CAN_EDIT_BRACKET, include_games=False) for b in winners
    ]

    # return render_template(
    #     "standings.html",
    #     standings=standings_dict,
    #     winners=winners_dict,
    #     year=YEAR,
    # )

    # If we are a memeber of the group, we can view it normally
    # If the group is public, we can view it normally and there will be a button to join
    # If the group is private, we will show a card with a password input to join the group
    return render_template(
        "view_group.html",
        is_member=is_member,
        group=group.to_dict(),
        brackets=brackets_dict,
        winners=winners_dict,
    )


@groups_bp.get("/create_group")
@login_required
def create_group():
    return render_template("create_group.html")


@groups_bp.post("/create_group")
@login_required
def create_group_post():
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
def join_group(id, password):
    password_get = request.args.get("password")
    password_post = request.form.get("password")
    print(f"p_get: {password_get}. p_post: {password_post}")

    group = group_queries.get_group(group_id=id)
    if not group:
        flash("Sorry. This group doesn't exist", "danger")
        return redirect(url_for("index_bp.index"))

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
