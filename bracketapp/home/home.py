from flask import Blueprint, render_template, redirect, url_for, request
from flask_login import current_user, login_required
from bracketapp.home import bracketUtils, queries
import os


home = Blueprint("home", __name__)


CAN_EDIT_BRACKET = os.environ.get("CAN_EDIT_BRACKET") == "True"


def isAdmin():
    return current_user.get_id() == "1"


@home.route("/", methods=["GET"])
def index():
    return redirect(url_for("home.standings"))


@home.route("/standings", methods=["GET"])
def standings():
    can_click = not CAN_EDIT_BRACKET
    standings = bracketUtils.getBracketStandings()
    winner = bracketUtils.getWinner(standings) if can_click else None
    return render_template(
        "index.html",
        brackets=standings,
        can_click=can_click,
        winner=winner,
        len=len,
    )


@home.route("/archive", defaults={"year": None}, methods={"GET"})
@home.route("/archive/<int:year>", methods={"GET"})
def archive(year):
    if not year:
        archived_years = []

        for y in range(2022, 2015, -1):
            if y == 2020:
                # covid
                continue
            bracket = queries.getCorrectBracketForYear(y)
            if bracket and bracket.winner:
                archived_years.append(bracketUtils.baseCorrectBracket(year=y))

        return render_template("archive.html", archived_years=archived_years)
    else:
        standings, correct = bracketUtils.getBracketStandingsForYear(year)
        return render_template(
            "archive_standings.html", brackets=standings, correct=correct
        )


@home.route("/view_bracket/<int:year>/<int:id>", methods=["GET"])
def view_archive_bracket(year, id):
    if year == queries.YEAR and CAN_EDIT_BRACKET:
        return redirect(url_for("home.index"))

    bracket = bracketUtils.userBracket(bracket_id=id, year=year)
    default = bracketUtils.fullDefaultBracket(year=year)
    correct = bracketUtils.fullCorrectBracket(year=year)

    mine = "active" if current_user.get_id() == str(bracket.user_id) else ""

    return render_template(
        "view_bracket.html",
        mine=mine,
        correct_json=correct.tojson(),
        default_json=default.tojson(),
        bracket_json=bracket.tojson(),
        bracket_winner_img=bracket.img_url,
        correct_winner_img=correct.img_url,
        name=bracket.bracket.name,
    )


@home.route("/view_bracket", defaults={"id": None}, methods=["GET"])
@home.route("/view_bracket/<int:id>", methods=["GET"])
def view_bracket(id):
    current_user_id = current_user.get_id()
    can_view_brackets = not CAN_EDIT_BRACKET

    if id and can_view_brackets:
        bracket = queries.getUserBracketForBracketId(id)

    else:
        if current_user_id:
            bracket = queries.getUserBracketForUserId(user_id=current_user_id)
            if not bracket:
                if CAN_EDIT_BRACKET:
                    return redirect(url_for("home.edit_bracket"))
                else:
                    return redirect(url_for("home.index"))
        else:
            return redirect(url_for("auth.login"))

    default = bracketUtils.fullDefaultBracket()
    try:
        correct = bracketUtils.fullCorrectBracket()
    except:
        correct = None

    if not bracket and CAN_EDIT_BRACKET and current_user.is_authenticated():
        return redirect(url_for("home.edit_bracket"))
    elif not bracket:
        return redirect(url_for("home.index"))

    mine = "active" if current_user_id == str(bracket.user_id) else ""

    bracket = bracketUtils.userBracket(bracket_id=bracket.id, bracket=bracket)

    return render_template(
        "view_bracket.html",
        can_edit=CAN_EDIT_BRACKET,
        mine=mine,
        correct_json=correct.tojson(),
        default_json=default.tojson(),
        bracket_json=bracket.tojson(),
        bracket_winner_img=bracket.img_url,
        correct_winner_img=correct.img_url,
        name=bracket.bracket.name,
    )


@home.route("/view_cbracket/<int:year>", methods=["GET"])
def view_cbracket(year):
    if year >= queries.YEAR and not isAdmin():
        return redirect(url_for("home.archive"))

    bracket = bracketUtils.fullCorrectBracket(year=year)

    if not bracket:
        return redirect(url_for("home.archive"))

    default = bracketUtils.fullDefaultBracket(year=year)

    return render_template("view_cbracket.html", correct=bracket, default=default)


