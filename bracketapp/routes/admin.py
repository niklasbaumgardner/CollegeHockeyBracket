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


# TODO: check url
@admin_bp.route("/update_points")
@login_required
def update_points():
    if not current_user.is_admin():
        return redirect(url_for("leaderboard_bp.index"))

    bracket_utils.update_all_brackets_points()

    return redirect(url_for("leaderboard_bp.index"))


@admin_bp.route("/update_correct", methods=["GET", "POST"])
@login_required
def update_correct():
    if not current_user.is_admin():
        return redirect(url_for("leaderboard_bp.index"))

    if request.method == "POST":
        correct_bracket_queries.update_correct_bracket_from_form(request.form)

    if request.method == "GET":
        default = default_bracket_queries.get_default_bracket()
        if not default:
            return redirect(url_for("admin_bp.update_default"))

        correct = correct_bracket_queries.get_correct_bracket()
        if not correct:
            correct_bracket_queries.create_correct_bracket()
            correct = correct_bracket_queries.get_correct_bracket()

        return render_template(
            "edit_cbracket.html",
            bracket=correct.to_dict(rules=("form_url",)),
            default=default.to_dict(),
        )

    return redirect(url_for("admin_bp.admin"))


@admin_bp.route("/update_default", methods=["GET", "POST"])
@login_required
def update_default():
    if not current_user.is_admin():
        return redirect(url_for("leaderboard_bp.index"))

    if request.method == "POST":
        default_bracket_queries.update_default_bracket_from_form(request.form)

    if request.method == "GET":
        default = default_bracket_queries.get_default_bracket()
        if not default:
            default_bracket_queries.create_default_bracket()
            default = default_bracket_queries.get_default_bracket()

        teams = [t.to_dict() for t in team_qeuries.get_all_teams()]
        return render_template(
            "default_bracket.html", default=default.to_dict(), teams=teams
        )

    return redirect(url_for("admin_bp.update_default"))


@admin_bp.route("/create_team", methods=["GET", "POST"])
@login_required
def create_team():
    if not current_user.is_admin():
        return redirect(url_for("leaderboard_bp.index"))

    if request.method == "GET":
        teams = [t.to_dict() for t in team_qeuries.get_all_teams()]
        return render_template("add_team.html", teams=teams)

    if request.method == "POST":
        team = request.form.get("team")

        if team_qeuries.get_team_by_name(name=team):
            flash("Team already exists")

        if bracket_utils.does_team_image_exist(team):
            team_qeuries.create_team(teamname=team)
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
