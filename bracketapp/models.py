from locale import currency
from typing import Any, Annotated, Optional
from bracketapp import db, login_manager, BaseModel
from flask_login import UserMixin, current_user
from itsdangerous import URLSafeTimedSerializer
import os
from flask import url_for
from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy import ForeignKey, BigInteger, Identity, UniqueConstraint
from bracketapp.utils.Serializer import SerializerMixin
from enum import IntFlag
from sqlalchemy.dialects.postgresql import JSONB
from bracketapp.utils.Sqids import sqids
from bracketapp.config import CAN_EDIT_BRACKET, YEAR


int_pk = Annotated[
    int, mapped_column(BigInteger, Identity(always=True), primary_key=True)
]
str_pk = Annotated[str, mapped_column(primary_key=True)]
user_fk = Annotated[int, mapped_column(ForeignKey("user.id"))]


class Role(IntFlag):
    USER = 1
    ADMIN = 2


@login_manager.user_loader
def load_user(id):
    return db.session.get(User, int(id))


class SqidSerializerMixin(SerializerMixin):
    custom_mappings: dict[str, str] = {"id": "sqid_id"}

    def sqid_id(self):
        return sqids.encode_one(getattr(self, "id"))

    def to_dict(self, *args, **kwargs) -> dict:
        custom_mappings = {}
        mappings = kwargs.get("mappings", None)

        attributes = self.get_self_attributes()
        for attribute in attributes:
            if attribute.endswith("_id"):
                sqid_name = "sqid_" + attribute
                custom_mappings[attribute] = sqid_name
                setattr(self, sqid_name, sqids.encode_one(getattr(self, attribute)))

        self.custom_mappings = self.get_custom_mappings(mappings) | custom_mappings

        return super().to_dict(mappings=mappings, **kwargs)


class User(BaseModel, UserMixin, SqidSerializerMixin):
    __tablename__ = "user"

    serialize_only = ("id", "username", "email", "role", "streamchat_token")

    id: Mapped[int_pk]
    username: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str]
    role: Mapped[Optional[int]] = mapped_column(default=1)
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


class UserSettings(BaseModel, SqidSerializerMixin):
    __tablename__ = "user_settings"

    id: Mapped[int_pk]
    # Add unique constraint
    user_id: Mapped[user_fk]
    settings: Mapped[dict[str, Any]] = mapped_column(
        JSONB, default=dict, nullable=False
    )


class Team(BaseModel, SqidSerializerMixin):
    __tablename__ = "team"

    id: Mapped[int_pk]
    name: Mapped[str] = mapped_column(
        unique=True,
    )
    icon_path: Mapped[str] = mapped_column(unique=True)


class BracketTeam(BaseModel, SqidSerializerMixin):
    __tablename__ = "bracket_team"

    id: Mapped[int_pk]
    team_id: Mapped[int] = mapped_column(ForeignKey("team.id"))
    rank: Mapped[int]
    year: Mapped[int]

    team: Mapped["Team"] = relationship(lazy="joined", viewonly=True)


