from flask import Blueprint, render_template
from bracketapp.utils import bracket_utils
from bracketapp.config import CAN_EDIT_BRACKET, YEAR
from bracketapp.queries import bracket_queries, group_queries
from flask import Blueprint, render_template, redirect, url_for, request, flash
from flask_login import current_user, login_required
from bracketapp.utils.Sqids import sqids


groups_bp = Blueprint("groups_bp", __name__)


@groups_bp.get("/groups")
def groups():
    # TODO: fix this method. No idea what it's tryng to do?
    # Maybe /my_brackets#groups?
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


@groups_bp.get("/group/<string:sqid>")
def view_group(sqid):
    group_id = sqids.decode_one(sqid)
    group = group_queries.get_group(group_id=group_id)

    # TODO: fix viewability
    # if group.is_private and not group_queries.get_group_member(group_id=id):
    #     flash("You must join this group to view it")
    #     return redirect(url_for("groups_bp.groups"))

    if not group:
        flash("Sorry. This group doesn't exist")
        return redirect(url_for("leaderboard_bp.index"))

    return render_template("view_group.html", group=group.to_dict())


@groups_bp.get("/api/group/<string:sqid>")
def api_view_group(sqid):
    group_id = sqids.decode_one(sqid)
    group = group_queries.get_group(group_id=group_id)

    member = group_queries.get_group_member(group_id=group_id)
    is_member = member is not None

    brackets, winners, correct = bracket_utils.get_group_standings(
        group_id=group_id, year=group.year
    )

    brackets_dict = [b.to_dict(safe_only=CAN_EDIT_BRACKET) for b in brackets]
    winners_dict = [b.to_dict(safe_only=CAN_EDIT_BRACKET) for b in winners]

    return dict(
        is_member=is_member,
        group=group.to_dict(),
        brackets=brackets_dict,
        winners=winners_dict,
    )


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

    return redirect(url_for("groups_bp.view_group", sqid=sqids.encode_one(group_id)))


@groups_bp.post("/edit_group/<string:sqid>")
@login_required
def edit_group(sqid):
    group_id = sqids.decode_one(sqid)

    group = group_queries.get_group(group_id=group_id)
    if group.creator_id != current_user.id:
        flash("You can't edit a group you didn't create")

    group_name = request.form.get("name")
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

    flash("Group updated", "success")
    return redirect(url_for("groups_bp.view_group", sqid=sqid))


@groups_bp.post("/delete_group/<string:sqid>")
@login_required
def delete_group(sqid):
    group_id = sqids.decode_one(sqid)

    group = group_queries.get_group(group_id=group_id)
    if group.creator_id != current_user.id:
        flash("You can't delete a group you didn't create")
        return redirect(url_for("groups_bp.view_group", sqid=sqid))

    group_queries.delete_group(group_id=group_id)

    flash("Group deleted", "success")
    return redirect(url_for("mybrackets_bp.my_brackets"))


@groups_bp.route("/join_group/<string:sqid>", methods=["GET", "POST"])
@login_required
def join_group(sqid):
    print("Am i here????????????????????????????????????????")
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

    return redirect(url_for("groups_bp.view_group", sqid=sqid))


@groups_bp.post("/group_add_bracket/<string:sqid>")
@login_required
def group_add_bracket(sqid):
    group_id = sqids.decode_one(sqid)

    bracket_sqid = request.form.get("bracket_id")
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

    flash(f"Your bracket has been added to {group.name}", "success")
    return redirect(url_for("groups_bp.view_group", sqid=sqid))


@groups_bp.get("/search_groups")
@login_required
def search_groups():
    group_name = request.args.get("name")

    groups = group_queries.search_groups(group_name=group_name)

    return [g.to_dict() for g in groups]
