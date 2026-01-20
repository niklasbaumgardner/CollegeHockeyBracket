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
        for i in range(1, 16)
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

    stmt = insert(BracketTeam).values(bracket_teams_list)
    result = db.session.execute(stmt)
    row_ids = result.inserted_primary_key_rows

    games_update_list = []
    for i in range(8):
        index = i * 2

        games_update_list.append(
            dict(
                id=sqids.decode_one(form_data.get(f"game${i + 1}-id")),
                top_team_id=row_ids[index],
                bottom_team_id=row_ids[index + 1],
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

    games = [
        dict(
            id=sqids.decode_one(form_data.get(f"game${i}-id")),
        )
        for i in range(1, 9)
    ]

    stmt = insert(DefaultGame).values(games)
    upsert_stmt = stmt.on_conflict_do_update(
        constraint="default_game_bracket_id_game_number_unique",
        set_={
            "winner_id": stmt.excluded.winner_id,
            "top_team_goals": stmt.excluded.top_team_goals,
            "bottom_team_goals": stmt.excluded.bottom_team_goals,
        },
    )

    db.session.execute(upsert_stmt)

    db.session.commit()

    for i in range(1, 9):
        game_num = f"game{i}"

        home_team_id = request.form.get(f"{game_num}-home")
        home_team_rank = request.form.get(f"{game_num}-home-rank")

        home_bracket_team = bracket_queries.create_default_bracket_team(
            team_id=home_team_id, rank=home_team_rank
        )

        away_team_id = request.form.get(f"{game_num}-away")
        away_team_rank = request.form.get(f"{game_num}-away-rank")

        away_bracket_team = bracket_queries.create_default_bracket_team(
            team_id=away_team_id, rank=away_team_rank
        )

        bracket_queries.update_default_game(
            b_id=d_bracket.id,
            game_num=game_num,
            home=home_bracket_team.id,
            away=away_bracket_team.id,
        )