class Bracket(BaseModel, SqidSerializerMixin):
    __tablename__ = "bracket"

    serialize_rules = (
        "-games_list",
        "group_bracket",
        "url",
    )

    id: Mapped[int_pk]
    user_id: Mapped[user_fk]
    winner_id: Mapped[int] = mapped_column(ForeignKey("bracket_team.id"))

    points: Mapped[int]
    max_points: Mapped[int]
    round_one_points: Mapped[Optional[int]]
    round_two_points: Mapped[Optional[int]]
    round_three_points: Mapped[Optional[int]]
    round_four_points: Mapped[Optional[int]]

    name: Mapped[str]
    year: Mapped[int]
    rank: Mapped[Optional[int]]

    winner_goals: Mapped[int]
    loser_goals: Mapped[int]

    winner_team: Mapped["BracketTeam"] = relationship(lazy="joined", viewonly=True)
    games_list: Mapped[list["Game"]] = relationship(lazy="noload", passive_deletes=True)
    user: Mapped["User"] = relationship(lazy="joined", viewonly=True)
    # TODO: below relationship
    group_brackets: Mapped[list["GroupBracket"]] = relationship(lazy="noload")
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
            d[g.game_number] = g

        return d

    def url(self):
        return url_for("viewbracket_bp.view_bracket", sqid=self.sqid_id())

    def delete_url(self):
        return url_for("deletebracket_bp.delete_bracket", sqid=self.sqid_id())

    def bracket_join_group_url(self):
        return url_for("editbracket_bp.bracket_join_group", sqid=self.sqid_id())

    @property
    def safe_only(self):
        if self.user_id == current_user.id:
            return False
        if self.year == YEAR and CAN_EDIT_BRACKET and self.user_id != current_user.id:
            return True

        return False

    # TODO: fix override
    def to_dict(self, *args, **kwargs):
        if self.safe_only:
            kwargs["only"] = (
                "id",
                "user_id",
                "name",
                "year",
                "points",
                "max_points",
                "rank",
                "user",
            )
            return super().to_dict(**kwargs)

        else:
            rules = kwargs.get("rules", None)
            rules = (
                "url",
                "delete_url",
                "bracket_join_group_url",
                "games",
            ) + (rules or ())

            kwargs["rules"] = rules

            return super().to_dict(**kwargs)


class Game(BaseModel, SqidSerializerMixin):
    __tablename__ = "game"
    __table_args__ = (UniqueConstraint("bracket_id", "game_number"),)

    id: Mapped[int_pk]
    user_id: Mapped[user_fk]
    bracket_id: Mapped[int] = mapped_column(
        ForeignKey("bracket.id", ondelete="CASCADE")
    )
    winner_id: Mapped[int] = mapped_column(ForeignKey("bracket_team.id"))
    game_number: Mapped[str]

    winner_team: Mapped["BracketTeam"] = relationship(lazy="joined", viewonly=True)


class CorrectBracket(BaseModel, SqidSerializerMixin):
    __tablename__ = "correct_bracket"

    serialize_rules = (
        "points",
        "max_points",
        "round_one_points",
        "round_two_points",
        "round_three_points",
        "round_four_points",
        "name",
        "rank",
        "user",
        "url",
        "-games_list",
    )

    id: Mapped[int_pk]
    winner_id: Mapped[int] = mapped_column(ForeignKey("bracket_team.id"))
    year: Mapped[int] = mapped_column(unique=True)
    winner_goals: Mapped[int]
    loser_goals: Mapped[int]

    winner_team: Mapped["BracketTeam"] = relationship(lazy="joined", viewonly=True)
    # TODO
    games_list: Mapped[list["CorrectGame"]] = relationship(
        lazy="joined", passive_deletes=True
    )

    points = 320
    max_points = 320
    round_one_points = 80
    round_two_points = 80
    round_three_points = 80
    round_four_points = 80
    rank = "-"
    user = {"username": "NB Bracket App"}

    def games(self):
        d = {}
        for g in self.games_list:
            d[g.game_number] = g

        return d

    def name(self):
        return f"{self.year} Final Bracket"

    def url(self):
        return url_for("viewbracket_bp.view_cbracket", year=self.year)


class CorrectGame(BaseModel, SqidSerializerMixin):
    __tablename__ = "correct_game"
    __table_args__ = (UniqueConstraint("bracket_id", "game_number"),)

    id: Mapped[int_pk]
    bracket_id: Mapped[int] = mapped_column(
        ForeignKey("correct_bracket.id", ondelete="CASCADE")
    )
    winner_id: Mapped[Optional[int]] = mapped_column(ForeignKey("bracket_team.id"))
    loser_id: Mapped[Optional[int]] = mapped_column(ForeignKey("bracket_team.id"))

    game_number: Mapped[str]
    top_team_goals: Mapped[int]
    bottom_team_goals: Mapped[int]

    winner_team: Mapped["BracketTeam"] = relationship(
        foreign_keys=[winner_id], lazy="joined", viewonly=True
    )
    loser_team: Mapped["BracketTeam"] = relationship(
        foreign_keys=[loser_id], lazy="joined", viewonly=True
    )


