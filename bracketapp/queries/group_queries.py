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
from bracketapp.config import YEAR
from flask_login import current_user
from sqlalchemy import and_, or_
from sqlalchemy.sql import func, asc


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
        .join(
            Bracket,
            and_(
                Bracket.id == GroupBracket.bracket_id,
                or_(Bracket.user_id is None, Bracket.user_id == current_user.id),
            ),
            isouter=True,
        )
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


def edit_group(group_id, name, is_private, password, locked):
    group = get_group(group_id=group_id)

    if group.name != name:
        group.name = name

    if group.is_private != is_private:
        group.is_private = is_private

    if group.password != password:
        group.password = password

    if group.locked != locked:
        group.locked = locked

    db.session.commit()
    return group


def get_group_bracket_for_group_and_bracket(group_id, bracket_id):
    return GroupBracket.query.filter_by(
        group_id=group_id, bracket_id=bracket_id, user_id=current_user.id
    ).first()


def create_group_bracket(group_id, bracket_id):
    if get_group_bracket_for_group_and_bracket(
        group_id=group_id, bracket_id=bracket_id
    ):
        return

    group_bracket = GroupBracket(
        group_id=group_id, bracket_id=bracket_id, user_id=current_user.id
    )
    db.session.add(group_bracket)
    db.session.commit()
    return group_bracket


def get_my_group_bracket_for_id(group_bracket_id):
    if not current_user.is_authenticated:
        return None

    return GroupBracket.query.filter_by(
        user_id=current_user.id, id=group_bracket_id
    ).first()


def delete_group_bracket(group_bracket_id):
    gb = get_my_group_bracket_for_id(group_bracket_id=group_bracket_id)
    if gb:
        db.session.delete(gb)
        db.session.commit()


def search_groups(group_name):
    if not group_name:
        return []

    return (
        Group.query.filter_by(year=YEAR)
        .where(Group.name.ilike(f"%{group_name}%"))
        .limit(10)
        .all()
    )


def delete_group(group_id):
    group = get_group(group_id=group_id)

    if not group:
        return

    if current_user.is_authenticated and group.created_by != current_user.id:
        return

    # Have to delete group members and group brackets first
    group_members = GroupMember.query.filter_by(group_id=group_id).all()
    group_brackets = GroupBracket.query.filter_by(group_id=group_id).all()

    for group_member in group_members:
        db.session.delete(group_member)

    for group_bracket in group_brackets:
        db.session.delete(group_bracket)

    db.session.delete(group)
    db.session.commit()
