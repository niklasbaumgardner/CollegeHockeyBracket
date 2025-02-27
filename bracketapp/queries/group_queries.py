from bracketapp.models import (
    CorrectBracket,
    CorrectGame,
    Bracket,
    Game,
    Group,
    GroupBracket,
    GroupMember,
    DefaultBracket,
    DefaultGame,
    Team,
    BracketTeam,
)
from bracketapp import db
from bracketapp.utils import bracket_utils
from bracketapp.config import YEAR
from flask_login import current_user
from sqlalchemy.sql import func, asc
from sqlalchemy.orm import joinedload


def create_group_member(group_id):
    group_member = GroupMember(group_id=group_id, user_id=current_user.id)
    db.session.add(group_member)
    db.session.commit()
    return group_member


def get_group_member(group_id):
    if not current_user.is_authenticated:
        return None

    return GroupMember.query.filter_by(
        group_id=group_id, user_id=current_user.id
    ).first()


def maybe_create_group_member(group_id):
    group_member = get_group_member(group_id)
    if not group_member:
        group_member = create_group_member(group_id)

    return group_member


def create_group(name, is_private, password):
    group = Group(
        year=YEAR,
        name=name,
        is_private=is_private,
        locked=False,
        password=password,
        created_by=current_user.id,
    )
    db.session.add(group)
    db.session.commit()
    return group


def get_group(group_id):
    return Group.query.filter_by(id=group_id).first()


def get_all_groups():
    return Group.query.filter_by(year=YEAR).all()


def get_all_groups_for_user(sort=False):
    db.session.query(Group).where(Group.year == YEAR)
    groups_query = (
        db.session.query(Group, Bracket, GroupBracket)
        .join(GroupMember, Group.id == GroupMember.group_id, isouter=True)
        .join(GroupBracket, Group.id == GroupBracket.group_id, isouter=True)
        .join(Bracket, Bracket.id == GroupBracket.bracket_id, isouter=True)
        .where(
            Group.year == YEAR,
            GroupMember.user_id == current_user.id,
        )
    )

    if sort:
        groups_query = groups_query.order_by(asc(func.lower(Group.name)))

    groups = groups_query.all()

    return_groups = []
    seen_groups = {}
    for index, [g, b, gb] in enumerate(groups):
        if g.id not in seen_groups:
            seen_groups[g.id] = [g, index]

        if b and gb:
            b.group_bracket = gb

            return_group, _ = seen_groups[g.id]
            return_group.brackets.append(b)

    for value in seen_groups.values():
        group, index = value
        return_groups.insert(index, group)

    return return_groups


def lock_group(group_id):
    group = get_group(group_id=group_id)
    group.locked = True
    db.session.commit()
    return group


def create_group_bracket(group_id, bracket_id):
    group_bracket = GroupBracket(
        group_id=group_id, bracket_id=bracket_id, user_id=current_user.id
    )
    db.session.add(group_bracket)
    db.session.commit()
    return group_bracket


def search_groups(group_name):
    if not group_name:
        return []

    return (
        Group.query.filter_by(year=YEAR)
        .where(Group.name.ilike(f"%{group_name}%"))
        .limit(10)
        .all()
    )
