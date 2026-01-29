from bracketapp.utils.constants import (
    bracket_cache_key,
    my_brackets_cache_key,
    LEADERBOARD_CACHE_KEY,
)
from flask import url_for
from sqlalchemy.util.topological import sort
from bracketapp.models import (
    CorrectBracket,
    CorrectGame,
    Bracket,
    Game,
    GroupBracket,
    DefaultBracket,
    DefaultGame,
    Team,
    BracketTeam,
)
from bracketapp import db, cache
from bracketapp.utils import bracket_utils
from bracketapp.config import YEAR, CAN_EDIT_BRACKET
from bracketapp.queries import group_queries
from flask_login import current_user
from sqlalchemy.orm import joinedload, contains_eager, noload
from sqlalchemy import and_, func, insert, select, update, delete
from bracketapp.utils.Sqids import sqids
from sqlalchemy.dialects.postgresql import insert as pg_insert


##
## Bracket and Game queries
##


def get_empty_bracket_dict():
    return dict(
        user_id=None,
        name="",
        year=YEAR,
        games=dict(),
        form_url=url_for("editbracket_bp.new_bracket"),
    )


def create_bracket_from_form(form_data):
    game15 = form_data.get("game15")
    name = form_data.get("name")
    winner_goals = form_data.get("winner_goals")
    loser_goals = form_data.get("loser_goals")

    stmt = insert(Bracket).values(
        user_id=current_user.id,
        name=name[:60].strip(),
        year=YEAR,
        winner_id=sqids.decode_one(game15),
        winner_goals=winner_goals,
        loser_goals=loser_goals,
        max_points=320,
        points=0,
    )

    result = db.session.execute(stmt)

    new_bracket_id = result.inserted_primary_key[0]

    games = [
        dict(
            user_id=current_user.id,
            bracket_id=new_bracket_id,
            game_number=f"game{i}",
            winner_id=sqids.decode_one(form_data.get(f"game{i}")),
        )
        for i in range(1, 16)
    ]

    stmt = insert(Game).values(games)
    db.session.execute(stmt)
    db.session.commit()

    # TODO: invalidate cache
    # group (done in group_bracket creation)
    cache.delete_many([LEADERBOARD_CACHE_KEY, my_brackets_cache_key(current_user.id)])

    return new_bracket_id


def update_bracket_from_form(bracket_id, form_data):
    update_dict = {}
    update_dict["name"] = form_data.get("name")[:60].strip()
    update_dict["winner_id"] = sqids.decode_one(form_data.get("game15"))
    update_dict["winner_goals"] = form_data.get("winner_goals")
    update_dict["loser_goals"] = form_data.get("loser_goals")

    bracket_stmt = (
        update(Bracket)
        .where(
            Bracket.id == bracket_id,
            Bracket.user_id == current_user.id,
            Bracket.year == YEAR,
        )
        .values(update_dict)
    )

    db.session.execute(bracket_stmt)

    games = [
        dict(
            user_id=current_user.id,
            bracket_id=bracket_id,
            game_number=f"game{i}",
            winner_id=sqids.decode_one(form_data.get(f"game{i}")),
        )
        for i in range(1, 16)
    ]

    stmt = pg_insert(Game).values(games)
    upsert_stmt = stmt.on_conflict_do_update(
        constraint="game_bracket_id_game_number_unique",
        set_={
            "winner_id": stmt.excluded.winner_id,
        },
    )

    db.session.execute(upsert_stmt)

    db.session.commit()

    # TODO: invalidate cache
    # group (done in group_bracket creation)
    cache.delete_many([LEADERBOARD_CACHE_KEY, my_brackets_cache_key(current_user.id)])


def get_my_bracket_for_bracket_id(bracket_id, include_games=False):
    if not bracket_id:
        return

    stmt = select(Bracket).where(
        and_(
            Bracket.id == bracket_id,
            Bracket.user_id == current_user.id,
            Bracket.year == YEAR,
        )
    )
    if include_games:
        stmt = stmt.options(joinedload(Bracket.games_list))
    return db.session.scalars(stmt.limit(1)).first()


def get_bracket_for_bracket_id(bracket_id):
    if not bracket_id:
        return

    cache_key = bracket_cache_key(bracket_id)
    if bracket := cache.get(cache_key):
        if not (current_user.is_authenticated and current_user.id == bracket.user_id):
            # group_brackets are removed if current user is not the owner
            bracket.group_brackets = []
        return bracket

    stmt = (
        select(Bracket)
        .where(Bracket.id == bracket_id)
        .options(
            joinedload(Bracket.group_brackets),
            joinedload(Bracket.games_list),
        )
    )

    bracket = db.session.scalars(stmt.limit(1)).first()

    cache.set(cache_key, bracket)

    if not (current_user.is_authenticated and current_user.id == bracket.user_id):
        # group_brackets are removed if current user is not the owner
        bracket.group_brackets = []

    return bracket


def my_bracket_count():
    if current_user.is_authenticated:
        stmt = select(func.count(Bracket.id)).where(
            and_(Bracket.user_id == current_user.id, Bracket.year == YEAR)
        )
        return db.session.execute(stmt).scalar_one()

    return 0


def get_my_brackets():
    stmt = (
        select(Bracket)
        .where(and_(Bracket.user_id == current_user.id, Bracket.year == YEAR))
        .options(joinedload(Bracket.group_brackets))
    )

    brackets = db.session.scalars(stmt).unique().all()

    return brackets


def get_brackets_for_group(group_id):
    stmt = (
        select(Bracket)
        .join(GroupBracket, Bracket.id == GroupBracket.bracket_id)
        .where(GroupBracket.group_id == group_id)
        .options(contains_eager(Bracket.group_bracket))
    )

    return db.session.scalars(stmt).unique().all()


def delete_bracket(bracket_id):
    if not CAN_EDIT_BRACKET:
        return

    stmt = delete(Bracket).where(
        and_(
            Bracket.id == bracket_id,
            Bracket.user_id == current_user.id,
            Bracket.year == YEAR,
        )
    )
    result = db.session.execute(stmt)
    db.session.commit()

    return result.rowcount


def get_all_brackets_joined():
    stmt = (
        select(Bracket)
        .where(Bracket.year == YEAR)
        .options(joinedload(Bracket.group_brackets), joinedload(Bracket.games_list))
    )

    return db.session.scalars(stmt).unique().all()


def get_all_brackets(year=YEAR):
    stmt = select(Bracket).where(Bracket.year == year)

    return db.session.scalars(stmt).unique().all()


def get_all_group_brackets(year=YEAR):
    stmt = (
        select(GroupBracket)
        .join(Bracket, GroupBracket.bracket_id == Bracket.id)
        .where(Bracket.year == year)
        .options(noload(GroupBracket.group))
    )

    return db.session.scalars(stmt).unique().all()


def bulk_update_bracket_points(brackets_update_list):
    if not current_user.is_admin():
        return

    db.session.execute(update(Bracket), brackets_update_list)
    db.session.commit()


def bulk_update_group_ranks(group_brackets_update_list):
    if not current_user.is_admin():
        return

    db.session.execute(update(GroupBracket), group_brackets_update_list)
    db.session.commit()
