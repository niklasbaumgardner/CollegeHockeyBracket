from sqlalchemy.util.topological import sort
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
from sqlalchemy.orm import joinedload, contains_eager, with_loader_criteria
from sqlalchemy import and_, func, insert, select, update, delete
from bracketapp.utils.Sqids import sqids
from sqlalchemy.dialects.postgresql import insert as pg_insert


##
## Bracket and Game queries
##


def get_empty_bracket():
    # TODO: return just a dict?
    return Bracket(
        user_id=None,
        name="",
        year=YEAR,
        winner=None,
        winner_goals=None,
        loser_goals=None,
        max_points=320,
        points=0,
    )


def create_bracket_from_form(form_data):
    game15 = form_data.get("game15")
    name = form_data.get("name")
    winner_goals = form_data.get("winner_goals")
    loser_goals = form_data.get("loser_goals")

    stmt = insert(Bracket).values(
        user_id=current_user.id,
        name=name[:60].strip(),
        year=YEAR,
        winner_id=sqids.decode_one(game15),
        winner_goals=winner_goals,
        loser_goals=loser_goals,
        max_points=320,
        points=0,
    )

    result = db.session.execute(stmt)

    new_bracket_id = result.inserted_primary_key[0]

    games = [
        dict(
            user_id=current_user.id,
            bracket_id=new_bracket_id,
            game_number=f"game{i}",
            winner_id=sqids.decode_one(form_data.get(f"game{i}")),
        )
        for i in range(1, 16)
    ]

    stmt = insert(Game).values(games)
    db.session.execute(stmt)
    db.session.commit()


def update_bracket_from_form(bracket_id, form_data):
    update_dict = {}
    update_dict["name"] = form_data.get("name")[:60].strip()
    update_dict["winner_id"] = sqids.decode_one(form_data.get("game15"))
    update_dict["winner_goals"] = form_data.get("winner_goals")
    update_dict["loser_goals"] = form_data.get("loser_goals")

    bracket_stmt = (
        update(Bracket)
        .where(
            Bracket.id == bracket_id,
            Bracket.user_id == current_user.id,
            Bracket.year == YEAR,
        )
        .values(update_dict)
    )

    db.session.execute(bracket_stmt)

    games = [
        dict(
            user_id=current_user.id,
            bracket_id=bracket_id,
            game_number=f"game{i}",
            winner_id=sqids.decode_one(form_data.get(f"game{i}")),
        )
        for i in range(1, 16)
    ]

    stmt = pg_insert(Game).values(games)
    upsert_stmt = stmt.on_conflict_do_update(
        constraint="game_bracket_id_game_number_unique",
        set_={
            "winner_id": stmt.excluded.winner_id,
        },
    )

    db.session.execute(upsert_stmt)

    db.session.commit()


def get_my_bracket_for_bracket_id(bracket_id, include_games=False):
    if not bracket_id:
        return

    stmt = select(Bracket).where(
        and_(
            Bracket.id == bracket_id,
            Bracket.user_id == current_user.id,
            Bracket.year == YEAR,
        )
    )
    if include_games:
        stmt = stmt.options(joinedload(Bracket.games_list))
    return db.session.scalars(stmt.limit(1)).first()


def get_bracket_for_bracket_id(bracket_id):
    if not bracket_id:
        return

    stmt = (
        select(Bracket)
        .where(Bracket.id == bracket_id)
        .options(joinedload(Bracket.group_brackets), joinedload(Bracket.games_list))
    )
    return db.session.scalars(stmt.limit(1)).first()


def my_bracket_count():
    if current_user.is_authenticated:
        stmt = select(func.count(Bracket.id)).where(
            and_(Bracket.user_id == current_user.id, Bracket.year == YEAR)
        )
        return db.session.execute(stmt).scalar_one()

    return 0


def get_my_brackets(include_group_brackets=False):
    if not current_user.is_authenticated:
        return []

    stmt = select(Bracket).where(
        and_(Bracket.user_id == current_user.id, Bracket.year == YEAR)
    )
    if include_group_brackets:
        stmt = stmt.options(joinedload(Bracket.group_brackets))

    brackets = db.session.scalars(stmt).unique().all()

    # sort in js

    return brackets


def get_brackets_for_group(group_id):
    stmt = (
        select(Bracket)
        .join(GroupBracket, Bracket.id == GroupBracket.bracket_id)
        .where(GroupBracket.group_id == group_id)
        .options(contains_eager(Bracket.group_bracket))
    )

    # TODO: Maybe sort here?

    return db.session.scalars(stmt).unique().all()


def delete_bracket(bracket_id):
    if not CAN_EDIT_BRACKET:
        return

    stmt = delete(Bracket).where(
        and_(
            Bracket.id == bracket_id,
            Bracket.user_id == current_user.id,
            Bracket.year == YEAR,
        )
    )
    db.session.execute(stmt)
    db.session.commit()


def get_all_brackets_joined():
    stmt = (
        select(Bracket)
        .where(Bracket.year == YEAR)
        .options(joinedload(Bracket.group_brackets), joinedload(Bracket.games_list))
    )

    return db.session.scalars(stmt).all()


#####################################################################################


def is_admin():
    return (
        current_user.is_authenticated
        and current_user.role is not None
        and current_user.role > 1
    )


##
## Bracket and Game queries
##


