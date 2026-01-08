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


def get_default_bracket(year=YEAR):
    stmt = select(DefaultBracket).where(DefaultBracket.year == year)
    return db.session.scalars(stmt.limit(1)).first()


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


# TODO: This needs to be updated.
# Once a default bracket is created, there should be ability to update it
# meaning bracket_teams can be updated.
# There should be a separate method for creating a default bracket
def update_default_bracket_from_form(form_data):
    update_dict = {}
    update_dict["winner_id"] = sqids.decode_one(form_data.get("game15"))
    update_dict["winner_goals"] = form_data.get("winner_goals")
    update_dict["loser_goals"] = form_data.get("loser_goals")

    default_bracket = get_default_bracket()

    top_teams = [
        dict(
            team_id=sqids.decode_one(form_data.get(f"game{i}-top-team-id")),
            rank=form_data.get(f"game{i}-top-team-rank"),
            year=YEAR,
        )
        for i in range(1, 9)
    ]
    bottom_teams = [
        dict(
            team_id=sqids.decode_one(form_data.get(f"game{i}-bottom-team-id")),
            rank=form_data.get(f"game{i}-bottom-team-rank"),
            year=YEAR,
        )
        for i in range(1, 9)
    ]

    games = [
        dict(
            bracket_id=default_bracket.id,
            game_number=f"game{i}",
            winner_id=sqids.decode_one(form_data.get(f"game{i}")),
            top_team_goals=form_data.get(f"game{i}-h_goals"),
            bottom_team_goals=form_data.get(f"game{i}-a_goals"),
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


# def delete_default_bracket():
#     default = get_default_bracket()

#     for game in default.games_list:
#         db.session.delete(game)

#     db.session.delete(default)
#     db.session.commit()
