from bracketapp.models import (
    CorrectBracket,
    CorrectGame,
    User,
    Bracket,
    Game,
    DefaultBracket,
    DefaultGame,
    Theme,
)
from bracketapp import db
from bracketapp import bcrypt
from bracketapp.utils import bracketUtils
from flask_login import current_user
from bracketapp.config import YEAR


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
    bracket = bracket if bracket else getUserBracketForUserId(user_id=user_id)

    bracket.name = name
    bracket.winner = winner
    bracket.w_goals = w_goals
    bracket.l_goals = l_goals

    db.session.commit()

    return bracket


def updateUserBracketRank(bracket, rank):
    bracket.rank = rank
    db.session.commit()


def updateUserGame(bracket_id, game_num, winner):
    game = getUserGame(bracket_id=bracket_id, game_num=game_num)
    game.winner = winner

    db.session.commit()

    return game


def getUserBracketForBracketId(bracket_id):
    if not bracket_id:
        return
    return Bracket.query.filter_by(id=bracket_id, year=YEAR).first()


def getUserBracketForBracketIdAndYear(bracket_id, year):
    if not bracket_id or not year:
        return
    return Bracket.query.filter_by(id=bracket_id, year=year).first()


def getUserBracketForUserId(user_id):
    if not user_id:
        return
    return Bracket.query.filter_by(user_id=user_id, year=YEAR).first()


def getUserGame(bracket_id, game_num):
    if not bracket_id or not game_num:
        return
    return Game.query.filter_by(bracket_id=bracket_id, game_num=game_num).first()


def getAllUserBrackets():
    brackets = []
    bs = Bracket.query.filter_by(year=YEAR).all()
    for b in bs:
        brackets.append(bracketUtils.userBracket(b.id, bracket=b))

    return brackets


def getAllUserBracketsForYear(year):
    if not year:
        return []
    brackets = []
    bs = Bracket.query.filter_by(year=year).all()
    for b in bs:
        brackets.append(bracketUtils.userBracket(b.id, bracket=b))

    return brackets


def getAllUserGamesForBracket(bracket_id):
    if not bracket_id:
        return []
    return Game.query.filter_by(bracket_id=bracket_id).all()


def deleteAllUserBrackets():
    # return  # I don't want to accidentally delete the brackets
    brackets = Bracket.query.filter_by(year=YEAR).all()
    for b in brackets:
        deleteUserBracket(b.id)


def deleteUserBracket(bracket_id):
    # return  # I don't want to accidentally delete the brackets
    bracket = getUserBracketForBracketId(bracket_id)
    games = getAllUserGamesForBracket(bracket_id=bracket.id)

    for game in games:
        db.session.delete(game)
        db.session.commit()

    db.session.delete(bracket)
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


def getCorrectBracketForYear(year):
    if not year:
        return
    return CorrectBracket.query.filter_by(year=year).first()


def getCorrectGame(bracket_id, game_num):
    if not bracket_id or not game_num:
        return
    return CorrectGame.query.filter_by(bracket_id=bracket_id, game_num=game_num).first()


def getAllCorrectGamesForCorrectBracket(bracket_id):
    if not bracket_id:
        return
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


def getDefaultBracket():
    return DefaultBracket.query.filter_by(year=YEAR).first()


def getDefaultBracketForYear(year):
    if not year:
        return
    return DefaultBracket.query.filter_by(year=year).first()


def getDefaultGame(bracket_id, game_num):
    if not bracket_id or not game_num:
        return
    return DefaultGame.query.filter_by(bracket_id=bracket_id, game_num=game_num).first()


def getAllDefaultGamesForDefaultBracket(bracket_id):
    if not bracket_id:
        return []
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


def updateBracketStandings(brackets=None, correct=None):
    brackets = brackets if brackets else getAllUserBrackets()
    correct = correct if correct else getCorrectBracket()

    if correct and correct.bracket.winner:
        for bracket in brackets:
            bracket.goal_difference = abs(
                bracket.bracket.w_goals
                + bracket.bracket.l_goals
                - (correct.bracket.w_goals + correct.bracket.l_goals)
            )

        brackets.sort(key=lambda x: x.goal_difference)

    brackets.sort(key=lambda b: b.bracket.points, reverse=True)

    rank = 1
    standings = []
    for i, bracket in enumerate(brackets):
        if i == 0:
            bracket.bracket.rank = rank
            standings.append(bracket)
        elif bracket.bracket.points == brackets[i - 1].bracket.points:
            bracket.bracket.rank = rank
            standings.append(bracket)
        else:
            rank = i + 1
            bracket.bracket.rank = rank
            standings.append(bracket)

        updateUserBracketRank(bracket=bracket.bracket, rank=rank)


def updateAllBracketPoints():
    brackets = getAllUserBrackets()
    correct = bracketUtils.fullCorrectBracket(bracket=getCorrectBracket())
    teams = getAllTeams()

    for user_bracket in brackets:
        points_dict = bracketUtils.calculatePointsForBracket(
            user_bracket, correct, teams
        )

        user_bracket.bracket.r1 = points_dict.get("r1")
        user_bracket.bracket.r2 = points_dict.get("r2")
        user_bracket.bracket.r3 = points_dict.get("r3")
        user_bracket.bracket.r4 = points_dict.get("r4")
        user_bracket.bracket.points = points_dict.get("points")

        user_bracket.bracket.max_points = bracketUtils.calculateMaxPointsForBracket(
            user_bracket, correct, teams
        )
        db.session.commit()

    updateBracketStandings(brackets=brackets, correct=correct)


##
## Theme queries
##


def get_theme():
    return Theme.query.filter_by(user_id=current_user.id).first()


def set_theme(theme_color=None, background_color=None, color=None):
    if not current_user.is_authenticated:
        return

    theme = get_theme()

    if theme:
        if theme_color is not None:
            theme.theme = theme_color
        if background_color is not None:
            theme.backgroundColor = background_color
        if color is not None:
            theme.color = color
        db.session.commit()
    else:
        theme = Theme(
            user_id=current_user.id,
            theme=theme_color or "",
            backgroundColor=background_color or "",
            color=color or "",
        )
        db.session.add(theme)
        db.session.commit()

    return theme


##
## User queries
##


def create_user(email, username, password):
    hash_ = hash_password(password=password)
    new_user = User(email=email, username=username, password=hash_)
    db.session.add(new_user)
    db.session.commit()


def get_user_by_id(id):
    return User.query.filter_by(id=id).first()


def get_user_by_email(email):
    return User.query.filter_by(email=email).first()


def get_all_users():
    return User.query.all()


def update_user(id, username, email):
    user = get_user_by_id(id=id)

    username = username if is_username_unique(username=username) else None
    email = email if is_email_unique(email=email) else None

    if username:
        user.username = username

    if email:
        user.email = email

    db.session.commit()


def update_user_password(id, password):
    if not password or not id:
        return

    user = get_user_by_id(id=id)
    hash_ = hash_password(password=password)
    user.password = hash_

    db.session.commit()


def hash_password(password):
    return bcrypt.generate_password_hash(password=password).decode("utf-8")


def is_email_unique(email):
    return not User.query.filter_by(email=email).first()


def is_username_unique(username):
    return not User.query.filter_by(username=username).first()
