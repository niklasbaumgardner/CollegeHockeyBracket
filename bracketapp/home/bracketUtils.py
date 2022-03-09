from re import T, U

from sqlalchemy import true
from bracketapp.models import CorrectBracket, CorrectGame, User, Bracket, Game, DefaultBracket, DefaultGame
from bracketapp.extensions import db
from datetime import datetime

class fullBracket():
    def __init__(self, bracket_id):
        self.bracket = Bracket.query.filter_by(id=bracket_id, year=datetime.now().year).first()
        self.games = Game.query.filter_by(bracket_id=self.bracket.id).all()
        self.games.sort(key=lambda x: int(x.game_num[4:]))
        self.user_name = User.query.filter_by(id=self.bracket.user_id).first().name
        self.rank = None

class fullCorrectBracket():
    def __init__(self):
        self.bracket = CorrectBracket.query.filter_by(year=datetime.now().year).first()
        self.games = CorrectGame.query.filter_by(bracket_id=self.bracket.id).all()
        self.games.sort(key=lambda x: int(x.game_num[4:]))

class fullDefaultBracket():
    def __init__(self):
        self.bracket = DefaultBracket.query.filter_by(year=datetime.now().year).first()
        self.games = DefaultGame.query.filter_by(bracket_id=self.bracket.id).all()
        self.games.sort(key=lambda x: int(x.game_num[4:]))

class correctBracketTree():
    def __init__(self):
        self.bracket = CorrectBracket.query.filter_by(year=datetime.now().year).first()
        self.games = CorrectGame.query.filter_by(bracket_id=self.bracket.id).all()
        self.games.sort(key=lambda x: int(x.game_num[4:]))

        self.treeGames = {}


def getAllTeams():
    default = fullDefaultBracket()
    lst = []
    for game in default.games:
        lst += [game.home, game.away]

    return set(lst)


def getAllBrackets():
    brackets = []
    bs = Bracket.query.filter_by(year=datetime.now().year).all()
    for b in bs:
        brackets.append(fullBracket(b.id))

    return brackets


def getAllRankedBrackets():
    brackets = getAllBrackets()

    brackets.sort(key=lambda b: b.bracket.max_points, reverse=True)
    brackets.sort(key=lambda b: b.bracket.points, reverse=True)

    rank = 1
    standings = []
    for i, bracket in enumerate(brackets):
        if i == 0:
            bracket.rank = rank
            standings.append(bracket)
        elif bracket.bracket.points == brackets[i - 1].bracket.points:
            bracket.rank = rank
            standings.append(bracket)
        else:
            rank = i + 1
            bracket.rank = rank
            standings.append(bracket)
    return standings


def createCorrectBracket():
    correct = CorrectBracket(year=datetime.now().year)
    db.session.add(correct)
    db.session.commit()

    for i in range(1, 16):
        new_game = CorrectGame(bracket_id=correct.id, game_num=f'game{i}')
        db.session.add(new_game)
        db.session.commit()

    return fullCorrectBracket()

def createDefaultBracket():
    default = DefaultBracket(year=datetime.now().year)
    db.session.add(default)
    db.session.commit()

    for i in range(1, 9):
        new_game = DefaultGame(bracket_id=default.id, game_num=f'game{i}')
        db.session.add(new_game)
        db.session.commit()

    return fullDefaultBracket()


def updateCorrectGame(b_id, game_num, winner, h_goals, loser, a_goals):
    game = CorrectGame.query.filter_by(bracket_id=b_id, game_num=game_num).first()
    game.winner = winner
    game.loser = loser
    game.h_goals = h_goals
    game.a_goals = a_goals

    db.session.commit()


def updateDefault(b_id, game_num, home, away):
    game = DefaultGame.query.filter_by(bracket_id=b_id, game_num=game_num).first()
    game.home = home
    game.away = away

    db.session.commit()


def should_game_exist(team_name, game_num):
    default = fullDefaultBracket()
    correct = fullCorrectBracket()

    # print("got here")
    # print(team_name, game_num)
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
        ret = team_name == correct.games[0].winner or team_name == correct.games[1].winner

    elif game_num == "game10":
        ret = team_name == correct.games[2].winner or team_name == correct.games[3].winner

    elif game_num == "game11":
        ret = team_name == correct.games[4].winner or team_name == correct.games[5].winner

    elif game_num == "game12":
        ret = team_name == correct.games[6].winner or team_name == correct.games[7].winner


    elif game_num == "game13":
        ret = team_name == correct.games[8].winner or team_name == correct.games[9].winner

    elif game_num == "game14":
        ret = team_name == correct.games[10].winner or team_name == correct.games[11].winner


    elif game_num == "game15":
        ret = team_name == correct.games[12].winner or team_name == correct.games[13].winner


    # print(ret)
    return ret


def deleteDefault():
    default = fullDefaultBracket()

    for game in default.games:
        db.session.delete(game)
        db.session.commit()

    db.session.delete(default.bracket)
    db.session.commit()


def deleteCorrect():
    correct = fullCorrectBracket()

    for game in correct.games:
        db.session.delete(game)
        db.session.commit()

    db.session.delete(correct.bracket)
    db.session.commit()


def deleteBracket(id):
    bracket = fullBracket(id)

    for game in bracket.games:
        db.session.delete(game)
        db.session.commit()

    db.session.delete(bracket.bracket)
    db.session.commit()


