from __future__ import annotations
from bracketapp import db
from flask_login import UserMixin
from itsdangerous import URLSafeTimedSerializer
import os
from sqlalchemy_serializer import SerializerMixin
from flask import url_for
from sqlalchemy.orm import Mapped
from typing import Any, Dict, List, Optional


class User(db.Model, UserMixin, SerializerMixin):
    serialize_only = ("id", "username", "streamchat_token")

    id: int = db.Column(db.Integer, primary_key=True)
    username: str = db.Column(db.String, unique=True, nullable=False)
    email: str = db.Column(db.String, unique=True, nullable=False)
    password: str = db.Column(db.String, nullable=False)
    role: Optional[int] = db.Column(db.Integer, nullable=True)
    streamchat_token: Optional[str] = db.Column(db.String, nullable=True)

    def get_reset_token(self) -> str:
        s = URLSafeTimedSerializer(os.environ.get("SECRET_KEY"))
        return s.dumps({"user_id": self.id})

    @staticmethod
    def verify_reset_token(token: str, expire_sec: int = 600) -> Optional[User]:
        s = URLSafeTimedSerializer(os.environ.get("SECRET_KEY"))
        try:
            user_id = s.loads(token, max_age=expire_sec).get("user_id")
        except Exception:
            return None
        return User.query.get(user_id)


class Team(db.Model, SerializerMixin):
    id: int = db.Column(db.Integer, primary_key=True)
    name: str = db.Column(db.String, unique=True, nullable=False)
    icon_path: str = db.Column(db.String, nullable=False)


class BracketTeam(db.Model, SerializerMixin):
    id: int = db.Column(db.Integer, primary_key=True)
    team_id: int = db.Column(db.Integer, db.ForeignKey(Team.id), nullable=False)
    rank: int = db.Column(db.Integer, nullable=False)
    year: int = db.Column(db.Integer, nullable=False)

    team: Mapped["Team"] = db.relationship("Team", lazy="joined")


class Bracket(db.Model, SerializerMixin):
    serialize_rules = (
        "-games_list",
        "group_bracket",
        "url",
    )

    id: int = db.Column(db.Integer, primary_key=True)
    user_id: int = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    points: int = db.Column(db.Integer, nullable=False)
    max_points: int = db.Column(db.Integer, nullable=False)
    r1: Optional[int] = db.Column(db.Integer, nullable=True)
    r2: Optional[int] = db.Column(db.Integer, nullable=True)
    r3: Optional[int] = db.Column(db.Integer, nullable=True)
    r4: Optional[int] = db.Column(db.Integer, nullable=True)
    name: str = db.Column(db.String, nullable=False)
    year: int = db.Column(db.Integer, nullable=False)
    winner: Optional[int] = db.Column(
        db.Integer, db.ForeignKey(BracketTeam.id), nullable=True
    )
    rank: Optional[int] = db.Column(db.Integer, nullable=True)
    w_goals: int = db.Column(db.Integer)
    l_goals: int = db.Column(db.Integer)

    winner_team: Mapped[Optional["BracketTeam"]] = db.relationship(
        "BracketTeam", lazy="joined"
    )
    games_list: Mapped[List["Game"]] = db.relationship("Game", lazy="joined")
    user: Mapped["User"] = db.relationship("User", lazy="joined")
    group_brackets: Mapped[List["GroupBracket"]] = db.relationship(
        "GroupBracket", lazy="noload"
    )
    __group_bracket__: Optional[GroupBracket] = None

    @property
    def group_bracket(self) -> Optional[GroupBracket]:
        return self.__group_bracket__

    @group_bracket.setter
    def group_bracket(self, gb: Optional[GroupBracket]) -> None:
        self.__group_bracket__ = gb

    def games(self) -> Dict[str, Game]:
        d: Dict[str, Game] = {}
        for g in self.games_list:
            d[g.game_num] = g
        return d

    def url(self) -> Optional[str]:
        if self.id:
            return url_for("viewbracket_bp.view_bracket", id=self.id)
        return None

    def delete_url(self) -> Optional[str]:
        if self.id:
            return url_for("deletebracket_bp.delete_bracket", id=self.id)
        return None

    def bracket_join_group_url(self) -> Optional[str]:
        if self.id:
            return url_for("editbracket_bp.bracket_join_group", id=self.id)
        return None

    def to_dict(
        self, safe_only: bool = True, include_games: bool = True
    ) -> Dict[str, Any]:
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


class Game(db.Model, SerializerMixin):
    id: int = db.Column(db.Integer, primary_key=True)
    user_id: int = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    bracket_id: int = db.Column(db.Integer, db.ForeignKey(Bracket.id), nullable=False)
    game_num: str = db.Column(db.String(10), nullable=False)
    winner: Optional[int] = db.Column(
        db.Integer, db.ForeignKey(BracketTeam.id), nullable=True
    )

    winner_team: Mapped[Optional["BracketTeam"]] = db.relationship(
        "BracketTeam", lazy="joined"
    )


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

    id: int = db.Column(db.Integer, primary_key=True)
    year: int = db.Column(db.Integer, nullable=False)
    winner: Optional[int] = db.Column(
        db.Integer, db.ForeignKey(BracketTeam.id), nullable=True
    )
    w_goals: int = db.Column(db.Integer)
    l_goals: int = db.Column(db.Integer)

    winner_team: Mapped[Optional["BracketTeam"]] = db.relationship(
        "BracketTeam", lazy="joined"
    )
    games_list: Mapped[List["CorrectGame"]] = db.relationship(
        "CorrectGame", lazy="joined"
    )

    points: int = 320
    max_points: int = 320
    r1: int = 80
    r2: int = 80
    r3: int = 80
    r4: int = 80
    rank: str = "-"
    user: Dict[str, str] = {"username": "NB Bracket App"}

    def to_dict(self, include_games: bool = True) -> Dict[str, Any]:
        if include_games:
            return super().to_dict(rules=("games",))
        return super().to_dict()

    def games(self) -> Dict[str, CorrectGame]:
        d: Dict[str, CorrectGame] = {}
        for g in self.games_list:
            d[g.game_num] = g
        return d

    def name(self) -> str:
        return f"{self.year} Final Bracket"

    def url(self) -> str:
        return url_for("viewbracket_bp.view_cbracket", year=self.year)


