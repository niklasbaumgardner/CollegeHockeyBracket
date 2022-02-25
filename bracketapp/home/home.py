from urllib.parse import parse_qs
from flask import Blueprint, render_template, flash, redirect, url_for, request
from flask_login import login_user, current_user, logout_user, login_required
from bracketapp.models import CorrectBracket, DefaultBracket, User, Bracket, Game
from bracketapp.extensions import db
from bracketapp.home import bracketUtils
from datetime import datetime


home = Blueprint('home', __name__)


@home.route('/', methods=["GET"])
def index():
    return render_template("index.html")


@home.route('/view_bracket', defaults={'id': None}, methods=["GET"])
@home.route('/view_bracket/<int:id>', methods=["GET"])
def view_bracket(id):
    if id:
        # get bracket by id and show bracket
        pass
    default = bracketUtils.fullDefaultBracket()
    correct = bracketUtils.fullCorrectBracket()
    bracket = bracketUtils.fullBracket(current_user.get_id())
    return render_template("view_bracket.html", default=default, correct=correct, bracket=bracket)


@home.route('/edit_bracket', methods=["GET", "POST"])
def edit_bracket():
    if request.method == "GET":
        default = bracketUtils.fullDefaultBracket()
        try:
            bracket = bracketUtils.fullBracket(current_user.get_id())
        except:
            bracket = None
        return render_template("edit_bracket.html", bracket=bracket, default=default)
    elif request.method == "POST":
        existing_bracket = Bracket.query.filter_by(user_id=current_user.get_id(), year=datetime.now().year).first()

        if existing_bracket:
            pass
            db.session.commit()
        else:
            game15 = request.form.get('game15')
            name = request.form.get('name')
            w_goals = request.form.get('w_goals')
            l_goals = request.form.get('l_goals')
            new_bracket = Bracket(user_id=current_user.get_id(), name=name, year=datetime.now().year, winner=game15,
                w_goals=w_goals, l_goals=l_goals, max_points=320, points=0)
            db.session.add(new_bracket)
            db.session.commit()

            for i in range(1, 16):
                new_game = Game(user_id=current_user.get_id(), bracket_id=new_bracket.id, game_num=f'game{i}', winner=request.form.get(f'game{i}'))
                db.session.add(new_game)
                db.session.commit()

    return render_template("view_bracket.html")


@home.route('/admin', methods=["GET"])
@login_required
def admin():
    admin_id = '1'
    if current_user.get_id() != admin_id:
        return redirect(url_for('home.index'))

    if request.method == "GET":
        try:
            correct = bracketUtils.fullCorrectBracket()
        except:
            correct = bracketUtils.createCorrectBracket()

        try:
            default = bracketUtils.fullDefaultBracket()
        except:
            default = bracketUtils.createDefaultBracket()
        return render_template("admin.html", correct=correct, default=default)
    elif request.method == "POST":
        # update correct bracket
        pass


@home.route('/update_correct', methods=["POST"])
@login_required
def update_correct():
    if current_user.get_id() != '1':
        return redirect(url_for('home.index'))

    c_bracket = CorrectBracket.query.filter_by(year=datetime.now().year).first()

    for i in range(1, 16):
        game_num = f'game{i}'
        winner = request.form.get(f'game{i}-winner')
        w_goals = request.form.get(f'game{i}-w_goals')
        loser = request.form.get(f'game{i}-loser')
        l_goals = request.form.get(f'game{i}-l_goals')
        bracketUtils.updateCorrect(c_bracket.id, game_num=game_num, winner=winner,
            w_goals=w_goals, loser=loser, l_goals=l_goals)

    return redirect(url_for('home.admin'))


@home.route('/update_default', methods=["POST"])
@login_required
def update_default():
    if current_user.get_id() != '1':
        return redirect(url_for('home.index'))

    d_bracket = DefaultBracket.query.filter_by(year=datetime.now().year).first()

    for i in range(1, 9):
        game_num = f'game{i}'
        bracketUtils.updateDefault(d_bracket.id, game_num, request.form.get(f'game{i}-home'), request.form.get(f'game{i}-away'))

    return redirect(url_for('home.admin'))