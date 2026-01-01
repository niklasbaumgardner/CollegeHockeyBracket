from typing import Annotated, Optional
from bracketapp import db
from flask_login import UserMixin
from itsdangerous import URLSafeTimedSerializer
import os
from sqlalchemy_serializer import SerializerMixin
from flask import url_for
from itsdangerous import URLSafeTimedSerializer
from bracketapp import db, login_manager
from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy import ForeignKey, BigInteger, Identity
from typing import Any
from typing_extensions import Annotated
from bracketapp.utils.Serializer import SerializerMixin
from enum import IntFlag
from sqlalchemy.dialects.postgresql import JSONB
from bracketapp.utils.Sqids import sqids


int_pk = Annotated[
    int, mapped_column(BigInteger, Identity(always=True), primary_key=True)
]
str_pk = Annotated[str, mapped_column(primary_key=True)]
user_fk = Annotated[int, mapped_column(ForeignKey("user.id"))]


class Role(IntFlag):
    USER = 1
    ADMIN = 2


class SqidSerializerMixin(SerializerMixin):
    custom_mappings = {"id": "sqid_id", "user_id": "sqid_user_id"}

    def sqid_id(self):
        return sqids.encode_one(getattr(self, "id"))

    def sqid_user_id(self):
        return sqids.encode_one(getattr(self, "user_id"))


@login_manager.user_loader
def load_user(id):
    return db.session.get(User, int(id))


class User(db.Model, UserMixin, SerializerMixin):
    __tablename__ = "user"

    serialize_only = ("id", "username", "email", "role", "streamchat_token")
    custom_mappings = {"id": "sqid_id"}

    id: Mapped[int_pk]
    username: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str]
    role: Mapped[int] = mapped_column(default=1)
    streamchat_token: Mapped[Optional[str]]

    def is_admin(self):
        return Role.ADMIN in Role(self.role)

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
        return db.session.get(User, user_id)

    def sqid_id(self):
        return sqids.encode_one(self.id)


class UserSettings(db.Model, SqidSerializerMixin):
    __tablename__ = "user_settings"

    id: Mapped[int_pk]
    user_id: Mapped[user_fk]
    settings: Mapped[dict[str, Any]] = mapped_column(
        JSONB, default=dict, nullable=False
    )


class Team(db.Model, SerializerMixin):
    __tablename__ = "team"

    custom_mappings = {"id": "sqid_id"}

    id: Mapped[int_pk]
    name: Mapped[str] = mapped_column(
        unique=True,
    )
    icon_path: Mapped[str] = mapped_column(unique=True)

    def sqid_id(self):
        return sqids.encode_one(self.id)


class BracketTeam(db.Model, SerializerMixin):
    __tablename__ = "bracket_team"

    custom_mappings = {"id": "sqid_id"}

    id: Mapped[int_pk]
    team_id: Mapped[int] = mapped_column(ForeignKey("team.id"))
    rank: Mapped[int]
    year: Mapped[int]

    team: Mapped["Team"] = relationship(lazy="joined", viewonly=True)


class Bracket(db.Model, SqidSerializerMixin):
    __tablename__ = "bracket"

    serialize_rules = (
        "-games_list",
        "group_bracket",
        "url",
    )

    id: Mapped[int_pk]
    user_id: Mapped[user_fk]
    points: Mapped[int]
    max_points: Mapped[int]
    r1: Mapped[Optional[int]]
    r2: Mapped[Optional[int]]
    r3: Mapped[Optional[int]]
    r4: Mapped[Optional[int]]
    name: Mapped[str]
    year: Mapped[int]
    winner: Mapped[int] = mapped_column(ForeignKey("bracket_team.id"))
    rank: Mapped[Optional[int]]
    w_goals: Mapped[int]
    l_goals: Mapped[int]

    winner_team: Mapped["BracketTeam"] = relationship(lazy="joined", viewonly=True)
    games_list: Mapped["Game"] = relationship(lazy="joined", viewonly=True)
    user: Mapped["User"] = relationship(lazy="joined", viewonly=True)
    group_brackets: Mapped["GroupBracket"] = relationship(lazy="noload")
    __group_bracket__ = None

    @property
    def group_bracket(self):
        return self.__group_bracket__

    @group_bracket.setter
    def group_bracket(self, gb):
        self.__group_bracket__ = gb

    def games(self):
        d = {}
        for g in self.games_list:
            d[g.game_num] = g

        return d

    def url(self):
        if self.id:
            return url_for("viewbracket_bp.view_bracket", id=self.id)

    def delete_url(self):
        if self.id:
            return url_for("deletebracket_bp.delete_bracket", id=self.id)

    def bracket_join_group_url(self):
        if self.id:
            return url_for("editbracket_bp.bracket_join_group", id=self.id)

    # TODO: fix override
    def to_dict(self, safe_only=True, include_games=True):
        if safe_only:
            return super().to_dict(
                only=(
                    "id",
                    "user_id",
                    "name",
                    "year",
                    "points",
                    "max_points",
                    "rank",
                    "user",
                )
            )

        else:
            rules = (
                "delete_url",
                "bracket_join_group_url",
            )
            if include_games:
                rules += ("games",)

            return super().to_dict(rules=rules)


