from flask import Blueprint, render_template, flash, redirect, url_for, request
from flask_login import login_user, current_user, logout_user, login_required
from bracketapp.models import User, Bracket, Game
from bracketapp.extensions import db


home = Blueprint('home', __name__)


@home.route('/', methods=["GET"])
def index():
    return render_template("index.html")


@home.route('/view_bracket', defaults={'id': None})
@home.route('/view_bracket/<int:id>')
def view_bracket(id):
    return render_template("view_bracket.html")


@home.route('/edit_bracket')
def edit_bracket():

    return render_template("edit_bracket.html")