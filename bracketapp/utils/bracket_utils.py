from bracketapp.queries import bracket_queries, user_queries
from bracketapp.config import CAN_EDIT_BRACKET, YEAR
from flask_login import current_user
from flask import url_for
import os.path
import json


class EmptyBracket:
    def __init__(self):
        self.user_id = None
        self.name = ""
        self.w_goals = None
        self.l_goals = None
        self.winner = None

    def to_json(self):
        return json.dumps(dict())


class EmptyGame:
    def __init__(self, num):
        self.game_num = f"game{num}"
        self.winner = None


class BracketTeamInterface:
    def __init__(self, b_team_id, b_team=None):
        self.id = b_team_id
        self.b_team = (
            b_team
            if b_team is not None
            else bracket_queries.get_bracket_team(id=b_team_id)
        )
        self.team = bracket_queries.get_team_by_id(id=self.b_team.team_id)
        self.year = self.b_team.year
        self.rank = self.b_team.rank
        self.name = self.team.name
        self.icon_path = self.team.icon_path

    def to_dict(self):
        return dict(
            id=self.id,
            year=self.year,
            rank=self.rank,
            name=self.name,
            icon_path=self.icon_path,
        )

    def to_json(self):
        return json.dumps(self.to_dict())


class BracketInterface:
    def __init__(self, bracket_id, safe_only=True, year=None, bracket=None, games=None):
        if year:
            self.bracket = bracket_queries.get_user_bracket_for_bracket_id_and_year(
                bracket_id=bracket_id, year=year
            )
        else:
            self.bracket = (
                bracket
                if bracket
                else bracket_queries.get_bracket_for_bracket_id(bracket_id)
            )

        self.games = (
            games
            if games is not None
            else bracket_queries.get_all_user_games_for_bracket(bracket_id)
        )
        self.games.sort(key=lambda x: int(x.game_num[4:]))

        user = user_queries.get_user_by_id(id=self.bracket.user_id)
        try:
            self.username = user.username
            self.user_id = user.id
        except:
            pass

        self.safe_only = safe_only
        self.goal_difference = 0
        self.img_url = assign_image(self.bracket)

    def to_json(self):
        obj = self.bracket.to_dict(safe_only=self.safe_only)
        obj["username"] = self.username
        if not CAN_EDIT_BRACKET or self.bracket.year < YEAR:
            obj["url"] = url_for("viewbracket_bp.view_bracket", id=self.bracket.id)

        games = dict()
        for game in self.games:
            game_obj = dict(gameNum=game.game_num, winner=game.winner)
            games[game.game_num] = game_obj

        obj["games"] = games

        return json.dumps(obj)


class BaseCorrectBracketInterface:
    def __init__(self, year=None, bracket=None):
        if year:
            self.bracket = bracket_queries.get_correct_bracket_for_year(year)
        else:
            self.bracket = bracket if bracket else bracket_queries.get_correct_bracket()
        self.img_url = assign_image(self.bracket)


class CorrectBracketInterface:
    def __init__(self, year=None, bracket=None, games=None):
        if year:
            self.bracket = bracket_queries.get_correct_bracket_for_year(year)
        else:
            self.bracket = bracket if bracket else bracket_queries.get_correct_bracket()
        self.games = (
            games
            if games
            else bracket_queries.get_all_correct_games_for_correct_bracket(
                bracket_id=self.bracket.id
            )
        )
        self.games.sort(key=lambda x: int(x.game_num[4:]))
        self.img_url = assign_image(self.bracket)

    def to_json(self):
        obj = dict(
            id=self.bracket.id,
            rank="-",
            name=f"{self.bracket.year} final bracket",
            username="NB Bracket App",
            points=320,
            r1=80,
            r2=80,
            r3=80,
            r4=80,
            maxPoints=320,
            winner=self.bracket.winner,
            wGoals=self.bracket.w_goals,
            lGoals=self.bracket.l_goals,
            url=url_for("viewbracket_bp.view_cbracket", year=self.bracket.year),
        )

        games = dict()
        for game in self.games:
            game_object = dict(
                gameNum=game.game_num,
                winner=game.winner,
                loser=game.loser,
                hGoals=game.h_goals,
                aGoals=game.a_goals,
            )
            games[game.game_num] = game_object

        obj["games"] = games

        return json.dumps(obj)