# TODO: Stopped here
class Game(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    bracket_id = db.Column(db.Integer, db.ForeignKey(Bracket.id), nullable=False)
    game_num = db.Column(db.String(10), nullable=False)
    winner = db.Column(db.Integer, db.ForeignKey(BracketTeam.id), nullable=True)

    winner_team = db.relationship("BracketTeam", lazy="joined")


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

    winner_team = db.relationship("BracketTeam", lazy="joined")
    games_list = db.relationship("CorrectGame", lazy="joined")

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
        return f"{self.year} Final Bracket"

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

    winner_team = db.relationship(
        "BracketTeam", foreign_keys="CorrectGame.winner", lazy="joined"
    )
    loser_team = db.relationship(
        "BracketTeam", foreign_keys="CorrectGame.loser", lazy="joined"
    )


class DefaultBracket(db.Model, SerializerMixin):
    serialize_rules = (
        "-games_list",
        "games",
    )

    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable=False)

    games_list = db.relationship("DefaultGame", lazy="joined")

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

    home_team = db.relationship(
        "BracketTeam", foreign_keys="DefaultGame.home", lazy="joined"
    )
    away_team = db.relationship(
        "BracketTeam", foreign_keys="DefaultGame.away", lazy="joined"
    )


class Group(db.Model, SerializerMixin):
    __table_args__ = (db.UniqueConstraint("year", "name"),)
    serialize_rules = (
        "url",
        "join_url",
        "share_url",
        "add_bracket_url",
        "members",
        "brackets",
    )

    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String, nullable=False)
    is_private = db.Column(db.Boolean, nullable=False)
    locked = db.Column(db.Boolean, nullable=False)
    password = db.Column(db.String, nullable=True)
    created_by = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)

    members = db.relationship("GroupMember", lazy="joined")
    __brackets__ = None

    @property
    def brackets(self):
        if self.__brackets__ is None:
            self.brackets = []

        return self.__brackets__

    @brackets.setter
    def brackets(self, brackets):
        self.__brackets__ = brackets

    def url(self):
        return url_for("groups_bp.view_group", id=self.id)

    def join_url(self):
        return url_for("groups_bp.join_group", id=self.id, password=self.password)

    def share_url(self):
        if self.is_private:
            return url_for(
                "groups_bp.join_group",
                id=self.id,
                password=self.password,
                _external=True,
                _scheme="https",
            )

        return url_for(
            "groups_bp.join_group",
            id=self.id,
            _external=True,
            _scheme="https",
        )

    def add_bracket_url(self):
        return url_for("editbracket_bp.add_bracket_to_group", id=self.id)


class GroupMember(db.Model, SerializerMixin):
    __table_args__ = (db.UniqueConstraint("group_id", "user_id"),)

    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey(Group.id), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)

    user = db.relationship("User", lazy="joined")
    # group = db.relationship("Group", lazy="joined")


class GroupBracket(db.Model, SerializerMixin):
    __table_args__ = (db.UniqueConstraint("group_id", "bracket_id"),)
    serialize_rules = ("-group.brackets",)

    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey(Group.id), nullable=False)
    bracket_id = db.Column(db.Integer, db.ForeignKey(Bracket.id), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    group_rank = db.Column(db.Integer, nullable=True)

    group = db.relationship("Group", lazy="joined")
