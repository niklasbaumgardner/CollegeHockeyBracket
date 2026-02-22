from sqlalchemy import select

from bracketapp import db
from bracketapp.models import Team


def get_all_teams():
    stmt = select(Team).order_by(Team.name)
    return db.session.scalars(stmt).unique().all()


def get_team_by_name(name):
    stmt = select(Team).where(Team.name == name)
    return db.session.scalars(stmt.limit(1)).first()


def get_team_by_long_name(name):
    stmt = select(Team).where(Team.long_name == name)
    return db.session.scalars(stmt.limit(1)).first()


def get_team_by_short_name(name):
    stmt = select(Team).where(Team.short_name == name)
    return db.session.scalars(stmt.limit(1)).first()


def get_icon_path(name):
    name_stripped = name.replace(" ", "").replace(".", "")
    return f"/static/images/{name_stripped}.svg"