class DefaultBracket(BaseModel, SqidSerializerMixin):
    __tablename__ = "default_bracket"

    serialize_rules = (
        "-games_list",
        "games",
    )

    id: Mapped[int_pk]
    year: Mapped[int] = mapped_column(unique=True)

    games_list: Mapped[list["DefaultGame"]] = relationship(lazy="joined", viewonly=True)

    def games(self):
        d = {}
        for g in self.games_list:
            d[g.game_number] = g

        return d


class DefaultGame(BaseModel, SqidSerializerMixin):
    __tablename__ = "default_game"
    __table_args__ = (UniqueConstraint("bracket_id", "game_number"),)

    id: Mapped[int_pk]
    bracket_id: Mapped[int] = mapped_column(ForeignKey("default_bracket.id"))
    game_number: Mapped[str]

    # Top and bottom refer to the position of the team in the bracket
    top_team_id: Mapped[Optional[int]] = mapped_column(ForeignKey("bracket_team.id"))
    bottom_team_id: Mapped[Optional[int]] = mapped_column(ForeignKey("bracket_team.id"))

    top_team: Mapped["BracketTeam"] = relationship(
        foreign_keys=[top_team_id], lazy="joined", viewonly=True
    )
    bottom_team: Mapped["BracketTeam"] = relationship(
        foreign_keys=[bottom_team_id], lazy="joined", viewonly=True
    )


class Group(BaseModel, SqidSerializerMixin):
    __tablename__ = "group"
    __table_args__ = (UniqueConstraint("year", "name"),)

    serialize_rules = (
        "url",
        "join_url",
        "share_url",
        "add_bracket_url",
        "members",
        "brackets",
    )

    id: Mapped[int_pk]
    year: Mapped[int]
    name: Mapped[str]
    is_private: Mapped[bool]
    locked: Mapped[bool]
    password: Mapped[Optional[str]]
    creator_id: Mapped[user_fk]

    members: Mapped[list["GroupMember"]] = relationship(lazy="joined", viewonly=True)
    # creator: Mapped["User"] = relationship("User", lazy="joined")
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
        return url_for("groups_bp.view_group", sqid=self.sqid_id())

    def join_url(self):
        return url_for(
            "groups_bp.join_group", sqid=self.sqid_id(), password=self.password
        )

    def edit_url(self):
        return url_for("groups_bp.edit_group", sqid=self.sqid_id())

    def delete_url(self):
        return url_for("groups_bp.delete_group", sqid=self.sqid_id())

    def share_url(self):
        if self.is_private:
            return url_for(
                "groups_bp.join_group",
                sqid=self.sqid_id(),
                password=self.password,
                _external=True,
                _scheme="https",
            )

        return url_for(
            "groups_bp.join_group",
            sqid=self.sqid_id(),
            _external=True,
            _scheme="https",
        )

    def add_bracket_url(self):
        return url_for("editbracket_bp.add_bracket_to_group", sqid=self.sqid_id())

    def new_bracket_url(self):
        return url_for("editbracket_bp.new_bracket", group_sqid=self.sqid_id())


class GroupMember(BaseModel, SqidSerializerMixin):
    __tablename__ = "group_member"
    __table_args__ = (UniqueConstraint("group_id", "user_id"),)

    id: Mapped[int_pk]
    group_id: Mapped[int] = mapped_column(ForeignKey("group.id"))
    user_id: Mapped[user_fk]

    user: Mapped["User"] = relationship(lazy="joined", viewonly=True)
    # group = relationship("Group", lazy="noload")


class GroupBracket(BaseModel, SqidSerializerMixin):
    __tablename__ = "group_bracket"
    __table_args__ = (UniqueConstraint("group_id", "bracket_id"),)

    # TODO: I don't know if this will work anymore
    serialize_rules = (
        # "-group.brackets",
        "delete_url",
    )

    id: Mapped[int_pk]
    group_id: Mapped[int] = mapped_column(ForeignKey("group.id"))
    bracket_id: Mapped[int] = mapped_column(ForeignKey("bracket.id"))
    user_id: Mapped[user_fk]
    group_rank: Mapped[Optional[int]]

    group: Mapped["Group"] = relationship(lazy="joined", viewonly=True)

    def delete_url(self):
        return url_for("deletebracket_bp.delete_group_bracket", sqid=self.sqid_id())
