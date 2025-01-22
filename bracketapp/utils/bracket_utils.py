from bracketapp.queries import bracket_queries, user_queries
from bracketapp.config import CAN_EDIT_BRACKET, YEAR
from flask_login import current_user
from flask import url_for
import os.path


class BracketWinner:
    def __init__(self, winning_bracket, tie, total_correct_goals=0):
        self.winner = winning_bracket
        self.tie = tie
        self.total_correct_goals = total_correct_goals


def assign_image(bracket):
    if not bracket or not bracket.winner:
        return ""
    team = bracket_queries.get_team_by_bracket_team_id(id=bracket.winner)
    return team.icon_path


def get_winner(standings):
    if not standings:
        return

    correct = bracket_queries.get_correct_bracket()

    if not correct or not correct.winner:
        return None

    winners = [b for b in standings if b.rank == 1]

    if len(winners) == 0:
        return None

    if len(winners) == 1:
        return BracketWinner(winners, False)

    for w in winners:
        w.goal_difference = abs(
            w.w_goals + w.l_goals - (correct.w_goals + correct.l_goals)
        )

    winners.sort(key=lambda x: x.goal_difference)

    min_goal_diff = winners[0].goal_difference
    winners = [w for w in winners if w.goal_difference <= min_goal_diff]

    return BracketWinner(
        winners, True, total_correct_goals=correct.w_goals + correct.l_goals
    )


def get_standings_message(standings, winner=None, force=False):
    message = f'Welcome to this years bracket challenge! The tournament starts on Thursday, March 28 at 2:00PM ET.<br/>Make sure to <a href="{ url_for("editbracket_bp.edit_bracket") }">create your bracket</a> before then!<br/>To view or edit your bracket <a href="{ url_for("editbracket_bp.edit_bracket") }">click here</a>.'

    if force or not CAN_EDIT_BRACKET:
        winner = get_winner(standings=standings) if not winner else winner

        if winner:
            if not winner.tie and len(winner.winner) == 1:
                message = f'<h4>Congratulations to { winner.winner[0].user.username }</h4><a href="{ url_for("viewbracket_bp.view_bracket", id=winner.winner[0].id) }">{ winner.winner[0].name }</a>, { winner.winner[0].user.username } won this year\'s bracket challenge with <b>{ winner.winner[0].points }</b> points.'
            elif winner.tie and len(winner.winner) > 1:
                message = (
                    f"<h4>We have a tie between {len(winner.winner)} brackets</h4>"
                )
                message += f"<div>The following brackets have tied with {winner.winner[0].points} points after the tiebreak (total goals: {winner.total_correct_goals})</div>"
                for bracket in winner.winner:
                    message += f'<div><a href="{ url_for("viewbracket_bp.view_bracket", id=bracket.id) }">{ bracket.name }</a>, { bracket.user.username } tied this year\'s bracket challenge with { winner.winner[0].points } points and { bracket.w_goals + bracket.l_goals } total goals</div>'
            elif winner.tie and len(winner.winner) == 1:
                message = f'<h4>Congratulations to { winner.winner[0].user.username }</h4><a href="{ url_for("viewbracket_bp.view_bracket", id=winner.winner[0].id) }">{ winner.winner[0].name }</a>, { winner.winner[0].user.username } won this year\'s bracket challenge by the tiebreak with <b>{ winner.winner[0].points }</b> points and a goal differential of <b>{ abs((winner.winner[0].w_goals + winner.winner[0].l_goals) - (winner.total_correct_goals)) }</b>.'
        else:
            message = f"The tournament has started. See the current standings below."
            if current_user.is_authenticated:
                message += f' To view your bracket <a href="{ url_for("viewbracket_bp.view_bracket") }">click here</a>.'

    return message


def get_archive_message(standings):
    winner = get_winner(standings=standings)
    if not winner:
        message = "There are no brackets for this year. See the final bracket below."
    else:
        message = get_standings_message(standings=standings, winner=winner, force=True)

    return message


