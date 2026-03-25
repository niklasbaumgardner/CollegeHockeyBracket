import datetime
from enum import IntFlag
from typing import Annotated, Any, Optional

from flask import url_for
from flask_login import UserMixin
from itsdangerous import URLSafeSerializer, URLSafeTimedSerializer
from sqlalchemy import BigInteger, ForeignKey, Identity, UniqueConstraint
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from bracketapp import BaseModel, cache, login_manager
from bracketapp.config import Config
from bracketapp.utils.constants import user_cache_key
from bracketapp.utils.Serializer import SerializerMixin
from bracketapp.utils.Sqids import sqids

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
    cache_key = user_cache_key(id)
    if result := cache.get(cache_key):
        return result

    from bracketapp.queries.user_queries import get_user_by_id

    user = get_user_by_id(id)
    cache.set(cache_key, user)
    return user


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

        return super().to_dict(**kwargs)


class User(BaseModel, UserMixin, SqidSerializerMixin):
    __tablename__ = "user"

    serialize_only = ("id", "username", "role", "streamchat_token")

    id: Mapped[int_pk]
    username: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str]
    role: Mapped[Optional[int]] = mapped_column(default=1)
    streamchat_token: Mapped[Optional[str]]

    def is_admin(self):
        return Role.ADMIN in Role(self.role)

    def get_reset_token(self, next_url=None):
        s = URLSafeTimedSerializer(Config.SECRET_KEY)
        return s.dumps({"user_id": self.id, "next_url": next_url})

    @staticmethod
    def verify_reset_token(token, expire_sec=600):
        s = URLSafeTimedSerializer(Config.SECRET_KEY)
        try:
            data = s.loads(token, max_age=expire_sec)
            user_id = data.get("user_id")
            next_url = data.get("next_url")
        except:
            return None, None
        from bracketapp.queries.user_queries import get_user_by_id

        return get_user_by_id(user_id), next_url

    def get_login_token(self, next_url=None):
        s = URLSafeTimedSerializer(Config.SECRET_KEY)
        return s.dumps({"user_id": self.id, "new_user": False, "next_url": next_url})

    @staticmethod
    def get_new_user_login_token(email, next_url=None):
        s = URLSafeTimedSerializer(Config.SECRET_KEY)
        return s.dumps({"email": email, "new_user": True, "next_url": next_url})

    @staticmethod
    def verify_login_token(token, expire_sec=600):
        s = URLSafeTimedSerializer(Config.SECRET_KEY)
        try:
            data = s.loads(token, max_age=expire_sec)

        except:
            return None
        return data


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
    long_name: Mapped[str]
    short_name: Mapped[str]
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
        "form_url",
        "delete_url",
        "bracket_join_group_url",
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
    games_list: Mapped[list["Game"]] = relationship(lazy="noload", viewonly=True)
    user: Mapped["User"] = relationship(lazy="joined", viewonly=True)

    group_bracket: Mapped["GroupBracket"] = relationship(lazy="noload", viewonly=True)
    group_brackets: Mapped[list["GroupBracket"]] = relationship(
        lazy="noload", viewonly=True
    )

    def safe_rank(self):
        return " "

    def games(self):
        d = {}
        for g in self.games_list:
            d[g.game_number] = g

        return d

    def url(self):
        return url_for("viewbracket_bp.view_bracket", sqid=self.sqid_id())

    def form_url(self):
        return url_for("editbracket_bp.edit_bracket_post", sqid=self.sqid_id())

    def delete_url(self):
        return url_for("deletebracket_bp.delete_bracket", sqid=self.sqid_id())

    def bracket_join_group_url(self):
        return url_for("editbracket_bp.bracket_join_group", sqid=self.sqid_id())

    def to_dict(self, *args, **kwargs):
        if kwargs.get("safe_only") == False:
            rules = kwargs.get("rules", None)
            rules = (
                "url",
                "delete_url",
                "bracket_join_group_url",
                "games",
            ) + (rules or ())

            kwargs["rules"] = rules
            del kwargs["safe_only"]

            return super().to_dict(**kwargs)

        if "safe_only" in kwargs:
            del kwargs["safe_only"]

        if kwargs.get("only") is None:
            kwargs["only"] = (
                "id",
                "user_id",
                "name",
                "year",
                "points",
                "max_points",
                "rank",
                "user",
                "group_bracket",
            )
            kwargs["mappings"] = {"rank": "safe_rank"}
        return super().to_dict(**kwargs)


class Game(BaseModel, SqidSerializerMixin):
    __tablename__ = "game"
    __table_args__ = (UniqueConstraint("bracket_id", "game_number"),)

    id: Mapped[int_pk]
    user_id: Mapped[user_fk]
    bracket_id: Mapped[int] = mapped_column(ForeignKey("bracket.id"))
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
        "games",
        "archive_url",
    )

    id: Mapped[int_pk]
    year: Mapped[int] = mapped_column(unique=True)
    winner_id: Mapped[Optional[int]] = mapped_column(ForeignKey("bracket_team.id"))
    winner_goals: Mapped[Optional[int]]
    loser_goals: Mapped[Optional[int]]

    winner_team: Mapped["BracketTeam"] = relationship(lazy="joined", viewonly=True)
    # TODO
    games_list: Mapped[list["CorrectGame"]] = relationship(lazy="joined", viewonly=True)

    points = 320
    max_points = 320
    round_one_points = 80
    round_two_points = 80
    round_three_points = 80
    round_four_points = 80
    rank = "-"
    user = {"username": ""}

    def games(self):
        d = {}
        for g in self.games_list:
            d[g.game_number] = g

        return d

    def name(self):
        return f"{self.year} Final Bracket"

    def url(self):
        return url_for("viewbracket_bp.view_cbracket", year=self.year)

    def form_url(self):
        return url_for("admin_bp.update_correct")

    def archive_url(self):
        return url_for("archive_bp.archive_year", year=self.year)


