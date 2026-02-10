from bracketapp.queries import bracket_queries, correct_bracket_queries, group_queries
from bracketapp.config import CAN_EDIT_BRACKET, YEAR
from flask_login import current_user
from flask import url_for
import os.path
from bracketapp.utils import cache_invalidator


class BracketWinner:
    def __init__(self, winning_bracket, tie, total_correct_goals=0):
        self.winner = winning_bracket
        self.tie = tie
        self.total_correct_goals = total_correct_goals


def get_winner(standings):
    if not standings:
        return

    correct = correct_bracket_queries.get_correct_bracket()

    if not correct or not correct.winner_id:
        return None

    winners = [b for b in standings if b.rank == 1]

    if len(winners) == 0:
        return None

    if len(winners) == 1:
        return BracketWinner(winners, False)

    for w in winners:
        w.goal_difference = abs(
            w.winner_goals
            + w.loser_goals
            - (correct.winner_goals + correct.loser_goals)
        )

    winners.sort(key=lambda x: x.goal_difference)

    min_goal_diff = winners[0].goal_difference
    winners = [w for w in winners if w.goal_difference <= min_goal_diff]

    return BracketWinner(
        winners, True, total_correct_goals=correct.winner_goals + correct.loser_goals
    )


def get_standings_message(standings, winner=None, force=False):
    if force or not CAN_EDIT_BRACKET:
        winner = get_winner(standings=standings) if not winner else winner

        if winner:
            # Post tournament message
            if not winner.tie and len(winner.winner) == 1:
                message = f'<h4>Congratulations to {winner.winner[0].user.username}</h4><a href="{url_for("viewbracket_bp.view_bracket", id=winner.winner[0].id)}">{winner.winner[0].name}</a>, {winner.winner[0].user.username} won this year\'s bracket challenge with <b>{winner.winner[0].points}</b> points.'
            elif winner.tie and len(winner.winner) > 1:
                message = (
                    f"<h4>We have a tie between {len(winner.winner)} brackets</h4>"
                )
                message += f"<div>The following brackets have tied with {winner.winner[0].points} points after the tiebreak (total goals: {winner.total_correct_goals})</div>"
                for bracket in winner.winner:
                    message += f'<div><a href="{url_for("viewbracket_bp.view_bracket", id=bracket.id)}">{bracket.name}</a>, {bracket.user.username} tied this year\'s bracket challenge with {winner.winner[0].points} points and {bracket.winner_goals + bracket.loser_goals} total goals</div>'
            elif winner.tie and len(winner.winner) == 1:
                message = f'<h4>Congratulations to {winner.winner[0].user.username}</h4><a href="{url_for("viewbracket_bp.view_bracket", id=winner.winner[0].id)}">{winner.winner[0].name}</a>, {winner.winner[0].user.username} won this year\'s bracket challenge by the tiebreak with <b>{winner.winner[0].points}</b> points and a goal differential of <b>{abs((winner.winner[0].winner_goals + winner.winner[0].loser_goals) - (winner.total_correct_goals))}</b>.'
        else:
            # Active tournament message
            message = "The tournament has started. See the current standings below."
            if current_user.is_authenticated:
                message += f' To view your brackets <a href="{url_for("mybrackets_bp.my_brackets")}">click here</a>.'

    else:
        # Pre tournament message
        start_date_time = "Thursday, March 28 at 2:00PM ET"
        create_bracket_message = ""
        if current_user.is_authenticated:
            if bracket_queries.my_bracket_count() < 5:
                create_bracket_message += f'Make sure to <a href="{url_for("editbracket_bp.edit_bracket")}">create your bracket</a> before the tournament starts!<br/>'

            create_bracket_message += f'To view or edit your brackets <a href="{url_for("mybrackets_bp.my_brackets")}">click here</a>.'
        else:
            create_bracket_message = f'<a href="{url_for("auth_bp.login")}">Login</a> or <a href="{url_for("auth_bp.signup")}">signup</a> to create your bracket now!'

        message = f"Welcome to this years bracket challenge! The tournament starts on {start_date_time}.<br/>{create_bracket_message}"

    return message


def get_archive_message(standings):
    winner = get_winner(standings=standings)
    if not winner:
        message = "There are no brackets for this year. See the final bracket below."
    else:
        message = get_standings_message(standings=standings, winner=winner, force=True)

    return message