@home.route("/edit_bracket", methods=["GET", "POST"])
@login_required
def edit_bracket():
    if not CAN_EDIT_BRACKET:
        return redirect(url_for("home.view_bracket"))

    if request.method == "GET":
        try:
            default = bracketUtils.fullDefaultBracket()
            bracket = queries.getUserBracketForUserId(user_id=current_user.get_id())
            if bracket:
                bracket = bracketUtils.userBracket(
                    bracket_id=bracket.id, bracket=bracket
                )
            else:
                bracket = bracketUtils.createEmptyBracket()
            return render_template(
                "edit_bracket.html", bracket=bracket, default=default
            )
        except:
            return redirect(url_for("home.index"))
    elif request.method == "POST":
        existing_bracket = queries.getUserBracketForUserId(
            user_id=current_user.get_id()
        )

        if existing_bracket:
            existing_bracket = queries.updateUserBracket(
                user_id=current_user.get_id(),
                name=request.form.get("name"),
                winner=request.form.get("game15"),
                w_goals=request.form.get("w_goals"),
                l_goals=request.form.get("l_goals"),
                bracket=existing_bracket,
            )

            for i in range(1, 16):
                game_number = f"game{i}"
                queries.updateUserGame(
                    bracket_id=existing_bracket.id,
                    game_num=game_number,
                    winner=request.form.get(game_number),
                )
        else:
            game15 = request.form.get("game15")
            name = request.form.get("name")
            w_goals = request.form.get("w_goals")
            l_goals = request.form.get("l_goals")
            new_bracket = queries.createUserBracket(
                user_id=current_user.get_id(),
                name=name,
                winner=game15,
                w_goals=w_goals,
                l_goals=l_goals,
            )

            for i in range(1, 16):
                queries.createUserGame(
                    user_id=current_user.get_id(),
                    bracket_id=new_bracket.id,
                    game_num=f"game{i}",
                    winner=request.form.get(f"game{i}"),
                )

    return redirect(url_for("home.view_bracket"))


@home.route("/admin", methods=["GET"])
@login_required
def admin():
    if not isAdmin():
        return redirect(url_for("home.index"))

    return render_template("admin.html")


@home.route("/delete_brackets", methods=["GET"])
@login_required
def delete_brackets():
    if not isAdmin():
        return redirect(url_for("home.index"))

    brackets = queries.getAllUserBrackets()
    db_users = queries.getAllUsers()
    users = {}
    for u in db_users:
        users[u.id] = u

    return render_template("delete_brackets.html", users=users, brackets=brackets)


@home.route("/delete_bracket/<id>", methods=["GET"])
@login_required
def delete_bracket(id):
    if not id or not isAdmin():
        return redirect(url_for("home.index"))

    if id == "all":
        # delete all brackets
        queries.deleteAllUserBrackets()
    else:
        queries.deleteUserBracket(id)

    return redirect(url_for("home.index"))


@home.route("/update_correct", methods=["GET", "POST"])
@login_required
def update_correct():
    if not isAdmin():
        return redirect(url_for("home.index"))

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

    return redirect(url_for("home.admin"))


@home.route("/update_default", methods=["GET", "POST"])
@login_required
def update_default():
    if not isAdmin():
        return redirect(url_for("home.index"))
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

    return redirect(url_for("home.admin"))


@home.route("/delete_default", methods=["GET"])
@login_required
def delete_default():
    if not isAdmin():
        return redirect(url_for("home.index"))

    queries.deleteDefaultBracket()

    return redirect(url_for("home.index"))


@home.route("/delete_correct", methods=["GET"])
@login_required
def delete_correct():
    if not isAdmin():
        return redirect(url_for("home.index"))

    queries.deleteCorrectBracket()

    return redirect(url_for("home.index"))


@home.route("/update_points")
@login_required
def update_points():
    if not isAdmin():
        return redirect(url_for("home.index"))

    queries.updateAllBracketPoints()

    return redirect(url_for("home.index"))


@home.route("/debugging")
@login_required
def debugging():
    if not isAdmin():
        return redirect(url_for("home.index"))
    string = ""
    users = queries.getAllUsers()

    brackets = queries.getAllUserBrackets()

    for u in users:
        string += f"{u.id} {u.username}<br>"

    string += "<br>"

    for b in brackets:
        string += f"{b.id} {b.user_id} {b.name}<br>"

    return string


@home.route("/set_theme", methods=["GET"])
@login_required
def set_theme():
    color = request.args.get("theme")
    color = "dark" if color == "dark" else "light"
    theme = queries.get_theme()
    if theme:
        queries.update_theme(theme=theme, color=color)
    else:
        queries.create_theme(color=color)
    return {"success": True}


@home.context_processor
def utility_processor():
    theme = queries.get_theme()
    if theme:
        return dict(theme=theme.color)
    return dict(theme="")


@home.context_processor
def utility_processor():
    return dict(year=queries.YEAR)
