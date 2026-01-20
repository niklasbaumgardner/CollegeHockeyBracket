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


def get_icon_path(name):
    name_stripped = name.replace(" ", "").replace(".", "")
    return f"/static/images/{name_stripped}.svg"


def create_team(teamname):
    icon_path = get_icon_path(teamname)

    stmt = insert(Team).values(name=teamname, icon_path=icon_path)

    db.session.execute(stmt)
    db.session.commit()
