from bracketapp.models import (
    Bracket,
    Game,
    GroupBracket,
    DefaultBracket,
    DefaultGame,
    Team,
    BracketTeam,
)
from bracketapp import db
from bracketapp.utils import bracket_utils
from bracketapp.config import YEAR, CAN_EDIT_BRACKET
from bracketapp.queries import group_queries
from flask_login import current_user
from sqlalchemy.sql import func, asc
from sqlalchemy.orm import joinedload
from sqlalchemy import func, insert, select, update
from sqlalchemy.sql import or_, and_
from bracketapp.utils.Sqids import sqids


def create_default_bracket():
    stmt = insert(DefaultBracket).values(year=YEAR)
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


def get_default_bracket(year=YEAR):
    stmt = select(DefaultBracket).where(DefaultBracket.year == year)
    return db.session.scalars(stmt.limit(1)).first()


def get_bracket_teams_count(year=YEAR):
    stmt = select(func.count(1)).where(BracketTeam.year == year)
    return db.session.execute(stmt).scalar_one()


def create_bracket_teams_from_form(form_data):
    bracket_teams_list = []
    for i in range(1, 9):
        top_team = dict(
            team_id=sqids.decode_one(form_data.get(f"game{i}-top-team-id")),
            rank=form_data.get(f"game{i}-top-team-rank"),
            year=YEAR,
        )

        bottm_team = dict(
            team_id=sqids.decode_one(form_data.get(f"game{i}-bottom-team-id")),
            rank=form_data.get(f"game{i}-bottom-team-rank"),
            year=YEAR,
        )
        bracket_teams_list.append(top_team)
        bracket_teams_list.append(bottm_team)

    print(len(bracket_teams_list), bracket_teams_list)

    stmt = insert(BracketTeam).returning(BracketTeam.id)
    result = db.session.execute(stmt, bracket_teams_list)
    row_ids = result.all()

    print(len(row_ids), row_ids)

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

    print(len(games_update_list), games_update_list)

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
                # year=YEAR,
            )
        )

        bracket_teams.append(
            dict(
                id=sqids.decode_one(form_data.get(f"game{i}-top-bracket-team-id")),
                team_id=sqids.decode_one(form_data.get(f"game{i}-bottom-team-id")),
                rank=form_data.get(f"game{i}-bottom-team-rank"),
                # year=YEAR,
            )
        )

    db.session.execute(update(BracketTeam), bracket_teams)
    db.session.commit()


# TODO: This needs to be updated.
# Once a default bracket is created, there should be ability to update it
# meaning bracket_teams can be updated.
# There should be a separate method for creating a default bracket
def update_default_bracket_from_form(form_data):
    if get_bracket_teams_count() == 16:
        update_bracket_teams_from_form(form_data)
    else:
        create_bracket_teams_from_form(form_data)

    return