class CorrectGame(db.Model, SerializerMixin):
    id: int = db.Column(db.Integer, primary_key=True)
    bracket_id: int = db.Column(
        db.Integer, db.ForeignKey(CorrectBracket.id), nullable=False
    )
    game_num: str = db.Column(db.String(10), nullable=False)
    winner: Optional[int] = db.Column(
        db.Integer, db.ForeignKey(BracketTeam.id), nullable=True
    )
    loser: Optional[int] = db.Column(
        db.Integer, db.ForeignKey(BracketTeam.id), nullable=True
    )
    h_goals: Optional[int] = db.Column(db.Integer, nullable=True)
    a_goals: Optional[int] = db.Column(db.Integer, nullable=True)

    winner_team: Mapped[Optional["BracketTeam"]] = db.relationship(
        "BracketTeam", foreign_keys="CorrectGame.winner", lazy="joined"
    )
    loser_team: Mapped[Optional["BracketTeam"]] = db.relationship(
        "BracketTeam", foreign_keys="CorrectGame.loser", lazy="joined"
    )


class DefaultBracket(db.Model, SerializerMixin):
    serialize_rules = (
        "-games_list",
        "games",
    )

    id: int = db.Column(db.Integer, primary_key=True)
    year: int = db.Column(db.Integer, nullable=False)

    games_list: Mapped[List["DefaultGame"]] = db.relationship(
        "DefaultGame", lazy="joined"
    )

    def games(self) -> Dict[str, DefaultGame]:
        d: Dict[str, DefaultGame] = {}
        for g in self.games_list:
            d[g.game_num] = g
        return d


class DefaultGame(db.Model, SerializerMixin):
    id: int = db.Column(db.Integer, primary_key=True)
    bracket_id: int = db.Column(
        db.Integer, db.ForeignKey(DefaultBracket.id), nullable=False
    )
    game_num: str = db.Column(db.String(10), nullable=False)
    home: Optional[int] = db.Column(
        db.Integer, db.ForeignKey(BracketTeam.id), nullable=True
    )
    away: Optional[int] = db.Column(
        db.Integer, db.ForeignKey(BracketTeam.id), nullable=True
    )

    home_team: Mapped[Optional["BracketTeam"]] = db.relationship(
        "BracketTeam", foreign_keys="DefaultGame.home", lazy="joined"
    )
    away_team: Mapped[Optional["BracketTeam"]] = db.relationship(
        "BracketTeam", foreign_keys="DefaultGame.away", lazy="joined"
    )


class Theme(db.Model):
    id: int = db.Column(db.Integer, primary_key=True)
    user_id: int = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    theme: Optional[str] = db.Column(db.String, nullable=True)
    backgroundColor: Optional[str] = db.Column(db.String, nullable=True)
    color: Optional[str] = db.Column(db.String, nullable=True)


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

    id: int = db.Column(db.Integer, primary_key=True)
    year: int = db.Column(db.Integer, nullable=False)
    name: str = db.Column(db.String, nullable=False)
    is_private: bool = db.Column(db.Boolean, nullable=False)
    locked: bool = db.Column(db.Boolean, nullable=False)
    password: Optional[str] = db.Column(db.String, nullable=True)
    created_by: int = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)

    members: Mapped[List["GroupMember"]] = db.relationship("GroupMember", lazy="joined")
    __brackets__: Optional[List[Bracket]] = None

    @property
    def brackets(self) -> List[Bracket]:
        if self.__brackets__ is None:
            self.brackets = []  # type: ignore
        return self.__brackets__  # type: ignore

    @brackets.setter
    def brackets(self, brackets: List[Bracket]) -> None:
        self.__brackets__ = brackets

    def url(self) -> str:
        return url_for("groups_bp.view_group", id=self.id)

    def join_url(self) -> str:
        return url_for("groups_bp.join_group", id=self.id, password=self.password)

    def share_url(self) -> str:
        return url_for(
            "groups_bp.join_group", id=self.id, password=self.password, _external=True
        )

    def add_bracket_url(self) -> str:
        return url_for("editbracket_bp.add_bracket_to_group", id=self.id)


class GroupMember(db.Model, SerializerMixin):
    __table_args__ = (db.UniqueConstraint("group_id", "user_id"),)

    id: int = db.Column(db.Integer, primary_key=True)
    group_id: int = db.Column(db.Integer, db.ForeignKey(Group.id), nullable=False)
    user_id: int = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)

    user: Mapped["User"] = db.relationship("User", lazy="joined")
    # group = db.relationship("Group", lazy="joined")


class GroupBracket(db.Model, SerializerMixin):
    __table_args__ = (db.UniqueConstraint("group_id", "bracket_id"),)
    serialize_rules = ("-group.brackets",)

    id: int = db.Column(db.Integer, primary_key=True)
    group_id: int = db.Column(db.Integer, db.ForeignKey(Group.id), nullable=False)
    bracket_id: int = db.Column(db.Integer, db.ForeignKey(Bracket.id), nullable=False)
    user_id: int = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    group_rank: Optional[int] = db.Column(db.Integer, nullable=True)

    group: Mapped["Group"] = db.relationship("Group", lazy="joined")
