from copy import deepcopy

from flask_login import current_user
from sqlalchemy import (
    and_,
    collate,
    delete,
    distinct,
    exists,
    func,
    insert,
    literal,
    or_,
    select,
    update,
)
from sqlalchemy.dialects.postgresql import insert as pg_insert

from bracketapp import db
from bracketapp.config import CAN_EDIT_BRACKET, YEAR
from bracketapp.models import Bracket, Group, GroupBracket, GroupMember


def get_all_groups_for_user(year=None):
    if year is None:
        year = YEAR

    stmt = (
        select(Group, Bracket, GroupBracket)
        .outerjoin(GroupMember, Group.id == GroupMember.group_id)
        .outerjoin(GroupBracket, Group.id == GroupBracket.group_id)
        .outerjoin(Bracket, Bracket.id == GroupBracket.bracket_id)
        .where(
            and_(
                Group.year == year,
                GroupMember.user_id == current_user.id,
                or_(
                    Bracket.id.is_(None),
                    Bracket.user_id == current_user.id,
                ),
                or_(
                    GroupBracket.id.is_(None),
                    GroupBracket.user_id == current_user.id,
                ),
            )
        )
        .order_by(collate(Group.name, "en_US"))
    )

    groups = db.session.execute(stmt).unique().all()

    return_groups = []
    seen_groups = {}

    for index, [g, b, gb] in enumerate(groups):
        if g.id not in seen_groups:
            seen_groups[g.id] = [g, index]

        if b:
            b_copy = deepcopy(b)
            b_copy.group_bracket = gb

            return_group, _ = seen_groups[g.id]
            return_group.brackets.append(b_copy)

    for value in seen_groups.values():
        group, index = value
        return_groups.insert(index, group)

    return return_groups


def get_group(group_id):
    stmt = select(Group).where(Group.id == group_id)
    return db.session.scalars(stmt.limit(1)).first()


def get_my_group(group_id):
    stmt = select(Group).where(
        and_(Group.id == group_id, Group.creator_id == current_user.id)
    )
    return db.session.scalars(stmt.limit(1)).first()


def get_all_groups(year=YEAR):
    stmt = select(Group).where(Group.year == year)
    return db.session.scalars(stmt).unique().all()


def get_all_group_ids_for_year(year=YEAR):
    stmt = select(distinct(Group.id)).where(Group.year == year)
    return db.session.scalars(stmt).all()


def get_group_member(group_id):
    if not current_user.is_authenticated:
        return None

    stmt = select(GroupMember).where(
        and_(GroupMember.user_id == current_user.id, GroupMember.group_id == group_id)
    )

    return db.session.scalars(stmt.limit(1)).first()


def is_group_member(group_id):
    if not current_user.is_authenticated:
        return False

    stmt = select(
        exists().where(
            and_(
                GroupMember.group_id == group_id, current_user.id == GroupMember.user_id
            )
        )
    )

    return db.session.scalar(stmt)


def get_my_group_ids_for_bracket_id(bracket_id):
    stmt = (
        select(distinct(Group.id))
        .join(GroupBracket, Group.id == GroupBracket.group_id)
        .where(
            and_(
                GroupBracket.user_id == current_user.id,
                GroupBracket.bracket_id == bracket_id,
            )
        )
    )

    return db.session.scalars(stmt).all()


def get_my_group_ids():
    stmt = (
        select(distinct(Group.id))
        .join(GroupBracket, Group.id == GroupBracket.group_id)
        .where(
            and_(
                GroupBracket.user_id == current_user.id,
            )
        )
    )

    return db.session.scalars(stmt).all()


def search_groups(group_name):
    if not group_name:
        return []

    stmt = select(Group).where(
        and_(
            Group.year == YEAR,
            Group.name.ilike(f"%{group_name}%"),
            Group.locked == False,
        )
    )
    return db.session.scalars(stmt.limit(10)).unique().all()


def create_group(name, is_private, password):
    stmt = insert(Group).values(
        year=YEAR,
        name=name,
        is_private=is_private,
        locked=False,
        password=password,
        creator_id=current_user.id,
    )

    result = db.session.execute(stmt)
    db.session.commit()

    group_id = result.inserted_primary_key.id
    return group_id


def update_group(group_id, name=None, is_private=None, password=None, locked=None):
    update_dict = {}
    if name is not None:
        update_dict["name"] = name.strip()

    if is_private is not None:
        update_dict["is_private"] = is_private

        if is_private and password is not None:
            update_dict["password"] = password
        else:
            update_dict["password"] = None

    if locked is not None:
        update_dict["locked"] = locked

    stmt = (
        update(Group)
        .values(update_dict)
        .where(
            and_(
                Group.year == YEAR,
                Group.id == group_id,
                Group.creator_id == current_user.id,
            )
        )
    )
    db.session.execute(stmt)
    db.session.commit()