def get_group_message(brackets, group_id, is_member, is_private):
    message = ""
    if CAN_EDIT_BRACKET:
        # Pre tournament message
        start_date_time = "Thursday, March 28 at 2:00PM ET"
        create_bracket_message = ""
        if current_user.is_authenticated:
            if bracket_queries.my_bracket_count() < 5:
                create_bracket_message += f'Make sure to <a href="{url_for("editbracket_bp.new_bracket", group_id=group_id)}">create your bracket</a> before the tournament starts!<br/>'

            create_bracket_message += f'To view or edit your brackets <a href="{url_for("mybrackets_bp.my_brackets")}">click here</a>.'
        else:
            create_bracket_message = f'<a href="{url_for("auth_bp.login")}">Login</a> or <a href="{url_for("auth_bp.signup")}">signup</a> to create your bracket now!'

        message = f"Welcome to this years bracket challenge! The tournament starts on {start_date_time}.<br/>{create_bracket_message}"
    else:
        pass

    return message


def get_group_winners(standings, correct):
    if not standings:
        return []

    if not correct or not correct.winner_id:
        return []

    winners = [b for b in standings if b.group_bracket.group_rank == 1]

    if (w_len := len(winners)) == 1:
        return winners
    elif w_len == 0:
        return []

    winners.sort(key=lambda x: x.goal_difference)

    min_goal_diff = winners[0].goal_difference
    winners = [w for w in winners if w.goal_difference <= min_goal_diff]

    return winners


def get_group_standings(group_id, year):
    brackets = bracket_queries.get_brackets_for_group(group_id=group_id)
    correct = correct_bracket_queries.get_correct_bracket(year=year)

    winners = get_group_winners(standings=brackets, correct=correct)

    return brackets, winners, correct


def get_winners(standings, correct):
    if not standings:
        return []

    if not correct or not correct.winner_id:
        return []

    winners = [b for b in standings if b.rank == 1]

    if w_len := len(winners) == 1:
        return winners
    elif w_len == 0:
        return []

    winners.sort(key=lambda x: x.goal_difference)

    min_goal_diff = winners[0].goal_difference
    winners = [w for w in winners if w.goal_difference <= min_goal_diff]

    return winners


def get_bracket_standings(year=YEAR):
    brackets = bracket_queries.get_all_brackets(year)
    correct = correct_bracket_queries.get_correct_bracket(year)

    winners = get_winners(standings=brackets, correct=correct)

    return brackets, winners, correct


def update_all_brackets_points():
    brackets = bracket_queries.get_all_brackets_joined()
    correct = correct_bracket_queries.get_correct_bracket()

    if correct.winner_id:
        cache_invalidator.archive()

    brackets_update_list = []
    for user_bracket in brackets:
        bracket_update_dict = user_bracket.to_dict(
            only=(
                "winner_goals",
                "loser_goals",
            )
        )
        bracket_update_dict["id"] = user_bracket.id

        points_dict = calculate_points_for_bracket(user_bracket, correct)
        bracket_update_dict |= points_dict

        max_points = calculate_max_points_for_bracket(user_bracket, correct)
        bracket_update_dict["max_points"] = max_points

        brackets_update_list.append(bracket_update_dict)

    brackets_update_list = update_standings(brackets_update_list, correct)

    group_brackets_update_list = update_all_group_standings(
        brackets_update_list, correct
    )

    bracket_queries.bulk_update_bracket_points(brackets_update_list)
    bracket_queries.bulk_update_group_ranks(group_brackets_update_list)

    cache_invalidator.update_points(
        [b.id for b in brackets],
        list(set(gb["group_id"] for gb in group_brackets_update_list)),
    )

    # update_all_groups(brackets=brackets, correct=correct)


def update_standings(brackets_update_list, correct):
    if correct.winner_id:
        for bracket in brackets_update_list:
            bracket["goal_difference"] = abs(
                bracket["winner_goals"]
                + bracket["loser_goals"]
                - (correct.winner_goals + correct.loser_goals)
            )

        brackets_update_list.sort(key=lambda b: b["goal_difference"])

    brackets_update_list.sort(key=lambda b: b["points"], reverse=True)

    rank = 1
    for i, bracket in enumerate(brackets_update_list):
        if i == 0:
            bracket["rank"] = rank
        elif bracket["points"] == brackets_update_list[i - 1]["points"]:
            bracket["rank"] = rank
        else:
            rank = i + 1
            bracket["rank"] = rank

    return brackets_update_list


def update_all_group_standings(brackets_update_list, correct):
    groups = group_queries.get_all_groups()
    groups_dict = {g.id: [] for g in groups}

    brackets_dict = {b["id"]: b for b in brackets_update_list}
    group_brackets = bracket_queries.get_all_group_brackets()

    for gb in group_brackets:
        gb_dict = {"id": gb.id, "group_id": gb.group_id}
        groups_dict[gb.group_id].append((gb_dict, brackets_dict[gb.bracket_id]))

    for gbs in groups_dict.values():
        if correct.winner_id:
            gbs.sort(key=lambda tup: tup[1]["goal_difference"])

        gbs.sort(key=lambda tup: tup[1]["points"], reverse=True)

        rank = 1
        for i, [group_bracket, bracket] in enumerate(gbs):
            if i == 0:
                group_bracket["group_rank"] = rank
            elif bracket["points"] == gbs[i - 1][1]["points"]:
                group_bracket["group_rank"] = rank
            else:
                rank = i + 1
                group_bracket["group_rank"] = rank

    group_brackets_update_list = []
    for gbs in groups_dict.values():
        for [gb, _] in gbs:
            group_brackets_update_list.append(gb)

    return group_brackets_update_list


