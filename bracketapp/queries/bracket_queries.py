from flask import url_for
from flask_login import current_user
from sqlalchemy import and_, delete, distinct, func, insert, select, update
from sqlalchemy.dialects.postgresql import insert as pg_insert
from sqlalchemy.orm import contains_eager, joinedload, noload

from bracketapp import cache, db
from bracketapp.globals import g
from bracketapp.models import (
    Bracket,
    Game,
    GroupBracket,
)
from bracketapp.utils.constants import (
    bracket_cache_key,
    my_bracket_count_cahce_key,
)
from bracketapp.utils.Sqids import sqids

##
## Bracket and Game queries
##


def get_empty_bracket_dict():
    return dict(
        user_id=None,
        name="",
        year=g.YEAR,
        games=dict(),
        form_url=url_for("createbracket_bp.create_bracket_post"),
    )


def create_bracket_from_form(form_data):
    game15 = form_data.get("game15")
    name = form_data.get("name")
    winner_goals = form_data.get("winner_goals")
    loser_goals = form_data.get("loser_goals")

    stmt = insert(Bracket).values(
        user_id=current_user.id,
        name=name[:60].strip(),
        year=g.YEAR,
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
            Bracket.year == g.YEAR,
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

    return update_dict.get("name") != form_data.get("old_name")


def get_my_bracket_for_bracket_id(bracket_id, include_games=False):
    if not bracket_id:
        return

    stmt = select(Bracket).where(
        and_(
            Bracket.id == bracket_id,
            Bracket.user_id == current_user.id,
            Bracket.year == g.YEAR,
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

    # if not (bracket.year == g.YEAR and g.CAN_EDIT_BRACKET):
    # Do not cache
    cache.set(cache_key, bracket)

    if not (current_user.is_authenticated and current_user.id == bracket.user_id):
        # group_brackets are removed if current user is not the owner
        bracket.group_brackets = []

    return bracket


def my_bracket_count():
    if current_user.is_authenticated:
        cache_key = my_bracket_count_cahce_key(current_user.id)
        if count := cache.get(cache_key):
            return count

        stmt = select(func.count(1)).where(
            and_(Bracket.user_id == current_user.id, Bracket.year == g.YEAR)
        )
        count = db.session.execute(stmt).scalar_one()

        cache.set(cache_key, count)
        return count

    return 0


def get_my_brackets(year=None):
    if year is None:
        year = g.YEAR

    stmt = (
        select(Bracket)
        .where(and_(Bracket.user_id == current_user.id, Bracket.year == year))
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


def get_bracket_ids_for_group(group_id):
    stmt = (
        select(distinct(Bracket.id))
        .join(GroupBracket, Bracket.id == GroupBracket.bracket_id)
        .where(GroupBracket.group_id == group_id)
    )

    return db.session.scalars(stmt).all()


def get_bracket_ids_for_year(year=g.YEAR):
    stmt = select(distinct(Bracket.id)).where(Bracket.year == year)

    return db.session.scalars(stmt).all()


def get_my_group_brackets_for_bracket_id(bracket_id):
    stmt = select(GroupBracket).where(
        and_(
            GroupBracket.user_id == current_user.id,
            GroupBracket.bracket_id == bracket_id,
        )
    )

    return db.session.scalars(stmt).unique().all()


def get_my_bracket_years():
    stmt = (
        select(distinct(Bracket.year))
        .where(Bracket.user_id == current_user.id)
        .order_by(Bracket.year.desc())
    )

    return db.session.scalars(stmt).all()


def delete_bracket(bracket_id):
    if not g.CAN_EDIT_BRACKET:
        return

    stmt = delete(Bracket).where(
        and_(
            Bracket.id == bracket_id,
            Bracket.user_id == current_user.id,
            Bracket.year == g.YEAR,
        )
    )
    result = db.session.execute(stmt)
    db.session.commit()

    return result.rowcount


def get_all_brackets_joined():
    stmt = (
        select(Bracket)
        .where(Bracket.year == g.YEAR)
        .options(joinedload(Bracket.group_brackets), joinedload(Bracket.games_list))
    )

    return db.session.scalars(stmt).unique().all()


def get_all_brackets(year=g.YEAR):
    stmt = select(Bracket).where(Bracket.year == year)

    return db.session.scalars(stmt).unique().all()


def get_all_group_brackets(year=g.YEAR):
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
