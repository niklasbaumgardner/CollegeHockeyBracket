import datetime

from flask import Blueprint, redirect, render_template, request, url_for
from flask_login import current_user, login_required

from bracketapp import cache
from bracketapp.globals import BRACKET_CLOSE_TIME, CAN_EDIT_BRACKET, YEAR, g
from bracketapp.queries import (
    correct_bracket_queries,
    default_bracket_queries,
    team_qeuries,
)
from bracketapp.utils import bracket_utils, cache_invalidator

admin_bp = Blueprint("admin_bp", __name__)


@admin_bp.route("/admin", methods=["GET"])
@login_required
def admin():
    if not current_user.is_admin():
        return redirect(url_for("leaderboard_bp.index"))

    keydb_contents = g.get_all_contents()

    return render_template("admin.html", keydb_contents=keydb_contents)


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
        cache_invalidator.correct_bracket()
        bracket_utils.update_all_brackets_points()

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


@admin_bp.get("/go_live")
def go_live():
    current_time = datetime.datetime.now(datetime.UTC)

    if CAN_EDIT_BRACKET and current_time < BRACKET_CLOSE_TIME:
        return "ok", 200

    elif not CAN_EDIT_BRACKET and current_time >= BRACKET_CLOSE_TIME:
        return "ok", 200

    return "", 503


@admin_bp.get("/flush_entire_cache")
@login_required
def flush_entire_cache():
    if not current_user.is_admin():
        return redirect(url_for("leaderboard_bp.index"))

    cache.flush_all()
    return redirect(url_for("admin_bp.admin"))


@admin_bp.get("/flush_main_caches")
@login_required
def flush_main_caches():
    if not current_user.is_admin():
        return redirect(url_for("leaderboard_bp.index"))

    cache_invalidator.flush_main_caches()
    return redirect(url_for("admin_bp.admin"))


@admin_bp.post("/update_year")
@login_required
def update_year():
    if not current_user.is_admin():
        return redirect(url_for("leaderboard_bp.index"))

    g.YEAR = request.form.get("YEAR")
    cache_invalidator.flush_main_caches()

    return redirect(url_for("admin_bp.admin"))


@admin_bp.post("/update_can_edit_bracket")
@login_required
def update_can_edit_bracket():
    if not current_user.is_admin():
        return redirect(url_for("leaderboard_bp.index"))

    g.CAN_EDIT_BRACKET = request.form.get("CAN_EDIT_BRACKET") == "on"
    cache_invalidator.flush_main_caches()

    return redirect(url_for("admin_bp.admin"))


@admin_bp.get("/test_redis")
@login_required
def test_redis():
    if not current_user.is_admin():
        return redirect(url_for("leaderboard_bp.index"))

    times = {
        "local_can_edit": [],
        "local_year": [],
        "keydb_can_edit": [],
        "keydb_year": [],
        "valkey_year": [],
        "valkey_can_edit": [],
    }

    for i in range(1000):
        v, t = g.l_CAN_EDIT_BRACKET
        times["local_can_edit"].append(t)

        v, t = g.l_YEAR
        times["local_year"].append(t)

        v, t = g.k_CAN_EDIT_BRACKET
        times["keydb_can_edit"].append(t)
        assert type(v) is type(CAN_EDIT_BRACKET)

        v, t = g.k_YEAR
        times["keydb_year"].append(t)
        assert type(v) is type(YEAR)

        v, t = g.v_YEAR
        times["valkey_year"].append(t)
        assert type(v) is type(YEAR)

        v, t = g.v_CAN_EDIT_BRACKET
        times["valkey_can_edit"].append(t)
        assert type(v) is type(CAN_EDIT_BRACKET)

    result = {"ztimes_sorted": []}
    for k, v in times.items():
        avg = sum(v) / len(v)
        print(f"{k}: {avg}")
        result[k] = avg
        result["ztimes_sorted"].append([k, avg])

    result["ztimes_sorted"].sort(key=lambda x: x[1])

    return result