def calculate_points_for_bracket(bracket, correct):
    r1 = 0
    r2 = 0
    r3 = 0
    r4 = 0

    bracket_games = bracket.games()
    correct_games = correct.games()

    # round 1
    if bracket_games["game1"].winner_id == correct_games["game1"].winner_id:
        r1 += 10
    if bracket_games["game2"].winner_id == correct_games["game2"].winner_id:
        r1 += 10
    if bracket_games["game3"].winner_id == correct_games["game3"].winner_id:
        r1 += 10
    if bracket_games["game4"].winner_id == correct_games["game4"].winner_id:
        r1 += 10
    if bracket_games["game5"].winner_id == correct_games["game5"].winner_id:
        r1 += 10
    if bracket_games["game6"].winner_id == correct_games["game6"].winner_id:
        r1 += 10
    if bracket_games["game7"].winner_id == correct_games["game7"].winner_id:
        r1 += 10
    if bracket_games["game8"].winner_id == correct_games["game8"].winner_id:
        r1 += 10

    # round 2
    if bracket_games["game9"].winner_id == correct_games["game9"].winner_id:
        r2 += 20
    if bracket_games["game10"].winner_id == correct_games["game10"].winner_id:
        r2 += 20
    if bracket_games["game11"].winner_id == correct_games["game11"].winner_id:
        r2 += 20
    if bracket_games["game12"].winner_id == correct_games["game12"].winner_id:
        r2 += 20

    # round 3
    if bracket_games["game13"].winner_id == correct_games["game13"].winner_id:
        r3 += 40
    if bracket_games["game14"].winner_id == correct_games["game14"].winner_id:
        r3 += 40

    # winner
    if bracket_games["game15"].winner_id == correct_games["game15"].winner_id:
        r4 += 80

    points = r1 + r2 + r3 + r4
    points_dict = dict(
        round_one_points=r1,
        round_two_points=r2,
        round_three_points=r3,
        round_four_points=r4,
        points=points,
    )

    return points_dict


