from urllib.parse import parse_qs
from flask import Blueprint, render_template, flash, redirect, url_for, request
from flask_login import login_user, current_user, logout_user, login_required
from bracketapp.models import CorrectBracket, DefaultBracket, User, Bracket, Game
from bracketapp.extensions import db
from bracketapp.home import bracketUtils
from datetime import datetime
import os


home = Blueprint('home', __name__)


def can_edit_bracket():
    print(os.environ.get('CAN_EDIT_BRACKET'), type(os.environ.get('CAN_EDIT_BRACKET')), os.environ.get('CAN_EDIT_BRACKET') == 'True')
    return os.environ.get('CAN_EDIT_BRACKET') == 'True'


@home.route('/', methods=["GET"])
def index():
    can_click = not can_edit_bracket()
    # print(can_click)
    # can_click = not can_click
    # print(can_click)
    standings = bracketUtils.getAllRankedBrackets()
    return render_template("index.html", brackets=standings, can_click=can_click)


@home.route('/view_bracket', defaults={'id': None}, methods=["GET"])
@home.route('/view_bracket/<int:id>', methods=["GET"])
def view_bracket(id):
    can_edit = can_edit = can_edit_bracket()
    if id and not can_edit:
        bracket = bracketUtils.fullBracket(id)
    else:
        current_user_id = current_user.get_id()
        if current_user_id:
            bracket = Bracket.query.filter_by(user_id=current_user.get_id(), year=datetime.now().year).first()
            if bracket:
                bracket = bracketUtils.fullBracket(bracket.id)
                print('mid', can_edit)
                # if not can_edit:
                #     return redirect(url_for('home.view_bracket', id=bracket.bracket.id))
            else:
                print('no bracket', can_edit)
                if can_edit:
                    return redirect(url_for('home.edit_bracket'))
                else:
                    return redirect(url_for('home.index'))
        else:
            return redirect(url_for('auth.login'))

    default = bracketUtils.fullDefaultBracket()
    try:
        correct = bracketUtils.fullCorrectBracket()
    except:
        correct = None
    print(can_edit)
    return render_template("view_bracket.html", default=default, correct=correct, bracket=bracket, can_edit=can_edit)


@home.route('/edit_bracket', methods=["GET", "POST"])
@login_required
def edit_bracket():
    can_edit = can_edit_bracket()
    if not can_edit:
        return redirect(url_for('home.view_bracket'))

    if request.method == "GET":
        default = bracketUtils.fullDefaultBracket()
        bracket = Bracket.query.filter_by(user_id=current_user.get_id(), year=datetime.now().year).first()
        if bracket:
            bracket = bracketUtils.fullBracket(bracket.id)
        else:
            bracket = None
        return render_template("edit_bracket.html", bracket=bracket, default=default)
    elif request.method == "POST":
        existing_bracket = Bracket.query.filter_by(user_id=current_user.get_id(), year=datetime.now().year).first()

        if existing_bracket:
            existing_bracket.name = request.form.get('name')
            existing_bracket.winner = request.form.get('game15')
            existing_bracket.w_goals = request.form.get('w_goals')
            existing_bracket.l_goals = request.form.get('l_goals')
            db.session.commit()

            for i in range(1, 16):
                game_number = f'game{i}'
                existing_game = Game.query.filter_by(user_id=current_user.get_id(), bracket_id=existing_bracket.id, game_num=game_number).first()
                winner = request.form.get(game_number)
                print(existing_game.winner, winner)
                existing_game.winner = winner
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

    return redirect(url_for('home.view_bracket'))


@home.route('/admin', methods=["GET"])
@login_required
def admin():
    admin_id = '1'
    if current_user.get_id() != admin_id:
        return redirect(url_for('home.index'))

    try:
        correct = bracketUtils.fullCorrectBracket()
    except:
        correct = bracketUtils.createCorrectBracket()

    try:
        default = bracketUtils.fullDefaultBracket()
    except:
        default = bracketUtils.createDefaultBracket()
    return render_template("admin.html", correct=correct, default=default, should_game_exist=bracketUtils.should_game_exist)


@home.route('/update_correct', methods=["POST"])
@login_required
def update_correct():
    if current_user.get_id() != '1':
        return redirect(url_for('home.index'))

    c_bracket = CorrectBracket.query.filter_by(year=datetime.now().year).first()

    for i in range(1, 16):
        game_num = f'game{i}'
        winner = request.form.get(f'game{i}-winner')
        loser = request.form.get(f'game{i}-loser')
        h_goals = request.form.get(f'game{i}-h_goals')
        a_goals = request.form.get(f'game{i}-a_goals')
        bracketUtils.updateCorrectGame(c_bracket.id, game_num=game_num, winner=winner,
            h_goals=h_goals, loser=loser, a_goals=a_goals)

    winner = request.form.get(f'game15-winner')
    h_goals = request.form.get(f'game{i}-h_goals')
    a_goals = request.form.get(f'game{i}-a_goals')
    if winner and h_goals and a_goals:
        c_bracket.winner = winner

        more_goals = h_goals if h_goals > a_goals else a_goals
        less_goals = a_goals if a_goals > h_goals else h_goals
        c_bracket.w_goals = more_goals
        c_bracket.l_goals = less_goals
        db.session.commit()

    bracketUtils.updateAllBrackets()

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


@home.route('/delete_default', methods=["GET"])
@login_required
def delete_default():
    if current_user.get_id() != '1':
        return redirect(url_for('home.index'))

    bracketUtils.deleteDefault()

    return redirect(url_for('home.index'))

@home.route('/delete_correct', methods=["GET"])
@login_required
def delete_correct():
    if current_user.get_id() != '1':
        return redirect(url_for('home.index'))

    bracketUtils.deleteCorrect()

    return redirect(url_for('home.index'))


@home.route('/update_points')
@login_required
def update_points():
    if current_user.get_id() != '1':
        return redirect(url_for('home.index'))

    bracketUtils.updateAllBrackets()

    return redirect(url_for('home.index'))


@home.route('/debugging')
def debugging():
    string = ''
    users = User.query.all()

    brackets = Bracket.query.all()

    for u in users:
        string += f'{u.id} {u.name}<br>'

    string += '<br>'

    for b in brackets:
        string += f'{b.id} {b.user_id} {b.name}<br>'

    return string
