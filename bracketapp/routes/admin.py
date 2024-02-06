from flask import Blueprint, render_template, redirect, url_for, request
from flask_login import current_user, login_required
from bracketapp.utils import queries, bracketUtils


admin_bp = Blueprint("admin_bp", __name__)


def isAdmin():
    return current_user.id == 1


@admin_bp.route("/admin", methods=["GET"])
@login_required
def admin():
    if not isAdmin():
        return redirect(url_for("index_bp.index"))

    return render_template("admin.html")


@admin_bp.route("/update_points")
@login_required
def update_points():
    if not isAdmin():
        return redirect(url_for("index_bp.index"))

    queries.updateAllBracketPoints()

    return redirect(url_for("index_bp.index"))


@admin_bp.route("/delete_brackets", methods=["GET"])
@login_required
def delete_brackets():
    if not isAdmin():
        return redirect(url_for("index_bp.index"))

    brackets = queries.getAllUserBrackets()
    db_users = queries.get_all_users()
    users = {}
    for u in db_users:
        users[u.id] = u

    return render_template("delete_brackets.html", users=users, brackets=brackets)


@admin_bp.route("/delete_bracket/<id>", methods=["GET"])
@login_required
def delete_bracket(id):
    if not id or not isAdmin():
        return redirect(url_for("index_bp.index"))

    if id == "all":
        # delete all brackets
        queries.deleteAllUserBrackets()
    else:
        queries.deleteUserBracket(id)

    return redirect(url_for("index_bp.index"))


@admin_bp.route("/update_correct", methods=["GET", "POST"])
@login_required
def update_correct():
    if not isAdmin():
        return redirect(url_for("index_bp.index"))

    if request.method == "POST":
        c_bracket = queries.getCorrectBracket()

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

            queries.updateCorrectGame(
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

                queries.updateCorrectBracket(
                    winner=winner,
                    w_goals=more_goals,
                    l_goals=less_goals,
                    bracket=c_bracket,
                )

        queries.updateAllBracketPoints()

    if request.method == "GET":
        try:
            correct = bracketUtils.fullCorrectBracket()
        except:
            correct = queries.createCorrectBracket()

        try:
            default = bracketUtils.fullDefaultBracket()
        except:
            default = queries.createDefaultBracket()

        return render_template(
            "update_correct.html",
            correct=correct,
            bracket=correct,
            default=default,
            should_game_exist=bracketUtils.should_game_exist,
        )

    return redirect(url_for("admin_bp.admin"))


@admin_bp.route("/update_default", methods=["GET", "POST"])
@login_required
def update_default():
    if not isAdmin():
        return redirect(url_for("index_bp.index"))
    if request.method == "POST":
        d_bracket = queries.getDefaultBracket()

        for i in range(1, 9):
            game_num = f"game{i}"
            queries.updateDefaultGame(
                b_id=d_bracket.id,
                game_num=game_num,
                home=request.form.get(f"game{i}-home"),
                away=request.form.get(f"game{i}-away"),
            )

        # create the correct bracket after creating the default
        correct = queries.getCorrectBracket()
        if not correct:
            queries.createCorrectBracket()

    if request.method == "GET":
        try:
            default = bracketUtils.fullDefaultBracket()
        except:
            default = queries.createDefaultBracket()
        return render_template("default_bracket.html", default=default)

    return redirect(url_for("admin_bp.admin"))


@admin_bp.route("/delete_default", methods=["GET"])
@login_required
def delete_default():
    if not isAdmin():
        return redirect(url_for("index_bp.index"))

    queries.deleteDefaultBracket()

    return redirect(url_for("index_bp.index"))


@admin_bp.route("/delete_correct", methods=["GET"])
@login_required
def delete_correct():
    if not isAdmin():
        return redirect(url_for("index_bp.index"))

    queries.deleteCorrectBracket()

    return redirect(url_for("index_bp.index"))


@admin_bp.route("/debugging")
@login_required
def debugging():
    if not isAdmin():
        return redirect(url_for("index_bp.index"))
    string = ""
    users = queries.get_all_users()

    brackets = queries.getAllUserBrackets()

    for u in users:
        string += f"{u.id} {u.username}<br>"

    string += "<br>"

    for b in brackets:
        string += f"{b.id} {b.user_id} {b.name}<br>"

    return string
