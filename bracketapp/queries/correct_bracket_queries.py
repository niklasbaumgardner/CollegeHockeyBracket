from sqlalchemy import and_, insert, select, update
from sqlalchemy.dialects.postgresql import insert as pg_insert
from sqlalchemy.orm import joinedload

from bracketapp import cache, db
from bracketapp.config import YEAR
from bracketapp.models import (
    CorrectBracket,
    CorrectGame,
)
from bracketapp.utils.constants import correct_bracket_cache_key
from bracketapp.utils.Sqids import sqids


def create_correct_bracket():
    stmt = insert(CorrectBracket).values(year=YEAR)
    result = db.session.execute(stmt)

    new_correct_bracket_id = result.inserted_primary_key[0]

    games = [
        dict(
            bracket_id=new_correct_bracket_id,
            game_number=f"game{i}",
        )
        for i in range(1, 16)
    ]

    stmt = insert(CorrectGame).values(games)
    db.session.execute(stmt)
    db.session.commit()

    return new_correct_bracket_id


def get_all_completed_correct_brackets():
    stmt = (
        select(CorrectBracket)
        .where(CorrectBracket.winner_id != None)
        .order_by(CorrectBracket.year.desc())
    )
    return db.session.scalars(stmt).unique().all()


def get_correct_bracket(year=YEAR, include_games=False):
    cache_key = correct_bracket_cache_key(year, include_games)
    if result := cache.get(cache_key):
        return result

    stmt = select(CorrectBracket).where(CorrectBracket.year == year)
    if include_games:
        stmt = stmt.options(joinedload(CorrectBracket.games_list))
    correct_bracket = db.session.scalars(stmt.limit(1)).first()

    cache.set(cache_key, correct_bracket)
    return correct_bracket


def update_correct_bracket_from_form(form_data):
    update_dict = {}
    update_dict["winner_id"] = sqids.decode_one(form_data.get("game15"))
    update_dict["winner_goals"] = form_data.get("winner_goals")
    update_dict["loser_goals"] = form_data.get("loser_goals")

    correct_bracket = get_correct_bracket()

    bracket_stmt = (
        update(CorrectBracket)
        .where(
            and_(
                CorrectBracket.id == correct_bracket.id,
                CorrectBracket.year == YEAR,
            )
        )
        .values(update_dict)
    )

    db.session.execute(bracket_stmt)

    games = [
        dict(
            bracket_id=correct_bracket.id,
            game_number=f"game{i}",
            winner_id=sqids.decode_one(form_data.get(f"game{i}")),
            top_team_goals=form_data.get(f"game{i}-h_goals"),
            bottom_team_goals=form_data.get(f"game{i}-a_goals"),
        )
        for i in range(1, 16)
        if form_data.get(f"game{i}")
    ]

    stmt = pg_insert(CorrectGame).values(games)
    upsert_stmt = stmt.on_conflict_do_update(
        constraint="correct_game_bracket_id_game_number_unique",
        set_={
            "winner_id": stmt.excluded.winner_id,
            "top_team_goals": stmt.excluded.top_team_goals,
            "bottom_team_goals": stmt.excluded.bottom_team_goals,
        },
    )

    db.session.execute(upsert_stmt)

    db.session.commit()
