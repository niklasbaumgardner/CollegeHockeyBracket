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
from sqlalchemy.dialects.postgresql import insert as pg_insert


def get_all_teams():
    stmt = select(Team).order_by(Team.name)
    return db.session.scalars(stmt).unique().all()


def get_team_by_name(name):
    stmt = select(Team).where(Team.name == name)
    return db.session.scalars(stmt.limit(1)).first()


def get_team_by_id(id):
    stmt = select(Team).where(Team.id == id)
    return db.session.scalars(stmt.limit(1)).first()


def get_icon_path(name):
    name_stripped = name.replace(" ", "").replace(".", "")
    return f"/static/images/{name_stripped}.svg"


def create_team(teamname):
    icon_path = get_icon_path(teamname)

    stmt = insert(Team).values(name=teamname, icon_path=icon_path)

    db.session.execute(stmt)
    db.session.commit()


# TODO: fix this method
def create_bracket_teams(team_id, rank):
    # There aren't any keys we can make unique to make an actual upsert statement so just delete bracket teams for
    stmt = insert(BracketTeam).values(team_id=team_id, rank=rank, year=YEAR)
    upsert_stmt = stmt.on_conflict_do_update(
        constraint="correct_game_bracket_id_game_number_unique",
        set_={
            "winner_id": stmt.excluded.winner_id,
            "top_team_goals": stmt.excluded.top_team_goals,
            "bottom_team_goals": stmt.excluded.bottom_team_goals,
        },
    )


def get_team_by_bracket_team_id(id):
    b_team = get_bracket_team_by_id(id=id)
    return get_team_by_id(id=b_team.team_id)


def create_default_bracket_team(team_id, rank):
    b_team = BracketTeam(team_id=team_id, rank=rank, year=YEAR)
    db.session.add(b_team)
    db.session.commit()
    return b_team


def create_bracket_team(team_name, rank, year):
    team = get_team_by_name(name=team_name)
    b_team = BracketTeam(team_id=team.id, rank=rank, year=year)
    db.session.add(b_team)
    db.session.commit()


def get_bracket_team_by_name_and_year(team_name, year):
    team = get_team_by_name(name=team_name)
    return BracketTeam.query.filter_by(team_id=team.id, year=year).first()


def get_bracket_team_by_id(id):
    return BracketTeam.query.filter_by(id=id).first()


def get_all_bracket_teams():
    return BracketTeam.query.filter_by(year=YEAR).all()


def get_all_bracket_teams_for_year(year):
    return BracketTeam.query.filter_by(year=year).all()