def calculate_max_points_for_bracket(bracket, correct):
    max_points = 0

    bracket_games = bracket.games()
    correct_games = correct.games()

    # round 1
    game1 = False
    game2 = False
    game3 = False
    game4 = False
    game5 = False
    game6 = False
    game7 = False
    game8 = False
    if (
        correct_games["game1"].winner_id is None
        or bracket_games["game1"].winner_id == correct_games["game1"].winner_id
    ):
        max_points += 10
        game1 = True
    if (
        correct_games["game2"].winner_id is None
        or bracket_games["game2"].winner_id == correct_games["game2"].winner_id
    ):
        max_points += 10
        game2 = True
    if (
        correct_games["game3"].winner_id is None
        or bracket_games["game3"].winner_id == correct_games["game3"].winner_id
    ):
        max_points += 10
        game3 = True
    if (
        correct_games["game4"].winner_id is None
        or bracket_games["game4"].winner_id == correct_games["game4"].winner_id
    ):
        max_points += 10
        game4 = True
    if (
        correct_games["game5"].winner_id is None
        or bracket_games["game5"].winner_id == correct_games["game5"].winner_id
    ):
        max_points += 10
        game5 = True
    if (
        correct_games["game6"].winner_id is None
        or bracket_games["game6"].winner_id == correct_games["game6"].winner_id
    ):
        max_points += 10
        game6 = True
    if (
        correct_games["game7"].winner_id is None
        or bracket_games["game7"].winner_id == correct_games["game7"].winner_id
    ):
        max_points += 10
        game7 = True
    if (
        correct_games["game8"].winner_id is None
        or bracket_games["game8"].winner_id == correct_games["game8"].winner_id
    ):
        max_points += 10
        game8 = True

    # round 2
    game9 = False
    game10 = False
    game11 = False
    game12 = False

    if (bracket_games["game9"].winner_id == correct_games["game9"].winner_id) or (
        correct_games["game9"].winner_id is None
        and (
            (
                correct_games["game1"].winner_id is None
                and bracket_games["game9"].winner_id == bracket_games["game1"].winner_id
            )
            or (
                correct_games["game2"].winner_id is None
                and bracket_games["game9"].winner_id == bracket_games["game2"].winner_id
            )
            or (
                correct_games["game1"].winner_id is not None
                and correct_games["game1"].winner_id == bracket_games["game9"].winner_id
            )
            or (
                correct_games["game2"].winner_id is not None
                and correct_games["game2"].winner_id == bracket_games["game9"].winner_id
            )
        )
    ):
        max_points += 20
        game9 = True

    if (bracket_games["game10"].winner_id == correct_games["game10"].winner_id) or (
        correct_games["game10"].winner_id is None
        and (
            (
                correct_games["game3"].winner_id is None
                and bracket_games["game10"].winner_id
                == bracket_games["game3"].winner_id
            )
            or (
                correct_games["game4"].winner_id is None
                and bracket_games["game10"].winner_id
                == bracket_games["game4"].winner_id
            )
            or (
                correct_games["game3"].winner_id is not None
                and correct_games["game3"].winner_id
                == bracket_games["game10"].winner_id
            )
            or (
                correct_games["game4"].winner_id is not None
                and correct_games["game4"].winner_id
                == bracket_games["game10"].winner_id
            )
        )
    ):
        max_points += 20
        game10 = True

    if (bracket_games["game11"].winner_id == correct_games["game11"].winner_id) or (
        correct_games["game11"].winner_id is None
        and (
            (
                correct_games["game5"].winner_id is None
                and bracket_games["game11"].winner_id
                == bracket_games["game5"].winner_id
            )
            or (
                correct_games["game6"].winner_id is None
                and bracket_games["game11"].winner_id
                == bracket_games["game6"].winner_id
            )
            or (
                correct_games["game5"].winner_id is not None
                and correct_games["game5"].winner_id
                == bracket_games["game11"].winner_id
            )
            or (
                correct_games["game6"].winner_id is not None
                and correct_games["game6"].winner_id
                == bracket_games["game11"].winner_id
            )
        )
    ):
        max_points += 20
        game11 = True

    if (bracket_games["game12"].winner_id == correct_games["game12"].winner_id) or (
        correct_games["game12"].winner_id is None
        and (
            (
                correct_games["game7"].winner_id is None
                and bracket_games["game12"].winner_id
                == bracket_games["game7"].winner_id
            )
            or (
                correct_games["game8"].winner_id is None
                and bracket_games["game12"].winner_id
                == bracket_games["game8"].winner_id
            )
            or (
                correct_games["game7"].winner_id is not None
                and correct_games["game7"].winner_id
                == bracket_games["game12"].winner_id
            )
            or (
                correct_games["game8"].winner_id is not None
                and correct_games["game8"].winner_id
                == bracket_games["game12"].winner_id
            )
        )
    ):
        max_points += 20
        game12 = True

    # round 3
    game13 = False
    game14 = False

    if (bracket_games["game13"].winner_id == correct_games["game13"].winner_id) or (
        correct_games["game13"].winner_id is None
        and (
            game9
            and bracket_games["game9"].winner_id == bracket_games["game13"].winner_id
            or game10
            and bracket_games["game10"].winner_id == bracket_games["game13"].winner_id
        )
    ):
        max_points += 40
        game13 = True

    if (bracket_games["game14"].winner_id == correct_games["game14"].winner_id) or (
        correct_games["game14"].winner_id is None
        and (
            (
                game11
                and bracket_games["game11"].winner_id
                == bracket_games["game14"].winner_id
            )
            or (
                game12
                and bracket_games["game12"].winner_id
                == bracket_games["game14"].winner_id
            )
        )
    ):
        max_points += 40
        game14 = True

    # winner
    if (bracket_games["game15"].winner_id == correct_games["game15"].winner_id) or (
        correct_games["game15"].winner_id is None
        and (
            (
                game13
                and bracket_games["game13"].winner_id
                == bracket_games["game15"].winner_id
            )
            or (
                game14
                and bracket_games["game14"].winner_id
                == bracket_games["game15"].winner_id
            )
        )
    ):
        max_points += 80

    return max_points


def does_team_image_exist(name):
    name = name.replace(" ", "").replace(".", "")
    path = os.path.dirname(os.path.abspath(__file__))[:-5]
    # print(name, f"{path}/static/images/{name}.svg")
    # print(os.path.isfile(f"{path}/static/images/{name}.svg"))
    return os.path.isfile(f"{path}/static/images/{name}.svg")


# this is for checking the image urls are correct
def check_img_urls(default_brackets):
    path = os.path.dirname(os.path.abspath(__file__))[:-4]
    for game in default_brackets.games:
        url_list = game.home.split(" ")
        url = "".join(url_list[1:]).replace(".", "")
        # print(url)
        # print(os.path.isfile(f"{path}/static/images/{url}.svg"))