class CorrectGame(BaseModel, SqidSerializerMixin):
    __tablename__ = "correct_game"
    __table_args__ = (UniqueConstraint("bracket_id", "game_number"),)

    id: Mapped[int_pk]
    bracket_id: Mapped[int] = mapped_column(ForeignKey("correct_bracket.id"))
    winner_id: Mapped[Optional[int]] = mapped_column(ForeignKey("bracket_team.id"))
    loser_id: Mapped[Optional[int]] = mapped_column(ForeignKey("bracket_team.id"))

    game_number: Mapped[str]
    top_team_goals: Mapped[Optional[int]]
    bottom_team_goals: Mapped[Optional[int]]

    start_time: Mapped[Optional[datetime.datetime]]
    overtime: Mapped[Optional[bool]]
    number_overtimes: Mapped[Optional[int]]

    winner_team: Mapped["BracketTeam"] = relationship(
        foreign_keys=[winner_id], lazy="joined", viewonly=True
    )
    loser_team: Mapped["BracketTeam"] = relationship(
        foreign_keys=[loser_id], lazy="joined", viewonly=True
    )


class DefaultBracket(BaseModel, SqidSerializerMixin):
    __tablename__ = "default_bracket"

    serialize_rules = (
        "update_url",
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

    def update_url(self):
        return url_for("admin_bp.update_default")


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


class GroupMember(BaseModel, SqidSerializerMixin):
    __tablename__ = "group_member"
    __table_args__ = (UniqueConstraint("group_id", "user_id"),)

    id: Mapped[int_pk]
    group_id: Mapped[int] = mapped_column(ForeignKey("group.id"))
    user_id: Mapped[user_fk]

    user: Mapped["User"] = relationship(lazy="joined", viewonly=True)
    # group = relationship("Group", lazy="noload")


class Group(BaseModel, SqidSerializerMixin):
    __tablename__ = "group"
    __table_args__ = (UniqueConstraint("year", "name"),)

    serialize_rules = (
        "url",
        "edit_url",
        "join_url",
        "share_url",
        "add_bracket_url",
        "create_bracket_url",
        "delete_url",
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
    member_count: Mapped[Optional[int]]
    bracket_count: Mapped[Optional[int]]

    members: Mapped[list["GroupMember"]] = relationship(lazy="noload", viewonly=True)

    # brackets: Mapped[list["Bracket"] | None] = query_expression()
    # creator: Mapped["User"] = relationship("User", lazy="joined")
    # brackets: Mapped[list["Bracket"]] = relationship(
    #     lazy="noload", viewonly=True, primaryjoin="Group.id==Group.id"
    # )
    __brackets__ = None

    @property
    def brackets(self):
        if self.__brackets__ is None:
            self.brackets = []

        return self.__brackets__

    @brackets.setter
    def brackets(self, brackets):
        self.__brackets__ = brackets

    def get_join_key(self):
        s = URLSafeSerializer(Config.SECRET_KEY)
        return s.dumps(self.password)

    @staticmethod
    def verify_join_key(token):
        s = URLSafeSerializer(Config.SECRET_KEY)
        try:
            password = s.loads(token)
        except:
            return None
        return password

    def url(self):
        return url_for("groups_bp.view_group", sqid=self.sqid_id())

    def edit_url(self):
        return url_for("groups_bp.edit_group", sqid=self.sqid_id())

    def delete_url(self):
        return url_for("groups_bp.delete_group", sqid=self.sqid_id())

    def join_url(self):
        return self.share_url(external=False)

    def share_url(self, external=True):
        scheme = None
        if Config.FLASK_DEBUG and external:
            scheme = "http"
        elif external:
            scheme = "https"

        if self.is_private:
            return url_for(
                "groups_bp.join_group_preview",
                sqid=self.sqid_id(),
                join_key=self.get_join_key(),
                _external=external,
                _scheme=scheme,
            )

        return url_for(
            "groups_bp.join_group_preview",
            sqid=self.sqid_id(),
            _external=external,
            _scheme=scheme,
        )

    def add_bracket_url(self):
        return url_for("groups_bp.group_add_bracket", sqid=self.sqid_id())

    def create_bracket_url(self):
        return url_for("createbracket_bp.create_bracket", group_sqid=self.sqid_id())


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


# class EmailUpdates(BaseModel):
#     __tablename__ = "email_updates"
#     __table_args__ = (UniqueConstraint("user_id", "year"),)

#     user_id: Mapped[user_fk]
#     year: Mapped[int]
