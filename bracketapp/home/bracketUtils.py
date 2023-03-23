from bracketapp.home import queries
import os.path


class emptyBracket:
    def __init__(self):
        self.user_id = None
        self.name = ""
        self.w_goals = None
        self.l_goals = None
        self.winner = None


class emptyGame:
    def __init__(self, num):
        self.game_num = f"game{num}"
        self.winner = None


class userBracket:
    def __init__(self, bracket_id, year=None, bracket=None, games=None):
        if year:
            self.bracket = queries.getUserBracketForBracketIdAndYear(
                bracket_id=bracket_id, year=year
            )
        else:
            self.bracket = (
                bracket if bracket else queries.getUserBracketForBracketId(bracket_id)
            )
        self.games = games if games else queries.getAllUserGamesForBracket(bracket_id)
        self.games.sort(key=lambda x: int(x.game_num[4:]))
        user = queries.getUser(id=self.bracket.user_id)
        try:
            self.username = user.username
            self.user_id = user.id
        except:
            pass
        self.goal_difference = 0
        self.img_url = assignImage(self.bracket)

    def tojson(self):
        object = dict()
        object["id"] = self.bracket.id
        object["name"] = self.bracket.name
        object["points"] = self.bracket.points
        object["max_points"] = self.bracket.max_points
        object["rank"] = self.bracket.rank
        object["winner"] = self.bracket.winner
        object["w_goals"] = self.bracket.w_goals
        object["l_goals"] = self.bracket.l_goals
        object["games"] = dict()

        for game in self.games:
            game_object = dict()
            game_object["game_num"] = game.game_num
            game_object["winner"] = game.winner

            object["games"][game.game_num] = game_object

        return object


class baseCorrectBracket:
    def __init__(self, year=None, bracket=None):
        if year:
            self.bracket = queries.getCorrectBracketForYear(year)
        else:
            self.bracket = bracket if bracket else queries.getCorrectBracket()
        self.img_url = assignImage(self.bracket)


class fullCorrectBracket:
    def __init__(self, year=None, bracket=None, games=None):
        if year:
            self.bracket = queries.getCorrectBracketForYear(year)
        else:
            self.bracket = bracket if bracket else queries.getCorrectBracket()
        self.games = (
            games
            if games
            else queries.getAllCorrectGamesForCorrectBracket(bracket_id=self.bracket.id)
        )
        self.games.sort(key=lambda x: int(x.game_num[4:]))
        self.img_url = assignImage(self.bracket)

    def tojson(self):
        object = dict()
        object["id"] = self.bracket.id
        object["winner"] = self.bracket.winner
        object["w_goals"] = self.bracket.w_goals
        object["l_goals"] = self.bracket.l_goals
        object["games"] = dict()

        for game in self.games:
            game_object = dict()
            game_object["game_num"] = game.game_num
            game_object["winner"] = game.winner
            game_object["loser"] = game.loser
            game_object["h_goals"] = game.h_goals
            game_object["a_goals"] = game.a_goals

            object["games"][game.game_num] = game_object

        return object


class fullDefaultBracket:
    def __init__(self, year=None, bracket=None, games=None):
        if year:
            self.bracket = queries.getDefaultBracketForYear(year)
        else:
            self.bracket = bracket if bracket else queries.getDefaultBracket()
        self.games = (
            games
            if games
            else queries.getAllDefaultGamesForDefaultBracket(bracket_id=self.bracket.id)
        )
        self.games.sort(key=lambda x: int(x.game_num[4:]))

    def tojson(self):
        object = dict()
        object["id"] = self.bracket.id
        object["year"] = self.bracket.year
        object["games"] = dict()

        for game in self.games:
            game_object = dict()
            game_object["game_num"] = game.game_num
            game_object["home"] = game.home
            game_object["away"] = game.away

            object["games"][game.game_num] = game_object

        return object


class bracketWinner:
    def __init__(self, winning_bracket, tie):
        self.winner = winning_bracket
        self.tie = tie


