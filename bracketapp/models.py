from bracketapp.extensions import db, login_manager
from flask_login import UserMixin
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
import os


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(60), unique=True, nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    def get_reset_token(self, expire_sec=600):
        s = Serializer(os.environ.get("SECRET_KEY"), expire_sec)
        return s.dumps({"user_id": self.id}).decode("utf-8")

    @staticmethod
    def verify_reset_token(token):
        s = Serializer(os.environ.get("SECRET_KEY"))
        try:
            user_id = s.loads(token).get("user_id")
        except:
            return None
        return User.query.get(user_id)


class Bracket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    points = db.Column(db.Integer, nullable=False)
    max_points = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(30), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    winner = db.Column(db.String(30), nullable=True)  # TODO: make winner not nullable
    rank = db.Column(db.Integer, nullable=True)
    w_goals = db.Column(db.Integer)
    l_goals = db.Column(db.Integer)


class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    bracket_id = db.Column(db.Integer, db.ForeignKey("bracket.id"), nullable=False)
    game_num = db.Column(db.String(10), nullable=False)
    winner = db.Column(db.String(30), nullable=True)


class CorrectBracket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable=False)
    winner = db.Column(db.String(30), nullable=True)
    w_goals = db.Column(db.Integer)
    l_goals = db.Column(db.Integer)


class CorrectGame(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    bracket_id = db.Column(db.Integer, db.ForeignKey(CorrectBracket.id), nullable=False)
    game_num = db.Column(db.String(10), nullable=False)
    winner = db.Column(db.String(30), nullable=True)
    loser = db.Column(db.String(30), nullable=True)
    h_goals = db.Column(db.Integer, nullable=True)
    a_goals = db.Column(db.Integer, nullable=True)


class DefaultBracket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable=False)


class DefaultGame(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    bracket_id = db.Column(db.Integer, db.ForeignKey(DefaultBracket.id), nullable=False)
    game_num = db.Column(db.String(10), nullable=False)
    home = db.Column(db.String(30), nullable=True)
    away = db.Column(db.String(30), nullable=True)

class Theme(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    color = db.Column(db.String, nullable=False)