def get_group_brackets_for_bracket(bracket_id):
    if not current_user.is_authenticated:
        return []

    stmt = select(GroupBracket).where(
        and_(
            GroupBracket.user_id == current_user.id,
            GroupBracket.bracket_id == bracket_id,
        )
    )

    return db.session.scalars(stmt).all()
    # return GroupBracket.query.filter_by(bracket_id=bracket_id).all()


def get_my_group_brackets_for_bracket(bracket_id):
    if not current_user.is_authenticated:
        return []

    stmt = select(GroupBracket).where(
        and_(
            GroupBracket.user_id == current_user.id,
            GroupBracket.bracket_id == bracket_id,
        )
    )

    return db.session.scalars(stmt).all()

    # return GroupBracket.query.filter_by(
    #     user_id=current_user.id, bracket_id=bracket_id
    # ).all()


def get_game(bracket_id, game_num):
    if not bracket_id or not game_num:
        return

    return Game.query.filter_by(bracket_id=bracket_id, game_num=game_num).first()


def get_all_brackets(year=YEAR):
    stmt = select(Bracket).where(Bracket.year == year)

    # return db.session.scalars(stmt).all()
    return db.session.scalars(stmt).unique().all()

    # return Bracket.query.filter_by(year=YEAR).all()

    # return (
    #     Bracket.query.filter_by(year=YEAR)
    #     .options(joinedload(Bracket.group_brackets))
    #     .all()
    # )


# def get_all_brackets_for_year(year):
#     if not year:
#         return []
#     return Bracket.query.filter_by(year=year).all()


# def get_all_games_for_bracket(bracket_id):
#     if not bracket_id:
#         return []
#     return Game.query.filter_by(bracket_id=bracket_id).all()


# def delete_all_brackets():
#     if not is_admin():
#         return

#     brackets = Bracket.query.filter_by(year=YEAR).all()
#     for b in brackets:
#         __admin_delete_bracket__(b.id)


# def __admin_delete_bracket__(bracket_id):
#     if not is_admin():
#         return

#     bracket = get_bracket_for_bracket_id(bracket_id=bracket_id)
#     games = get_all_games_for_bracket(bracket_id=bracket.id)
#     group_brackets = get_group_brackets_for_bracket(bracket_id=bracket.id)

#     for group_bracket in group_brackets:
#         db.session.delete(group_bracket)

#     for game in games:
#         db.session.delete(game)

#     db.session.delete(bracket)
#     db.session.commit()


# def delete_bracket(bracket_id):
#     # You can only delete your own brackets here
#     bracket = get_my_bracket_for_bracket_id(bracket_id=bracket_id)
#     games = get_all_games_for_bracket(bracket_id=bracket.id)
#     group_brackets = get_my_group_brackets_for_bracket(bracket_id=bracket.id)

#     for group_bracket in group_brackets:
#         db.session.delete(group_bracket)

#     for game in games:
#         db.session.delete(game)

#     db.session.delete(bracket)
#     db.session.commit()


##
## other queries
##


def update_standings(brackets=None, correct=None):
    brackets = brackets if brackets else get_all_brackets()
    correct = correct if correct else get_correct_bracket()

    if correct and correct.winner:
        for bracket in brackets:
            bracket.goal_difference = abs(
                bracket.winner_goals
                + bracket.loser_goals
                - (correct.winner_goals + correct.loser_goals)
            )

        brackets.sort(key=lambda x: x.goal_difference)

    brackets.sort(key=lambda b: b.points, reverse=True)

    rank = 1
    for i, bracket in enumerate(brackets):
        if i == 0:
            bracket.rank = rank
        elif bracket.points == brackets[i - 1].points:
            bracket.rank = rank
        else:
            rank = i + 1
            bracket.rank = rank

    db.session.commit()


def update_all_groups(brackets, correct):
    groups = group_queries.get_all_groups()
    groups_dict = {g.id: [] for g in groups}
    for b in brackets:
        for gb in b.group_brackets:
            groups_dict[gb.group_id].append((gb, b))

    for _, group_brackets in groups_dict.items():
        if correct and correct.winner:
            for _, bracket in group_brackets:
                bracket.goal_difference = abs(
                    bracket.winner_goals
                    + bracket.loser_goals
                    - (correct.winner_goals + correct.loser_goals)
                )

            group_brackets.sort(key=lambda tup: tup[1].goal_difference)

        group_brackets.sort(key=lambda tup: tup[1].points, reverse=True)

        rank = 1
        for i, [group_bracket, bracket] in enumerate(group_brackets):
            if i == 0:
                group_bracket.group_rank = rank
            elif bracket.points == group_brackets[i - 1][1].points:
                group_bracket.group_rank = rank
            else:
                rank = i + 1
                group_bracket.group_rank = rank

    db.session.commit()


def update_points():
    brackets = get_all_brackets_joined()
    correct = get_correct_bracket()

    for user_bracket in brackets:
        points_dict = bracket_utils.calculate_points_for_bracket(user_bracket, correct)

        user_bracket.r1 = points_dict.get("r1")
        user_bracket.r2 = points_dict.get("r2")
        user_bracket.r3 = points_dict.get("r3")
        user_bracket.r4 = points_dict.get("r4")
        user_bracket.points = points_dict.get("points")

        max_points = bracket_utils.calculate_max_points_for_bracket(
            user_bracket, correct
        )

        user_bracket.max_points = max_points

    db.session.commit()

    update_standings(brackets=brackets, correct=correct)

    update_all_groups(brackets=brackets, correct=correct)


def update_group_points():
    brackets = get_all_brackets_joined()
    correct = get_correct_bracket()
    update_all_groups(brackets=brackets, correct=correct)
