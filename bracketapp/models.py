from bracketapp import db, login_manager
from flask_login import UserMixin
from itsdangerous import URLSafeTimedSerializer
from bracketapp.config import CAN_EDIT_BRACKET
import os
import json


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(60), unique=True, nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    def get_reset_token(self):
        s = URLSafeTimedSerializer(os.environ.get("SECRET_KEY"))
        return s.dumps({"user_id": self.id})

    @staticmethod
    def verify_reset_token(token, expire_sec=600):
        s = URLSafeTimedSerializer(os.environ.get("SECRET_KEY"))
        try:
            user_id = s.loads(token, max_age=expire_sec).get("user_id")
        except:
            return None
        return User.query.get(user_id)


class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    icon_path = db.Column(db.String, nullable=False)


class BracketTeam(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey(Team.id), nullable=False)
    rank = db.Column(db.Integer, nullable=False)
    year = db.Column(db.Integer, nullable=False)


class Bracket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    points = db.Column(db.Integer, nullable=False)
    max_points = db.Column(db.Integer, nullable=False)
    r1 = db.Column(db.Integer, nullable=True)
    r2 = db.Column(db.Integer, nullable=True)
    r3 = db.Column(db.Integer, nullable=True)
    r4 = db.Column(db.Integer, nullable=True)
    name = db.Column(db.String(30), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    # winner = db.Column(db.String(30), nullable=True)  # TODO: make winner not nullable
    winner = db.Column(db.Integer, db.ForeignKey(BracketTeam.id), nullable=False)
    rank = db.Column(db.Integer, nullable=True)
    w_goals = db.Column(db.Integer)
    l_goals = db.Column(db.Integer)

    def to_dict(self, safe_only=True):
        if safe_only:
            obj = dict(
                id=self.id,
                name=self.name,
                year=self.year,
                points=self.points,
                maxPoints=self.max_points,
                rank=self.rank,
                winner="  logo",
            )

        else:
            obj = dict(
                id=self.id,
                name=self.name,
                year=self.year,
                points=self.points,
                r1=self.r1,
                r2=self.r2,
                r3=self.r3,
                r4=self.r4,
                maxPoints=self.max_points,
                rank=self.rank,
                winner=self.winner,
                wGoals=self.w_goals,
                lGoals=self.l_goals,
            )

        return obj

    def to_json(self, safe_only=True):
        return json.dumps(self.to_dict(safe_only=safe_only))


class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    bracket_id = db.Column(db.Integer, db.ForeignKey(Bracket.id), nullable=False)
    game_num = db.Column(db.String(10), nullable=False)
    # winner = db.Column(db.String(30), nullable=True)
    winner = db.Column(db.Integer, db.ForeignKey(BracketTeam.id), nullable=True)


class CorrectBracket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable=False)
    # winner = db.Column(db.String(30), nullable=True)
    winner = db.Column(db.Integer, db.ForeignKey(BracketTeam.id), nullable=True)
    w_goals = db.Column(db.Integer)
    l_goals = db.Column(db.Integer)


class CorrectGame(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    bracket_id = db.Column(db.Integer, db.ForeignKey(CorrectBracket.id), nullable=False)
    game_num = db.Column(db.String(10), nullable=False)
    # winner = db.Column(db.String(30), nullable=True)
    # loser = db.Column(db.String(30), nullable=True)
    winner = db.Column(db.Integer, db.ForeignKey(BracketTeam.id), nullable=True)
    loser = db.Column(db.Integer, db.ForeignKey(BracketTeam.id), nullable=True)
    h_goals = db.Column(db.Integer, nullable=True)
    a_goals = db.Column(db.Integer, nullable=True)


class DefaultBracket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable=False)


class DefaultGame(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    bracket_id = db.Column(db.Integer, db.ForeignKey(DefaultBracket.id), nullable=False)
    game_num = db.Column(db.String(10), nullable=False)
    # home = db.Column(db.String(30), nullable=True)
    # away = db.Column(db.String(30), nullable=True)
    home = db.Column(db.Integer, db.ForeignKey(BracketTeam.id), nullable=True)
    away = db.Column(db.Integer, db.ForeignKey(BracketTeam.id), nullable=True)


class Theme(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    theme = db.Column(db.String, nullable=True)
    backgroundColor = db.Column(db.String, nullable=True)
    color = db.Column(db.String, nullable=True)
