from bracketapp.home import queries

class userBracket:
    def __init__(self, bracket_id, bracket=None, games=None):
        self.bracket = bracket if bracket else queries.getUserBracketFromBracketId(bracket_id)
        self.games = games if games else queries.getAllUserGamesForBracket(bracket_id)
        self.games.sort(key=lambda x: int(x.game_num[4:]))
        user = queries.getUser(id=self.bracket.user_id)
        self.user_name = user.name
        self.user_id = user.id
        self.rank = None
        self.goal_difference = 0
        self.img_url = self.assignImage()

    def assignImage(self):
        url_list = self.bracket.winner.split(" ")
        url = "".join(url_list[1:]).replace(".", "")
        return url


class fullCorrectBracket:
    def __init__(self, bracket=None, games=None):
        self.bracket = bracket if bracket else queries.getCorrectBracket()
        self.games = (
            games
            if games
            else queries.getAllCorrectGamesForCorrectBracket(bracket_id=self.bracket.id)
        )
        self.games.sort(key=lambda x: int(x.game_num[4:]))


class fullDefaultBracket:
    def __init__(self, bracket=None, games=None):
        self.bracket = bracket if bracket else queries.getDefaultBracket()
        self.games = (
            games
            if games
            else queries.getAllDefaultGamesForDefaultBracket(bracket_id=self.bracket.id)
        )
        self.games.sort(key=lambda x: int(x.game_num[4:]))


class bracketWinner:
    def __init__(self, winning_bracket, tie):
        self.winner = winning_bracket
        self.tie = tie


def should_game_exist(team_name, game_num):
    default = queries.fullDefaultBracket()
    correct = queries.fullCorrectBracket()

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