def get_group_member_count(group_id):
    stmt = select(func.count(1)).where(GroupMember.group_id == group_id)
    return db.session.execute(stmt).scalar_one()


def update_group_member_count(group_id, commit=True):
    member_count = get_group_member_count(group_id)

    stmt = update(Group).where(Group.id == group_id).values(member_count=member_count)
    db.session.execute(stmt)

    if commit:
        db.session.commit()


def get_group_bracket_count(group_id):
    stmt = select(func.count(1)).where(GroupBracket.group_id == group_id)
    return db.session.execute(stmt).scalar_one()


def update_group_bracket_count(group_id, commit=True):
    bracket_count = get_group_bracket_count(group_id)

    stmt = update(Group).where(Group.id == group_id).values(bracket_count=bracket_count)
    db.session.execute(stmt)

    if commit:
        db.session.commit()


def upsert_group_member(group_id):
    select_stmt = select(
        literal(group_id).label("group_id"),
        literal(current_user.id).label("user_id"),
    ).where(
        and_(
            select(1).where(and_(Group.id == group_id, Group.year == YEAR)).exists(),
        )
    )

    stmt = pg_insert(GroupMember).from_select(["group_id", "user_id"], select_stmt)

    upsert_stmt = stmt.on_conflict_do_nothing(
        constraint="group_member_group_id_user_id_key",
    )
    result = db.session.execute(upsert_stmt)

    new_group_member_id = result.inserted_primary_key[0]

    if new_group_member_id:
        update_group_member_count(group_id, commit=False)

    db.session.commit()
    return new_group_member_id


def create_group_bracket(group_id, bracket_id):
    select_stmt = select(
        literal(group_id).label("group_id"),
        literal(bracket_id).label("bracket_id"),
        literal(current_user.id).label("user_id"),
    ).where(
        and_(
            select(1)
            .where(
                and_(
                    GroupMember.user_id == current_user.id,
                    GroupMember.group_id == group_id,
                )
            )
            .exists(),
            select(1).where(and_(Group.id == group_id, Group.year == YEAR)).exists(),
            select(1)
            .where(
                and_(
                    Bracket.id == bracket_id,
                    Bracket.year == YEAR,
                    Bracket.user_id == current_user.id,
                )
            )
            .exists(),
        )
    )
    stmt = pg_insert(GroupBracket).from_select(
        ["group_id", "bracket_id", "user_id"], select_stmt
    )

    upsert_stmt = stmt.on_conflict_do_nothing(
        constraint="group_bracket_group_id_bracket_id_key",
    )
    result = db.session.execute(upsert_stmt)

    update_group_bracket_count(group_id, commit=False)

    db.session.commit()
    return result.rowcount


def get_my_group_bracket_for_id(group_bracket_id):
    stmt = select(GroupBracket).where(
        and_(
            GroupBracket.id == group_bracket_id, GroupBracket.user_id == current_user.id
        )
    )

    return db.session.scalars(stmt.limit(1)).first()


def delete_group_bracket(group_bracket_id):
    if not CAN_EDIT_BRACKET:
        return

    stmt = (
        delete(GroupBracket)
        .where(
            and_(
                GroupBracket.id == group_bracket_id,
                GroupBracket.user_id == current_user.id,
                select(1)
                .where(
                    and_(
                        GroupMember.user_id == current_user.id,
                        GroupMember.group_id == GroupBracket.group_id,
                    )
                )
                .exists(),
                select(1)
                .where(and_(Group.id == GroupBracket.group_id, Group.year == YEAR))
                .exists(),
                select(1)
                .where(
                    and_(
                        Bracket.id == GroupBracket.bracket_id,
                        Bracket.year == YEAR,
                        Bracket.user_id == current_user.id,
                    )
                )
                .exists(),
            )
        )
        .returning(GroupBracket.bracket_id, GroupBracket.group_id)
    )

    result = db.session.execute(stmt).all()

    db.session.commit()

    if len(result) == 0:
        return 0, None, None
    elif len(result) == 1:
        update_group_bracket_count(result[0].group_id, commit=True)
        return 1, result[0].bracket_id, result[0].group_id
    else:
        raise RuntimeError("Deleting more than 1 group bracket. Impossible")


def delete_group(group_id):
    if not CAN_EDIT_BRACKET:
        return

    stmt = delete(Group).where(
        and_(
            Group.id == group_id,
            Group.creator_id == current_user.id,
            Group.year == YEAR,
        )
    )

    result = db.session.execute(stmt)
    db.session.commit()

    return result.rowcount
