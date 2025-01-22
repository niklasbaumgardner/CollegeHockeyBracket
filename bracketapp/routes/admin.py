from bracketapp.queries import bracket_queries, user_queries
from flask import Blueprint, render_template, redirect, url_for, request
from flask_login import current_user, login_required
from bracketapp.utils import bracket_utils


admin_bp = Blueprint("admin_bp", __name__)


def is_admin():
    return (
        current_user.is_authenticated
        and current_user.role is not None
        and current_user.role > 1
    )


@admin_bp.route("/admin", methods=["GET"])
@login_required
def admin():
    if not is_admin():
        return redirect(url_for("index_bp.index"))

    return render_template("admin.html")


@admin_bp.route("/update_points")
@login_required
def update_points():
    if not is_admin():
        return redirect(url_for("index_bp.index"))

    bracket_queries.update_points()

    return redirect(url_for("index_bp.index"))


@admin_bp.route("/delete_brackets", methods=["GET"])
@login_required
def delete_brackets():
    if not is_admin():
        return redirect(url_for("index_bp.index"))

    brackets = bracket_queries.get_all_brackets()
    db_users = user_queries.get_all_users()
    users = {}
    for u in db_users:
        users[u.id] = u

    return render_template("delete_brackets.html", users=users, brackets=brackets)


@admin_bp.route("/delete_bracket/<id>", methods=["GET"])
@login_required
def delete_bracket(id):
    if not id or not is_admin():
        return redirect(url_for("index_bp.index"))

    if id == "all":
        # delete all brackets
        bracket_queries.delete_all_brackets()
    else:
        bracket_queries.delete_bracket(id)

    return redirect(url_for("index_bp.index"))


@admin_bp.route("/update_correct", methods=["GET", "POST"])
@login_required
def update_correct():
    if not is_admin():
        return redirect(url_for("index_bp.index"))

    if request.method == "POST":
        c_bracket = bracket_queries.get_correct_bracket()

        for i in range(1, 16):
            game_num = f"game{i}"
            winner = request.form.get(f"game{i}")
            loser = request.form.get(f"game{i}-loser")
            h_goals = request.form.get(f"game{i}-h_goals")
            a_goals = request.form.get(f"game{i}-a_goals")

            if not game_num or not winner or not h_goals or not a_goals:
                continue

            try:
                h_goals = int(h_goals)
                a_goals = int(a_goals)
            except:
                continue

            bracket_queries.update_correct_game(
                b_id=c_bracket.id,
                game_num=game_num,
                winner=winner,
                h_goals=h_goals,
                loser=loser,
                a_goals=a_goals,
            )

            if game_num == "game15":
                more_goals = h_goals if h_goals > a_goals else a_goals
                less_goals = a_goals if a_goals > h_goals else h_goals

                bracket_queries.update_correct_bracket(
                    winner=winner,
                    w_goals=more_goals,
                    l_goals=less_goals,
                    bracket=c_bracket,
                )

        bracket_queries.update_points()

    if request.method == "GET":
        default = bracket_queries.get_default_bracket()
        if not default:
            return redirect(url_for("admin_bp.update_default"))

        correct = bracket_queries.get_correct_bracket()
        if not correct:
            correct = bracket_queries.create_correct_bracket()

        return render_template(
            "update_correct.html",
            bracket=correct.to_dict(),
            default=default.to_dict(),
        )

    return redirect(url_for("admin_bp.admin"))


@admin_bp.route("/update_default", methods=["GET", "POST"])
@login_required
def update_default():
    if not is_admin():
        return redirect(url_for("index_bp.index"))

    if request.method == "POST":
        d_bracket = bracket_queries.get_default_bracket()

        for i in range(1, 9):
            game_num = f"game{i}"

            home_team_id = request.form.get(f"{game_num}-home")
            home_team_rank = request.form.get(f"{game_num}-home-rank")

            home_bracket_team = bracket_queries.create_default_bracket_team(
                team_id=home_team_id, rank=home_team_rank
            )

            away_team_id = request.form.get(f"{game_num}-away")
            away_team_rank = request.form.get(f"{game_num}-away-rank")

            away_bracket_team = bracket_queries.create_default_bracket_team(
                team_id=away_team_id, rank=away_team_rank
            )

            bracket_queries.update_default_game(
                b_id=d_bracket.id,
                game_num=game_num,
                home=home_bracket_team.id,
                away=away_bracket_team.id,
            )

        # create the correct bracket after creating the default
        correct = bracket_queries.get_correct_bracket()
        if not correct:
            bracket_queries.create_correct_bracket()

    if request.method == "GET":
        default = bracket_queries.get_default_bracket()
        if not default:
            default = bracket_queries.create_default_bracket()

        teams = bracket_queries.get_all_teams()
        return render_template(
            "default_bracket.html", default=default.to_dict(), teams=teams
        )

    return redirect(url_for("admin_bp.admin"))


@admin_bp.route("/delete_default", methods=["GET"])
@login_required
def delete_default():
    if not is_admin():
        return redirect(url_for("index_bp.index"))

    bracket_queries.delete_default_bracket()

    return redirect(url_for("index_bp.index"))


@admin_bp.route("/delete_correct", methods=["GET"])
@login_required
def delete_correct():
    if not is_admin():
        return redirect(url_for("index_bp.index"))

    bracket_queries.delete_correct_bracket()

    return redirect(url_for("index_bp.index"))


@admin_bp.route("/debugging")
@login_required
def debugging():
    if not is_admin():
        return redirect(url_for("index_bp.index"))
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
    if not is_admin():
        return redirect(url_for("index_bp.index"))

    team = request.args.get("team")

    if bracket_queries.get_team_by_name(name=team):
        return redirect(url_for("admin_bp.admin"))

    if bracket_utils.does_team_image_exist(team):
        bracket_queries.create_team(teamname=team)

    return redirect(url_for("admin_bp.admin"))
