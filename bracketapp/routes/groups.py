from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import current_user, login_required

from bracketapp import cache
from bracketapp.globals import g
from bracketapp.queries import group_queries
from bracketapp.utils import bracket_utils, cache_invalidator
from bracketapp.utils.constants import group_cache_key, group_membership_cache_key
from bracketapp.utils.Sqids import sqids

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
    # maybe it's not allowed while g.CAN_EDIT_BRACKET?
    # maybe just leave this?

    if not group:
        flash("Sorry. This group doesn't exist")
        return redirect(url_for("leaderboard_bp.index"))

    return render_template(
        "view_group.html",
        group=group,
        og_title=group["name"],
    )


@groups_bp.get("/api/group/<string:sqid>")
def api_view_group(sqid):
    group_id = sqids.decode_one(sqid)

    g_cache_key = group_cache_key(group_id)
    gm_cache_key = ""
    if current_user.is_authenticated:
        gm_cache_key = group_membership_cache_key(current_user.id, group_id)
    cache_dict = cache.get_many([g_cache_key, gm_cache_key])

    cache_hits = 0

    if not (group_data := cache_dict.get(g_cache_key)):
        group = group_queries.get_group(group_id=group_id)

        brackets, winners, correct = bracket_utils.get_group_standings(
            group_id=group_id, year=group.year
        )

        can_edit_group = group.year == g.YEAR and g.CAN_EDIT_BRACKET
        brackets_dict = [b.to_dict(safe_only=can_edit_group) for b in brackets]
        winners_dict = [b.to_dict(safe_only=can_edit_group) for b in winners]
        group_dict = group.to_dict()

        group_data = dict(
            group=group_dict,
            brackets=brackets_dict,
            winners=winners_dict,
        )
    else:
        cache_hits += 1

    if not (is_member := cache.get(gm_cache_key)):
        is_member = group_queries.is_group_member(group_id=group_id)
    else:
        cache_hits += 1

    if cache_hits == 2:
        # Remove join and share urls if not a member since they contain the join key
        if not is_member:
            del group_data["group"]["join_url"]
            del group_data["group"]["share_url"]
        return dict(**group_data, is_member=is_member)

    cache.set_many({g_cache_key: group_data, gm_cache_key: is_member})

    if not is_member:
        # Remove join and share urls if not a member since they contain the join key
        del group_data["group"]["join_url"]
        del group_data["group"]["share_url"]

    return dict(**group_data, is_member=is_member)


@groups_bp.post("/create_group")
@login_required
def create_group():
    group_name = request.form.get("name")
    is_private = request.form.get("is_private", type=bool, default=False)
    password = request.form.get("password")

    if not group_queries.is_group_name_unique(group_name):
        flash("Group name is already taken. Please choose a different name.", "danger")
        return redirect(url_for("mybrackets_bp.my_brackets", _anchor="groups"))

    group_id = group_queries.create_group(
        name=group_name, is_private=is_private, password=password
    )

    group_queries.upsert_group_member(group_id=group_id)

    cache_invalidator.new_group()

    return redirect(url_for("groups_bp.view_group", sqid=sqids.encode_one(group_id)))


@groups_bp.get("/is_group_name_unique")
@login_required
def is_group_name_unique():
    name = request.args.get("name")

    return {"isUnique": group_queries.is_group_name_unique(name)}


@groups_bp.post("/edit_group/<string:sqid>")
@login_required
def edit_group(sqid):
    group_id = sqids.decode_one(sqid)

    group = group_queries.get_my_group(group_id=group_id)
    if not group:
        flash("Something went wrong", "danger")
        return redirect(url_for("groups_bp.view_group", sqid=sqid))

    old_name = str(group.name)
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


@groups_bp.get("/join_group/<string:sqid>")
def join_group_preview(sqid):
    group_id = sqids.decode_one(sqid)
    group = group_queries.get_group(group_id=group_id)
    if not group:
        flash("Something went wrong", "danger")
        return redirect(url_for("leaderboard_bp.index"))

    return render_template(
        "join_group.html",
        join_key=request.args.get("join_key"),
        sqid=sqid,
        og_title=f"Join {group.name}!",
    )


@groups_bp.post("/join_group/<string:sqid>")
@login_required
def join_group(sqid):
    group_id = sqids.decode_one(sqid)
    group = group_queries.get_group(group_id=group_id)
    if not group:
        flash("Something went wrong", "danger")
        return redirect(url_for("leaderboard_bp.index"))

    if group.locked:
        flash("This group is locked. Contact the group owner to join this group.")
        return redirect(url_for("mybrackets_bp.my_brackets"))

    if group.is_private:
        join_key = request.form.get("join_key")
        password_post = request.form.get("password")
        password = None

        if join_key:
            password = group.verify_join_key(join_key)
        elif password_post:
            password = password_post.strip()

        if password != group.password:
            flash("Incorrect password. Please try again.", "danger")
            # Go pass to viewing private group password page
            return redirect(
                url_for("groups_bp.view_group", sqid=sqid, _anchor="join-private-group")
            )

    rowcount = group_queries.upsert_group_member(group_id=group_id)
    if rowcount > 0:
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

    rowcount = group_queries.create_group_bracket(
        group_id=group_id, bracket_id=bracket_id
    )

    if rowcount == 1:
        flash("Bracket successfully added to group", "success")
        cache_invalidator.new_group_bracket(group_id, bracket_id)
    else:
        flash("Something went wrong", "danger")
        return redirect(url_for("mybrackets_bp.my_brackets"))

    # TODO: go to my_brackets
    # return redirect(url_for("groups_bp.view_group", sqid=sqid))
    return redirect(url_for("mybrackets_bp.my_brackets", _anchor="groups"))


@groups_bp.get("/search_groups")
@login_required
def search_groups():
    group_name = request.args.get("name")

    groups = group_queries.search_groups(group_name=group_name)

    return [g.to_dict() for g in groups]
