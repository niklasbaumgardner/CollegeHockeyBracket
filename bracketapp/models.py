from bracketapp import db, login_manager
from flask_login import UserMixin
from itsdangerous import URLSafeTimedSerializer
from bracketapp.config import CAN_EDIT_BRACKET
import os
import json
from sqlalchemy_serializer import SerializerMixin
from flask import url_for


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin, SerializerMixin):
    serialize_only = ("id", "username", "email", "streamchat_token")

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    role = db.Column(db.Integer, nullable=True)
    streamchat_token = db.Column(db.String, nullable=True)

    def to_dict(self):
        return dict(id=self.id, username=self.username, token=self.streamchat_token)

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


class Team(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    icon_path = db.Column(db.String, nullable=False)


class BracketTeam(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey(Team.id), nullable=False)
    rank = db.Column(db.Integer, nullable=False)
    year = db.Column(db.Integer, nullable=False)

    team = db.relationship("Team")


# class Group(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     year = db.Column(db.Integer, nullable=False)
#     name = db.Column(db.String, nullable=False)
#     is_private = db.Column(db.Boolean, nullable=False)
#     password = db.Column(db.String, nullable=True)


class Bracket(db.Model, SerializerMixin):
    serialize_rules = ("-games_list",)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    points = db.Column(db.Integer, nullable=False)
    max_points = db.Column(db.Integer, nullable=False)
    r1 = db.Column(db.Integer, nullable=True)
    r2 = db.Column(db.Integer, nullable=True)
    r3 = db.Column(db.Integer, nullable=True)
    r4 = db.Column(db.Integer, nullable=True)
    name = db.Column(db.String, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    winner = db.Column(db.Integer, db.ForeignKey(BracketTeam.id), nullable=True)
    rank = db.Column(db.Integer, nullable=True)
    w_goals = db.Column(db.Integer)
    l_goals = db.Column(db.Integer)
    # group_id = db.Column(db.Integer, db.ForeignKey(Group.id), nullable=True)

    winner_team = db.relationship("BracketTeam")
    games_list = db.relationship("Game")
    user = db.relationship("User")

    def games(self):
        d = {}
        for g in self.games_list:
            d[g.game_num] = g

        return d

    def url(self):
        return url_for("viewbracket_bp.view_bracket", id=self.id)

    def to_dict(self, safe_only=True, include_games=True):
        if safe_only:
            return super().to_dict(
                only=(
                    "id",
                    "name",
                    "year",
                    "points",
                    "max_points",
                    "rank",
                    "user",
                )
            )

        else:
            rules = ("url",)
            if include_games:
                rules += ("games",)

            return super().to_dict(rules=rules)

    # def to_json(self, safe_only=True):
    #     return json.dumps(self.to_dict(safe_only=safe_only))


class Game(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    bracket_id = db.Column(db.Integer, db.ForeignKey(Bracket.id), nullable=False)
    game_num = db.Column(db.String(10), nullable=False)
    winner = db.Column(db.Integer, db.ForeignKey(BracketTeam.id), nullable=True)

    winner_team = db.relationship("BracketTeam")


class CorrectBracket(db.Model, SerializerMixin):
    serialize_rules = (
        "points",
        "max_points",
        "r1",
        "r2",
        "r3",
        "r4",
        "name",
        "rank",
        "user",
        "url",
        "-games_list",
    )

    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable=False)
    winner = db.Column(db.Integer, db.ForeignKey(BracketTeam.id), nullable=True)
    w_goals = db.Column(db.Integer)
    l_goals = db.Column(db.Integer)

    winner_team = db.relationship("BracketTeam")
    games_list = db.relationship("CorrectGame")

    points = 320
    max_points = 320
    r1 = 80
    r2 = 80
    r3 = 80
    r4 = 80
    rank = "-"
    user = {"username": "NB Bracket App"}

    def to_dict(self, include_games=True):
        if include_games:
            return super().to_dict(rules=("games",))

        return super().to_dict()

    def games(self):
        d = {}
        for g in self.games_list:
            d[g.game_num] = g

        return d

    def name(self):
        return f"{self.year} final bracket"

    def url(self):
        return url_for("viewbracket_bp.view_cbracket", year=self.year)


class CorrectGame(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    bracket_id = db.Column(db.Integer, db.ForeignKey(CorrectBracket.id), nullable=False)
    game_num = db.Column(db.String(10), nullable=False)
    winner = db.Column(db.Integer, db.ForeignKey(BracketTeam.id), nullable=True)
    loser = db.Column(db.Integer, db.ForeignKey(BracketTeam.id), nullable=True)
    h_goals = db.Column(db.Integer, nullable=True)
    a_goals = db.Column(db.Integer, nullable=True)

    winner_team = db.relationship("BracketTeam", foreign_keys="CorrectGame.winner")
    loser_team = db.relationship("BracketTeam", foreign_keys="CorrectGame.loser")


class DefaultBracket(db.Model, SerializerMixin):
    serialize_rules = (
        "-games_list",
        "games",
    )

    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable=False)

    games_list = db.relationship("DefaultGame")

    def games(self):
        d = {}
        for g in self.games_list:
            d[g.game_num] = g

        return d


class DefaultGame(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    bracket_id = db.Column(db.Integer, db.ForeignKey(DefaultBracket.id), nullable=False)
    game_num = db.Column(db.String(10), nullable=False)
    home = db.Column(db.Integer, db.ForeignKey(BracketTeam.id), nullable=True)
    away = db.Column(db.Integer, db.ForeignKey(BracketTeam.id), nullable=True)

    home_team = db.relationship("BracketTeam", foreign_keys="DefaultGame.home")
    away_team = db.relationship("BracketTeam", foreign_keys="DefaultGame.away")


class Theme(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    theme = db.Column(db.String, nullable=True)
    backgroundColor = db.Column(db.String, nullable=True)
    color = db.Column(db.String, nullable=True)
