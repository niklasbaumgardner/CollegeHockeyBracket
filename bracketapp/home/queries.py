from bracketapp.models import (
    CorrectBracket,
    CorrectGame,
    User,
    Bracket,
    Game,
    DefaultBracket,
    DefaultGame,
)
from bracketapp.extensions import db
from bracketapp.home import helpers, bracketUtils
from bracketapp import bcrypt
import os

YEAR = int(os.environ.get("YEAR"))


# User queries
def getUser(id):
    return User.query.filter_by(id=id).first()


def getAllUsers():
    return User.query.all()


def updateUser(id, f_name, l_name, email, password):
    user = getUser(id=id)

    user.name = f_name + " " + l_name
    user.email = email
    user.password = bcrypt.generate_password_hash(password=password).decode("utf-8")

    db.session.commit()

    return user


# UserBracket/UserGame queries
def createUserBracket(user_id, name, winner, w_goals, l_goals):
    new_bracket = Bracket(
        user_id=user_id,
        name=name,
        year=YEAR,
        winner=winner,
        w_goals=w_goals,
        l_goals=l_goals,
        max_points=320,
        points=0,
    )

    db.session.add(new_bracket)
    db.session.commit()

    return new_bracket


def createUserGame(user_id, bracket_id, game_num, winner):
    new_game = Game(
        user_id=user_id, bracket_id=bracket_id, game_num=game_num, winner=winner
    )

    db.session.add(new_game)
    db.session.commit()

    return new_game


def updateUserBracket(user_id, name, winner, w_goals, l_goals, bracket=None):
    bracket = bracket if bracket else getUserBracketFromUserId(user_id=user_id)

    bracket.name = name
    bracket.winner = winner
    bracket.w_goals = w_goals
    bracket.l_goals = l_goals

    db.session.commit()

    return bracket


def updateUserGame(bracket_id, game_num, winner):
    game = getUserGame(bracket_id=bracket_id, game_num=game_num)
    game.winner = winner

    db.session.commit()

    return game


def getUserBracketFromBracketId(bracket_id):
    return Bracket.query.filter_by(id=bracket_id, year=YEAR).first()


def getUserBracketFromUserId(user_id):
    return Bracket.query.filter_by(user_id=user_id).first()


def getUserGame(bracket_id, game_num):
    return Game.query.filter_by(bracket_id=bracket_id, game_num=game_num).first()


def getAllUserBrackets():
    brackets = []
    bs = Bracket.query.filter_by(year=YEAR).all()
    for b in bs:
        brackets.append(bracketUtils.userBracket(b.id, bracket=b))

    return brackets


def getAllUserGamesForBracket(bracket_id):
    return Game.query.filter_by(bracket_id=bracket_id).all()


def deleteAllUserBrackets():
    brackets = Bracket.query.all()
    for b in brackets:
        deleteUserBracket(b.id)


def deleteUserBracket(bracket_id):
    bracket = getUserBracketFromBracketId(bracket_id)

    for game in bracket.games:
        db.session.delete(game)
        db.session.commit()

    db.session.delete(bracket.bracket)
    db.session.commit()


# CorrectBracket/CorrectGame queries
def createCorrectBracket():
    correct = CorrectBracket(year=YEAR)
    db.session.add(correct)
    db.session.commit()

    for i in range(1, 16):
        new_game = CorrectGame(bracket_id=correct.id, game_num=f"game{i}")
        db.session.add(new_game)
        db.session.commit()

    return bracketUtils.fullCorrectBracket(bracket=correct)


def updateCorrectBracket(winner, w_goals, l_goals, bracket=None):
    bracket = bracket if bracket else getCorrectBracket()

    bracket.winner = winner
    bracket.w_goals = w_goals
    bracket.l_goals = l_goals

    db.session.commit()

    return bracket



def updateCorrectGame(b_id, game_num, winner, h_goals, loser, a_goals):
    game = getCorrectGame(bracket_id=b_id, game_num=game_num)
    game.winner = winner
    game.loser = loser
    game.h_goals = h_goals
    game.a_goals = a_goals

    db.session.commit()


def getCorrectBracket():
    return CorrectBracket.query.filter_by(year=YEAR).first()


def getCorrectGame(bracket_id, game_num):
    return CorrectGame.query.filter_by(bracket_id=bracket_id, game_num=game_num).first()


def getAllCorrectGamesForCorrectBracket(bracket_id):
    return CorrectGame.query.filter_by(bracket_id=bracket_id).all()


def deleteCorrectBracket():
    correct = bracketUtils.fullCorrectBracket()

    for game in correct.games:
        db.session.delete(game)
        db.session.commit()

    db.session.delete(correct.bracket)
    db.session.commit()


# DefaultBracket/DefaultGame queries
def createDefaultBracket():
    default = DefaultBracket(year=YEAR)
    db.session.add(default)
    db.session.commit()

    for i in range(1, 9):
        new_game = DefaultGame(bracket_id=default.id, game_num=f"game{i}")
        db.session.add(new_game)
        db.session.commit()

    return bracketUtils.fullDefaultBracket(bracket=default)


def updateDefaultGame(b_id, game_num, home, away):
    game = getDefaultGame(bracket_id=b_id, game_num=game_num)
    game.home = home
    game.away = away

    db.session.commit()


def getDefaultGame(bracket_id, game_num):
    return DefaultGame.query.filter_by(bracket_id=bracket_id, game_num=game_num).first()


def getDefaultBracket():
    return DefaultBracket.query.filter_by(year=YEAR).first()


def getAllDefaultGamesForDefaultBracket(bracket_id):
    return DefaultGame.query.filter_by(bracket_id=bracket_id).all()


def deleteDefaultBracket():
    default = bracketUtils.fullDefaultBracket()

    for game in default.games:
        db.session.delete(game)
        db.session.commit()

    db.session.delete(default.bracket)
    db.session.commit()


# Other queries
def getAllTeams():
    default = bracketUtils.fullDefaultBracket()
    lst = []
    for game in default.games:
        lst += [game.home, game.away]

    return set(lst)


def getWinner(standings):
    correct = getCorrectBracket()

    if not correct or not correct.winner:
        return None

    winners = [b for b in standings if b.rank == 1]

    if len(winners) == 1:
        return bracketUtils.bracketWinner(winners, False)

    for w in winners:
        w.goal_difference = abs(
            w.bracket.w_goals + w.bracket.l_goals - (correct.w_goals + correct.l_goals)
        )

    winners.sort(key=lambda x: x.goal_difference)

    min_goal_diff = winners[0].goal_difference

    winners = [w for w in winners if w.goal_difference <= min_goal_diff]

    return bracketUtils.bracketWinner(winners, True)


def getBracketStandings():
    brackets = getAllUserBrackets()
    correct = getCorrectBracket()

    if correct and correct.winner:
        for bracket in brackets:
            bracket.goal_difference = abs(
                bracket.bracket.w_goals
                + bracket.bracket.l_goals
                - (correct.w_goals + correct.l_goals)
            )

        brackets.sort(key=lambda x: x.goal_difference)

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


def updateAllBracketPoints():
    brackets = getAllUserBrackets()
    correct = getCorrectBracket()
    teams = getAllTeams()

    for user_bracket in brackets:
        user_bracket.bracket.points = helpers.calculatePointsForBracket(
            user_bracket, correct, teams
        )
        user_bracket.bracket.max_points = helpers.calculateMaxPointsForBracket(
            user_bracket, correct, teams
        )
        db.session.commit()
