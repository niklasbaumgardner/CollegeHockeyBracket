from sqlalchemy import func, insert, select, update

from bracketapp import cache, db
from bracketapp.globals import g
from bracketapp.models import (
    BracketTeam,
    DefaultBracket,
    DefaultGame,
)
from bracketapp.utils import cache_invalidator
from bracketapp.utils.constants import default_bracket_cache_key
from bracketapp.utils.Sqids import sqids


def create_default_bracket():
    stmt = insert(DefaultBracket).values(year=g.YEAR)
    result = db.session.execute(stmt)

    new_default_bracket_id = result.inserted_primary_key[0]

    games = [
        dict(
            bracket_id=new_default_bracket_id,
            game_number=f"game{i}",
        )
        for i in range(1, 9)
    ]

    stmt = insert(DefaultGame).values(games)
    db.session.execute(stmt)
    db.session.commit()

    return new_default_bracket_id


def get_default_bracket(year=g.YEAR):
    cache_key = default_bracket_cache_key(year)
    if result := cache.get(cache_key):
        return result

    stmt = select(DefaultBracket).where(DefaultBracket.year == year)
    default_bracket = db.session.scalars(stmt.limit(1)).first()

    cache.set(cache_key, default_bracket)
    return default_bracket


def get_bracket_teams_count(year=g.YEAR):
    stmt = select(func.count(1)).where(BracketTeam.year == year)
    return db.session.execute(stmt).scalar_one()


def create_bracket_teams_from_form(form_data):
    bracket_teams_list = []
    for i in range(1, 9):
        top_team = dict(
            team_id=sqids.decode_one(form_data.get(f"game{i}-top-team-id")),
            rank=form_data.get(f"game{i}-top-team-rank"),
            year=g.YEAR,
        )

        bottm_team = dict(
            team_id=sqids.decode_one(form_data.get(f"game{i}-bottom-team-id")),
            rank=form_data.get(f"game{i}-bottom-team-rank"),
            year=g.YEAR,
        )
        bracket_teams_list.append(top_team)
        bracket_teams_list.append(bottm_team)

    stmt = insert(BracketTeam).returning(BracketTeam.id)
    result = db.session.execute(stmt, bracket_teams_list)
    row_ids = result.all()

    games_update_list = []
    for i in range(8):
        index = i * 2

        games_update_list.append(
            dict(
                id=sqids.decode_one(form_data.get(f"game{i + 1}-id")),
                top_team_id=row_ids[index][0],
                bottom_team_id=row_ids[index + 1][0],
            )
        )

    db.session.execute(update(DefaultGame), games_update_list)
    db.session.commit()


def update_bracket_teams_from_form(form_data):
    bracket_teams = []
    for i in range(1, 9):
        bracket_teams.append(
            dict(
                id=sqids.decode_one(form_data.get(f"game{i}-top-bracket-team-id")),
                team_id=sqids.decode_one(form_data.get(f"game{i}-top-team-id")),
                rank=form_data.get(f"game{i}-top-team-rank"),
                # year=g.YEAR,
            )
        )

        bracket_teams.append(
            dict(
                id=sqids.decode_one(form_data.get(f"game{i}-bottom-bracket-team-id")),
                team_id=sqids.decode_one(form_data.get(f"game{i}-bottom-team-id")),
                rank=form_data.get(f"game{i}-bottom-team-rank"),
                # year=g.YEAR,
            )
        )

    db.session.execute(update(BracketTeam), bracket_teams)
    db.session.commit()


def update_default_bracket_from_form(form_data):
    if get_bracket_teams_count() == 16:
        update_bracket_teams_from_form(form_data)
    else:
        create_bracket_teams_from_form(form_data)

    cache_invalidator.default_bracket()
