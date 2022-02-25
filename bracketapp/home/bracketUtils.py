from re import U
from bracketapp.models import CorrectBracket, CorrectGame, User, Bracket, Game, DefaultBracket, DefaultGame
from bracketapp.extensions import db
from datetime import datetime

class fullBracket():
    def __init__(self, user_id):
        self.user_id = user_id
        self.bracket = Bracket.query.filter_by(user_id=user_id, year=datetime.now().year).first()
        self.games = Game.query.filter_by(user_id=user_id, bracket_id=self.bracket.id).all()

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

# def createFullBracket():


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


def updateCorrect(b_id, game_num, winner, w_goals, loser, l_goals):
    game = CorrectGame.query.filter_by(bracket_id=b_id, game_num=game_num).first()
    game.winner = winner
    game.w_goals = w_goals
    game.loser = loser
    game.l_goals = l_goals

    db.session.commit()


def updateDefault(b_id, game_num, home, away):
    game = DefaultGame.query.filter_by(bracket_id=b_id, game_num=game_num).first()
    game.home = home
    game.away = away

    db.session.commit()