def assignImage(bracket):
    if not bracket or not bracket.winner:
        return ""
    url_list = bracket.winner.split(" ")
    url = "".join(url_list[1:]).replace(".", "")
    return url


def createEmptyBracket():
    games = [emptyGame(i) for i in range(15)]
    print(len(games))
    return userBracket(bracket_id=None, bracket=emptyBracket(), games=games)


def getWinner(standings):
    if not standings:
        return

    correct = queries.getCorrectBracket()

    if not correct or not correct.winner:
        return None

    winners = [b for b in standings if b.bracket.rank == 1]

    if len(winners) == 0:
        return None

    if len(winners) == 1:
        return bracketWinner(winners, False)

    for w in winners:
        w.goal_difference = abs(
            w.bracket.w_goals + w.bracket.l_goals - (correct.w_goals + correct.l_goals)
        )

    winners.sort(key=lambda x: x.goal_difference)

    min_goal_diff = winners[0].goal_difference
    winners = [w for w in winners if w.goal_difference <= min_goal_diff]

    return bracketWinner(winners, True)


def getBracketStandings():
    brackets = queries.getAllUserBrackets()
    correct = queries.getCorrectBracket()

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


def getBracketStandingsForYear(year):
    brackets = queries.getAllUserBracketsForYear(year=year)
    correct = queries.getCorrectBracketForYear(year=year)

    for bracket in brackets:
        bracket.goal_difference = abs(
            bracket.bracket.w_goals
            + bracket.bracket.l_goals
            - (correct.w_goals + correct.l_goals)
        )

        brackets.sort(key=lambda x: x.goal_difference)

    brackets.sort(key=lambda b: b.bracket.name)
    brackets.sort(key=lambda b: b.bracket.rank)
    brackets.sort(key=lambda b: b.bracket.max_points, reverse=True)

    return brackets, baseCorrectBracket(bracket=correct)


def calculatePointsForBracket(bracket, correct, teams):
    points = 0

    # ROUND 1
    if bracket.games[0].winner == correct.games[0].winner:
        points += 10
    if bracket.games[1].winner == correct.games[1].winner:
        points += 10
    if bracket.games[2].winner == correct.games[2].winner:
        points += 10
    if bracket.games[3].winner == correct.games[3].winner:
        points += 10
    if bracket.games[4].winner == correct.games[4].winner:
        points += 10
    if bracket.games[5].winner == correct.games[5].winner:
        points += 10
    if bracket.games[6].winner == correct.games[6].winner:
        points += 10
    if bracket.games[7].winner == correct.games[7].winner:
        points += 10

    # ROUND 2
    if bracket.games[8].winner == correct.games[8].winner:
        points += 20
    if bracket.games[9].winner == correct.games[9].winner:
        points += 20
    if bracket.games[10].winner == correct.games[10].winner:
        points += 20
    if bracket.games[11].winner == correct.games[11].winner:
        points += 20

    # ROUND 3
    if bracket.games[12].winner == correct.games[12].winner:
        points += 40
    if bracket.games[13].winner == correct.games[13].winner:
        points += 40

    # WINNER
    if bracket.games[14].winner == correct.games[14].winner:
        points += 80

    return points


def calculateMaxPointsForBracket(bracket, correct, teams):
    max_points = 0

    # ROUND 1
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

    # ROUND 2
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

    # ROUND 3
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

    # WINNER
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


# this is for checking the image urls are correct
def checkImgUrls(default_brackets):
    path = os.path.dirname(os.path.abspath(__file__))[:-4]
    for game in default_brackets.games:
        url_list = game.home.split(" ")
        url = "".join(url_list[1:]).replace(".", "")
        # print(url)
        # print(os.path.isfile(f"{path}/static/images/{url}.svg"))

        url_list = game.away.split(" ")
        url = "".join(url_list[1:]).replace(".", "")
        # print(url)
        # print(os.path.isfile(f"{path}/static/images/{url}.svg"))