def deleteAllBrackets():
    brackets = Bracket.query.all()
    for b in brackets:
        deleteBracket(b.id)


def updateAllBrackets():
    brackets = getAllBrackets()

    correct = fullCorrectBracket()
    teams = getAllTeams()

    for bracket in brackets:
        updateBracketPoints(bracket, correct, teams)


def updateBracketPoints(bracket, correct=None, teams=None):
    correct = fullCorrectBracket() if not correct else correct
    teams = getAllTeams() if not teams else teams

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

    bracket.bracket.points = points
    bracket.bracket.max_points = getMaxPointsForBracket(bracket, correct, teams)

    db.session.commit()


def getMaxPointsForBracket(bracket, correct=None, teams=None):
    correct = fullCorrectBracket() if not correct else correct
    teams = getAllTeams() if not teams else teams

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
    if correct.games[0].winner not in teams or bracket.games[0].winner == correct.games[0].winner:
        max_points += 10
        game1 = True
    if correct.games[1].winner not in teams or bracket.games[1].winner == correct.games[1].winner:
        max_points += 10
        game2 = True
    if correct.games[2].winner not in teams or bracket.games[2].winner == correct.games[2].winner:
        max_points += 10
        game3 = True
    if correct.games[3].winner not in teams or bracket.games[3].winner == correct.games[3].winner:
        max_points += 10
        game4 = True
    if correct.games[4].winner not in teams or bracket.games[4].winner == correct.games[4].winner:
        max_points += 10
        game5 = True
    if correct.games[5].winner not in teams or bracket.games[5].winner == correct.games[5].winner:
        max_points += 10
        game6 = True
    if correct.games[6].winner not in teams or bracket.games[6].winner == correct.games[6].winner:
        max_points += 10
        game7 = True
    if correct.games[7].winner not in teams or bracket.games[7].winner == correct.games[7].winner:
        max_points += 10
        game8 = True

    # print(max_points)
    # ROUND 2
    game9 = False
    game10 = False
    game11 = False
    game12 = False

    if ((bracket.games[8].winner == correct.games[8].winner)
        or (correct.games[8].winner not in teams and
            ((correct.games[0].winner not in teams and bracket.games[8].winner == bracket.games[0].winner)
            or (correct.games[1].winner not in teams and bracket.games[8].winner == bracket.games[1].winner)
            or (correct.games[0].winner in teams and correct.games[0].winner == bracket.games[8].winner)
            or (correct.games[1].winner in teams and correct.games[1].winner == bracket.games[8].winner)))):
        max_points += 20
        game9 = True

    if ((bracket.games[9].winner == correct.games[9].winner)
        or (correct.games[9].winner not in teams and
            ((correct.games[2].winner not in teams and bracket.games[9].winner == bracket.games[2].winner)
            or (correct.games[3].winner not in teams and bracket.games[9].winner == bracket.games[3].winner)
            or (correct.games[2].winner in teams and correct.games[2].winner == bracket.games[9].winner)
            or (correct.games[3].winner in teams and correct.games[3].winner == bracket.games[9].winner)))):
        max_points += 20
        game10 = True

    if ((bracket.games[10].winner == correct.games[10].winner)
        or (correct.games[10].winner not in teams and
            ((correct.games[4].winner not in teams and bracket.games[10].winner == bracket.games[4].winner)
            or (correct.games[5].winner not in teams and bracket.games[10].winner == bracket.games[5].winner)
            or (correct.games[4].winner in teams and correct.games[4].winner == bracket.games[10].winner)
            or (correct.games[5].winner in teams and correct.games[5].winner == bracket.games[10].winner)))):
        max_points += 20
        game11 = True

    if ((bracket.games[11].winner == correct.games[11].winner)
        or (correct.games[11].winner not in teams and
            ((correct.games[6].winner not in teams and bracket.games[11].winner == bracket.games[6].winner)
            or (correct.games[7].winner not in teams and bracket.games[11].winner == bracket.games[7].winner)
            or (correct.games[6].winner in teams and correct.games[6].winner == bracket.games[11].winner)
            or (correct.games[7].winner in teams and correct.games[7].winner == bracket.games[11].winner)))):
        max_points += 20
        game12 = True
    # print(max_points)

    # ROUND 3
    game13 = False
    game14 = False

    if ((bracket.games[12].winner == correct.games[12].winner)
        or (correct.games[12].winner not in teams and
            (game9 and bracket.games[8].winner == bracket.games[12].winner
            or game10 and bracket.games[9].winner == bracket.games[12].winner))):
        max_points += 40
        game13 = True
    
    if ((bracket.games[13].winner == correct.games[13].winner)
        or (correct.games[13].winner not in teams and
            ((game11 and bracket.games[10].winner == bracket.games[13].winner)
            or (game12 and bracket.games[11].winner == bracket.games[13].winner)))):
        max_points += 40
        game14 = True

    # WINNER
    if ((bracket.games[14].winner == correct.games[14].winner)
    or (correct.games[14].winner not in teams and
        ((game13 and bracket.games[12].winner == bracket.games[14].winner)
        or (game14 and bracket.games[12].winner == bracket.games[14].winner)))):
        max_points += 80

    return max_points
