from bracketapp.queries import (
    bracket_queries,
    correct_bracket_queries,
    default_bracket_queries,
    team_qeuries,
    user_queries,
)
from flask import Blueprint, render_template, redirect, url_for, request, flash
from flask_login import current_user, login_required
from bracketapp.utils import bracket_utils
import datetime
from bracketapp.config import CAN_EDIT_BRACKET


admin_bp = Blueprint("admin_bp", __name__)


@admin_bp.route("/admin", methods=["GET"])
@login_required
def admin():
    if not current_user.is_admin():
        return redirect(url_for("leaderboard_bp.index"))

    return render_template("admin.html")


@admin_bp.route("/update_points")
@login_required
def update_points():
    if not current_user.is_admin():
        return redirect(url_for("leaderboard_bp.index"))

    bracket_queries.update_points()

    return redirect(url_for("leaderboard_bp.index"))


@admin_bp.route("/update_group_points")
@login_required
def update_group_points():
    if not current_user.is_admin():
        return redirect(url_for("leaderboard_bp.index"))

    bracket_queries.update_group_points()

    return redirect(url_for("leaderboard_bp.index"))


# @admin_bp.route("/delete_brackets", methods=["GET"])
# @login_required
# def delete_brackets():
#     if not current_user.is_admin():
#         return redirect(url_for("leaderboard_bp.index"))

#     brackets = bracket_queries.get_all_brackets()
#     db_users = user_queries.get_all_users()
#     users = {}
#     for u in db_users:
#         users[u.id] = u

#     return render_template("delete_brackets.html", users=users, brackets=brackets)


# @admin_bp.route("/delete_bracket/<id>", methods=["GET"])
# @login_required
# def delete_bracket(id):
#     if not id or not current_user.is_admin():
#         return redirect(url_for("leaderboard_bp.index"))

#     if id == "all":
#         # delete all brackets
#         bracket_queries.delete_all_brackets()
#     else:
#         bracket_queries.delete_bracket(id)

#     return redirect(url_for("leaderboard_bp.index"))


@admin_bp.route("/update_correct", methods=["GET", "POST"])
@login_required
def update_correct():
    if not current_user.is_admin():
        return redirect(url_for("leaderboard_bp.index"))

    if request.method == "POST":
        correct_bracket_queries.update_correct_bracket_from_form(request.form)

        bracket_queries.update_points()

    if request.method == "GET":
        default = default_bracket_queries.get_default_bracket()
        if not default:
            return redirect(url_for("admin_bp.update_default"))

        correct = correct_bracket_queries.get_correct_bracket()
        if not correct:
            correct = correct_bracket_queries.create_correct_bracket()

        return render_template(
            "edit_cbracket.html",
            bracket=correct.to_dict(),
            default=default.to_dict(),
        )

    return redirect(url_for("admin_bp.admin"))


@admin_bp.route("/update_default", methods=["GET", "POST"])
@login_required
def update_default():
    if not current_user.is_admin():
        return redirect(url_for("leaderboard_bp.index"))

    if request.method == "POST":
        d_bracket = default_bracket_queries.get_default_bracket()

        default_bracket_queries.update_default_bracket_from_form(request.form)

        # create the correct bracket after creating the default
        correct = correct_bracket_queries.get_correct_bracket()
        if not correct:
            correct_bracket_queries.create_correct_bracket()

    if request.method == "GET":
        default = default_bracket_queries.get_default_bracket()
        if not default:
            default = bracket_queries.create_default_bracket()

        teams = [t.to_dict() for t in team_qeuries.get_all_teams()]
        return render_template(
            "default_bracket.html", default=default.to_dict(), teams=teams
        )

    return redirect(url_for("admin_bp.admin"))


@admin_bp.route("/delete_default", methods=["GET"])
@login_required
def delete_default():
    if not current_user.is_admin():
        return redirect(url_for("leaderboard_bp.index"))

    bracket_queries.delete_default_bracket()

    return redirect(url_for("leaderboard_bp.index"))


@admin_bp.route("/delete_correct", methods=["GET"])
@login_required
def delete_correct():
    if not current_user.is_admin():
        return redirect(url_for("leaderboard_bp.index"))

    correct_bracket_queries.delete_correct_bracket()

    return redirect(url_for("leaderboard_bp.index"))


@admin_bp.route("/debugging")
@login_required
def debugging():
    if not current_user.is_admin():
        return redirect(url_for("leaderboard_bp.index"))
    string = ""
    users = user_queries.get_all_users()

    brackets = bracket_queries.get_all_brackets()

    for u in users:
        string += f"{u.id} {u.username}<br>"

    string += "<br>"

    for b in brackets:
        string += f"{b.id} {b.user_id} {b.name}<br>"

    return string


@admin_bp.get("/create_team")
@login_required
def create_team():
    if not current_user.is_admin():
        return redirect(url_for("leaderboard_bp.index"))

    team = request.args.get("team")

    if team_qeuries.get_team_by_name(name=team):
        flash("Team already exists")
        return redirect(url_for("admin_bp.admin"))

    if bracket_utils.does_team_image_exist(team):
        bracket_queries.create_team(teamname=team)
        flash("Team successfully added", "success")

    return redirect(url_for("admin_bp.admin"))


@admin_bp.get("/go_live")
def go_live():
    current_time = datetime.datetime.now(datetime.UTC)
    bracket_close_time = datetime.datetime.strptime(
        "2025-03-27 18:00:00", "%Y-%m-%d %H:%M:%S"
    ).replace(tzinfo=datetime.UTC)

    if CAN_EDIT_BRACKET and current_time < bracket_close_time:
        return "ok", 200

    elif not CAN_EDIT_BRACKET and current_time >= bracket_close_time:
        return "ok", 200

    return "", 503