class DefaultBracketInterface:
    def __init__(self, year=None, bracket=None, games=None):
        if year:
            self.bracket = bracket_queries.get_default_bracket_for_year(year)
        else:
            self.bracket = bracket if bracket else bracket_queries.get_default_bracket()
        self.games = (
            games
            if games
            else bracket_queries.get_all_default_games_for_default_bracket(
                bracket_id=self.bracket.id
            )
        )
        self.games.sort(key=lambda x: int(x.game_num[4:]))
        self.teams = dict()
        for b_team in bracket_queries.get_all_bracket_teams_for_year(self.bracket.year):
            self.teams[b_team.id] = BracketTeamInterface(
                b_team_id=b_team.id, b_team=b_team
            ).to_dict()

    def to_json(self):
        obj = dict(id=self.bracket.id, year=self.bracket.year)

        games = dict()
        for game in self.games:
            game_obj = dict(gameNum=game.game_num, home=game.home, away=game.away)
            games[game.game_num] = game_obj

        obj["games"] = games

        obj["teams"] = self.teams

        return json.dumps(obj)


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


def create_empty_bracket():
    games = [EmptyGame(i) for i in range(15)]
    return BracketInterface(bracket_id=None, bracket=EmptyBracket(), games=games)


def get_winner(standings):
    if not standings:
        return

    correct = bracket_queries.get_correct_bracket()

    if not correct or not correct.winner:
        return None

    winners = [b for b in standings if b.bracket.rank == 1]

    if len(winners) == 0:
        return None

    if len(winners) == 1:
        return BracketWinner(winners, False)

    for w in winners:
        w.goal_difference = abs(
            w.bracket.w_goals + w.bracket.l_goals - (correct.w_goals + correct.l_goals)
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
                message = f'<h4>Congratulations to { winner.winner[0].username }</h4><a href="{ url_for("viewbracket_bp.view_bracket", id=winner.winner[0].bracket.id) }">{ winner.winner[0].bracket.name }</a>, { winner.winner[0].username } won this year\'s bracket challenge with <b>{ winner.winner[0].bracket.points }</b> points.'
            elif winner.tie and len(winner.winner) > 1:
                message = (
                    f"<h4>We have a tie between {len(winner.winner)} brackets</h4>"
                )
                message += f"<div>The following brackets have tied with {winner.winner[0].bracket.points} points after the tiebreak (total goals: {winner.total_correct_goals})</div>"
                for bracket in winner.winner:
                    message += f'<div><a href="{ url_for("viewbracket_bp.view_bracket", id=bracket.bracket.id) }">{ bracket.bracket.name }</a>, { bracket.username } tied this year\'s bracket challenge with { winner.winner[0].bracket.points } points and { bracket.bracket.w_goals + bracket.bracket.l_goals } total goals</div>'
            elif winner.tie and len(winner.winner) == 1:
                message = f'<h4>Congratulations to { winner.winner[0].username }</h4><a href="{ url_for("viewbracket_bp.view_bracket", id=winner.winner[0].bracket.id) }">{ winner.winner[0].bracket.name }</a>, { winner.winner[0].username } won this year\'s bracket challenge by the tiebreak with <b>{ winner.winner[0].bracket.points }</b> points and a goal differential of <b>{ abs((winner.winner[0].bracket.w_goals + winner.winner[0].bracket.l_goals) - (winner.total_correct_goals)) }</b>.'
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
    brackets = [
        BracketInterface(
            bracket_id=b.id, safe_only=CAN_EDIT_BRACKET, bracket=b, games=[]
        )
        for b in bracket_queries.get_all_brackets()
    ]
    correct = bracket_queries.get_correct_bracket()

    if correct and correct.winner:
        for bracket in brackets:
            bracket.goal_difference = abs(
                bracket.bracket.w_goals
                + bracket.bracket.l_goals
                - (correct.w_goals + correct.l_goals)
            )

        brackets.sort(key=lambda x: x.goal_difference)

    brackets.sort(key=lambda b: b.bracket.name)
    if brackets and brackets[0] and brackets[0].bracket.rank:
        brackets.sort(key=lambda b: b.bracket.max_points, reverse=True)
        brackets.sort(key=lambda b: b.bracket.rank)

    return brackets


def get_bracket_standings_for_year(year):
    brackets = bracket_queries.get_all_user_brackets_for_year(year=year)
    correct = bracket_queries.get_correct_bracket_for_year(year=year)

    for bracket in brackets:
        bracket.goal_difference = abs(
            bracket.bracket.w_goals
            + bracket.bracket.l_goals
            - (correct.w_goals + correct.l_goals)
        )

        brackets.sort(key=lambda x: x.goal_difference)

    brackets.sort(key=lambda b: b.bracket.name)
    brackets.sort(key=lambda b: b.bracket.max_points, reverse=True)
    brackets.sort(key=lambda b: b.bracket.rank)

    return brackets, CorrectBracketInterface(bracket=correct)


def calculate_points_for_bracket(bracket, correct, teams):
    r1 = 0
    r2 = 0
    r3 = 0
    r4 = 0

    # round 1
    if bracket.games[0].winner == correct.games[0].winner:
        r1 += 10
    if bracket.games[1].winner == correct.games[1].winner:
        r1 += 10
    if bracket.games[2].winner == correct.games[2].winner:
        r1 += 10
    if bracket.games[3].winner == correct.games[3].winner:
        r1 += 10
    if bracket.games[4].winner == correct.games[4].winner:
        r1 += 10
    if bracket.games[5].winner == correct.games[5].winner:
        r1 += 10
    if bracket.games[6].winner == correct.games[6].winner:
        r1 += 10
    if bracket.games[7].winner == correct.games[7].winner:
        r1 += 10

    # round 2
    if bracket.games[8].winner == correct.games[8].winner:
        r2 += 20
    if bracket.games[9].winner == correct.games[9].winner:
        r2 += 20
    if bracket.games[10].winner == correct.games[10].winner:
        r2 += 20
    if bracket.games[11].winner == correct.games[11].winner:
        r2 += 20

    # round 3
    if bracket.games[12].winner == correct.games[12].winner:
        r3 += 40
    if bracket.games[13].winner == correct.games[13].winner:
        r3 += 40

    # winner
    if bracket.games[14].winner == correct.games[14].winner:
        r4 += 80

    points = r1 + r2 + r3 + r4
    points_dict = dict(r1=r1, r2=r2, r3=r3, r4=r4, points=points)

    return points_dict


def calculate_max_points_for_bracket(bracket, correct, teams):
    max_points = 0

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
        correct.games[0].winner not in teams
        or bracket.games[0].winner == correct.games[0].winner
    ):
        max_points += 10
        game1 = True
    if (
        correct.games[1].winner not in teams
        or bracket.games[1].winner == correct.games[1].winner
    ):
        max_points += 10
        game2 = True
    if (
        correct.games[2].winner not in teams
        or bracket.games[2].winner == correct.games[2].winner
    ):
        max_points += 10
        game3 = True
    if (
        correct.games[3].winner not in teams
        or bracket.games[3].winner == correct.games[3].winner
    ):
        max_points += 10
        game4 = True
    if (
        correct.games[4].winner not in teams
        or bracket.games[4].winner == correct.games[4].winner
    ):
        max_points += 10
        game5 = True
    if (
        correct.games[5].winner not in teams
        or bracket.games[5].winner == correct.games[5].winner
    ):
        max_points += 10
        game6 = True
    if (
        correct.games[6].winner not in teams
        or bracket.games[6].winner == correct.games[6].winner
    ):
        max_points += 10
        game7 = True
    if (
        correct.games[7].winner not in teams
        or bracket.games[7].winner == correct.games[7].winner
    ):
        max_points += 10
        game8 = True

    # round 2
    game9 = False
    game10 = False
    game11 = False
    game12 = False

    if (bracket.games[8].winner == correct.games[8].winner) or (
        correct.games[8].winner not in teams
        and (
            (
                correct.games[0].winner not in teams
                and bracket.games[8].winner == bracket.games[0].winner
            )
            or (
                correct.games[1].winner not in teams
                and bracket.games[8].winner == bracket.games[1].winner
            )
            or (
                correct.games[0].winner in teams
                and correct.games[0].winner == bracket.games[8].winner
            )
            or (
                correct.games[1].winner in teams
                and correct.games[1].winner == bracket.games[8].winner
            )
        )
    ):
        max_points += 20
        game9 = True

    if (bracket.games[9].winner == correct.games[9].winner) or (
        correct.games[9].winner not in teams
        and (
            (
                correct.games[2].winner not in teams
                and bracket.games[9].winner == bracket.games[2].winner
            )
            or (
                correct.games[3].winner not in teams
                and bracket.games[9].winner == bracket.games[3].winner
            )
            or (
                correct.games[2].winner in teams
                and correct.games[2].winner == bracket.games[9].winner
            )
            or (
                correct.games[3].winner in teams
                and correct.games[3].winner == bracket.games[9].winner
            )
        )
    ):
        max_points += 20
        game10 = True

    if (bracket.games[10].winner == correct.games[10].winner) or (
        correct.games[10].winner not in teams
        and (
            (
                correct.games[4].winner not in teams
                and bracket.games[10].winner == bracket.games[4].winner
            )
            or (
                correct.games[5].winner not in teams
                and bracket.games[10].winner == bracket.games[5].winner
            )
            or (
                correct.games[4].winner in teams
                and correct.games[4].winner == bracket.games[10].winner
            )
            or (
                correct.games[5].winner in teams
                and correct.games[5].winner == bracket.games[10].winner
            )
        )
    ):
        max_points += 20
        game11 = True

    if (bracket.games[11].winner == correct.games[11].winner) or (
        correct.games[11].winner not in teams
        and (
            (
                correct.games[6].winner not in teams
                and bracket.games[11].winner == bracket.games[6].winner
            )
            or (
                correct.games[7].winner not in teams
                and bracket.games[11].winner == bracket.games[7].winner
            )
            or (
                correct.games[6].winner in teams
                and correct.games[6].winner == bracket.games[11].winner
            )
            or (
                correct.games[7].winner in teams
                and correct.games[7].winner == bracket.games[11].winner
            )
        )
    ):
        max_points += 20
        game12 = True

    # round 3
    game13 = False
    game14 = False

    if (bracket.games[12].winner == correct.games[12].winner) or (
        correct.games[12].winner not in teams
        and (
            game9
            and bracket.games[8].winner == bracket.games[12].winner
            or game10
            and bracket.games[9].winner == bracket.games[12].winner
        )
    ):
        max_points += 40
        game13 = True

    if (bracket.games[13].winner == correct.games[13].winner) or (
        correct.games[13].winner not in teams
        and (
            (game11 and bracket.games[10].winner == bracket.games[13].winner)
            or (game12 and bracket.games[11].winner == bracket.games[13].winner)
        )
    ):
        max_points += 40
        game14 = True

    # winner
    if (bracket.games[14].winner == correct.games[14].winner) or (
        correct.games[14].winner not in teams
        and (
            (game13 and bracket.games[12].winner == bracket.games[14].winner)
            or (game14 and bracket.games[13].winner == bracket.games[14].winner)
        )
    ):
        max_points += 80

    return max_points