def get_bracket_standings():
    brackets = bracket_queries.get_all_brackets()
    correct = bracket_queries.get_correct_bracket()

    if correct and correct.winner:
        for bracket in brackets:
            bracket.goal_difference = abs(
                bracket.w_goals + bracket.l_goals - (correct.w_goals + correct.l_goals)
            )

        brackets.sort(key=lambda b: b.goal_difference)

    brackets.sort(key=lambda b: b.name.casefold())
    if brackets and brackets[0] and brackets[0].rank:
        brackets.sort(key=lambda b: b.max_points, reverse=True)
        brackets.sort(key=lambda b: b.rank)

    return brackets


def get_bracket_standings_for_year(year):
    brackets = bracket_queries.get_all_brackets_for_year(year=year)
    correct = bracket_queries.get_correct_bracket_for_year(year=year)

    for bracket in brackets:
        bracket.goal_difference = abs(
            bracket.w_goals + bracket.l_goals - (correct.w_goals + correct.l_goals)
        )

    brackets.sort(key=lambda b: b.goal_difference)

    brackets.sort(key=lambda b: b.name)
    brackets.sort(key=lambda b: b.max_points, reverse=True)
    brackets.sort(key=lambda b: b.rank)

    return brackets, correct


def calculate_points_for_bracket(bracket, correct):
    r1 = 0
    r2 = 0
    r3 = 0
    r4 = 0

    bracket_games = bracket.games()
    correct_games = correct.games()

    # round 1
    if bracket_games["game1"].winner == correct_games["game1"].winner:
        r1 += 10
    if bracket_games["game2"].winner == correct_games["game2"].winner:
        r1 += 10
    if bracket_games["game3"].winner == correct_games["game3"].winner:
        r1 += 10
    if bracket_games["game4"].winner == correct_games["game4"].winner:
        r1 += 10
    if bracket_games["game5"].winner == correct_games["game5"].winner:
        r1 += 10
    if bracket_games["game6"].winner == correct_games["game6"].winner:
        r1 += 10
    if bracket_games["game7"].winner == correct_games["game7"].winner:
        r1 += 10
    if bracket_games["game8"].winner == correct_games["game8"].winner:
        r1 += 10

    # round 2
    if bracket_games["game9"].winner == correct_games["game9"].winner:
        r2 += 20
    if bracket_games["game10"].winner == correct_games["game10"].winner:
        r2 += 20
    if bracket_games["game11"].winner == correct_games["game11"].winner:
        r2 += 20
    if bracket_games["game12"].winner == correct_games["game12"].winner:
        r2 += 20

    # round 3
    if bracket_games["game13"].winner == correct_games["game13"].winner:
        r3 += 40
    if bracket_games["game14"].winner == correct_games["game14"].winner:
        r3 += 40

    # winner
    if bracket_games["game15"].winner == correct_games["game15"].winner:
        r4 += 80

    points = r1 + r2 + r3 + r4
    points_dict = dict(r1=r1, r2=r2, r3=r3, r4=r4, points=points)

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
        correct_games["game1"].winner is None
        or bracket_games["game1"].winner == correct_games["game1"].winner
    ):
        max_points += 10
        game1 = True
    if (
        correct_games["game2"].winner is None
        or bracket_games["game2"].winner == correct_games["game2"].winner
    ):
        max_points += 10
        game2 = True
    if (
        correct_games["game3"].winner is None
        or bracket_games["game3"].winner == correct_games["game3"].winner
    ):
        max_points += 10
        game3 = True
    if (
        correct_games["game4"].winner is None
        or bracket_games["game4"].winner == correct_games["game4"].winner
    ):
        max_points += 10
        game4 = True
    if (
        correct_games["game5"].winner is None
        or bracket_games["game5"].winner == correct_games["game5"].winner
    ):
        max_points += 10
        game5 = True
    if (
        correct_games["game6"].winner is None
        or bracket_games["game6"].winner == correct_games["game6"].winner
    ):
        max_points += 10
        game6 = True
    if (
        correct_games["game7"].winner is None
        or bracket_games["game7"].winner == correct_games["game7"].winner
    ):
        max_points += 10
        game7 = True
    if (
        correct_games["game8"].winner is None
        or bracket_games["game8"].winner == correct_games["game8"].winner
    ):
        max_points += 10
        game8 = True

    # round 2
    game9 = False
    game10 = False
    game11 = False
    game12 = False

    if (bracket_games["game9"].winner == correct_games["game9"].winner) or (
        correct_games["game9"].winner is None
        and (
            (
                correct_games["game1"].winner is None
                and bracket_games["game9"].winner == bracket_games["game1"].winner
            )
            or (
                correct_games["game2"].winner is None
                and bracket_games["game9"].winner == bracket_games["game2"].winner
            )
            or (
                correct_games["game1"].winner is not None
                and correct_games["game1"].winner == bracket_games["game9"].winner
            )
            or (
                correct_games["game2"].winner is not None
                and correct_games["game2"].winner == bracket_games["game9"].winner
            )
        )
    ):
        max_points += 20
        game9 = True

    if (bracket_games["game10"].winner == correct_games["game10"].winner) or (
        correct_games["game10"].winner is None
        and (
            (
                correct_games["game3"].winner is None
                and bracket_games["game10"].winner == bracket_games["game3"].winner
            )
            or (
                correct_games["game4"].winner is None
                and bracket_games["game10"].winner == bracket_games["game4"].winner
            )
            or (
                correct_games["game3"].winner is not None
                and correct_games["game3"].winner == bracket_games["game10"].winner
            )
            or (
                correct_games["game4"].winner is not None
                and correct_games["game4"].winner == bracket_games["game10"].winner
            )
        )
    ):
        max_points += 20
        game10 = True

    if (bracket_games["game11"].winner == correct_games["game11"].winner) or (
        correct_games["game11"].winner is None
        and (
            (
                correct_games["game5"].winner is None
                and bracket_games["game11"].winner == bracket_games["game5"].winner
            )
            or (
                correct_games["game6"].winner is None
                and bracket_games["game11"].winner == bracket_games["game6"].winner
            )
            or (
                correct_games["game5"].winner is not None
                and correct_games["game5"].winner == bracket_games["game11"].winner
            )
            or (
                correct_games["game6"].winner is not None
                and correct_games["game6"].winner == bracket_games["game11"].winner
            )
        )
    ):
        max_points += 20
        game11 = True

    if (bracket_games["game12"].winner == correct_games["game12"].winner) or (
        correct_games["game12"].winner is None
        and (
            (
                correct_games["game7"].winner is None
                and bracket_games["game12"].winner == bracket_games["game7"].winner
            )
            or (
                correct_games["game8"].winner is None
                and bracket_games["game12"].winner == bracket_games["game8"].winner
            )
            or (
                correct_games["game7"].winner is not None
                and correct_games["game7"].winner == bracket_games["game12"].winner
            )
            or (
                correct_games["game8"].winner is not None
                and correct_games["game8"].winner == bracket_games["game12"].winner
            )
        )
    ):
        max_points += 20
        game12 = True

    # round 3
    game13 = False
    game14 = False

    if (bracket_games["game13"].winner == correct_games["game13"].winner) or (
        correct_games["game13"].winner is None
        and (
            game9
            and bracket_games["game9"].winner == bracket_games["game13"].winner
            or game10
            and bracket_games["game10"].winner == bracket_games["game13"].winner
        )
    ):
        max_points += 40
        game13 = True

    if (bracket_games["game14"].winner == correct_games["game14"].winner) or (
        correct_games["game14"].winner is None
        and (
            (
                game11
                and bracket_games["game11"].winner == bracket_games["game14"].winner
            )
            or (
                game12
                and bracket_games["game12"].winner == bracket_games["game14"].winner
            )
        )
    ):
        max_points += 40
        game14 = True

    # winner
    if (bracket_games["game15"].winner == correct_games["game15"].winner) or (
        correct_games["game15"].winner is None
        and (
            (
                game13
                and bracket_games["game13"].winner == bracket_games["game15"].winner
            )
            or (
                game14
                and bracket_games["game14"].winner == bracket_games["game15"].winner
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