def should_game_exist(team_name, game_num, correct, default):
    ret = False

    if game_num == "game1":
        ret = team_name == default.games[0].home or team_name == default.games[0].away

    elif game_num == "game2":
        ret = team_name == default.games[1].home or team_name == default.games[1].away

    elif game_num == "game3":
        ret = team_name == default.games[2].home or team_name == default.games[2].away

    elif game_num == "game4":
        ret = team_name == default.games[3].home or team_name == default.games[3].away

    elif game_num == "game5":
        ret = team_name == default.games[4].home or team_name == default.games[4].away

    elif game_num == "game6":
        ret = team_name == default.games[5].home or team_name == default.games[5].away

    elif game_num == "game7":
        ret = team_name == default.games[6].home or team_name == default.games[6].away

    elif game_num == "game8":
        ret = team_name == default.games[7].home or team_name == default.games[7].away

    elif game_num == "game9":
        ret = (
            team_name == correct.games[0].winner or team_name == correct.games[1].winner
        )

    elif game_num == "game10":
        ret = (
            team_name == correct.games[2].winner or team_name == correct.games[3].winner
        )

    elif game_num == "game11":
        ret = (
            team_name == correct.games[4].winner or team_name == correct.games[5].winner
        )

    elif game_num == "game12":
        ret = (
            team_name == correct.games[6].winner or team_name == correct.games[7].winner
        )

    elif game_num == "game13":
        ret = (
            team_name == correct.games[8].winner or team_name == correct.games[9].winner
        )

    elif game_num == "game14":
        ret = (
            team_name == correct.games[10].winner
            or team_name == correct.games[11].winner
        )

    elif game_num == "game15":
        ret = (
            team_name == correct.games[12].winner
            or team_name == correct.games[13].winner
        )

    return ret


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
