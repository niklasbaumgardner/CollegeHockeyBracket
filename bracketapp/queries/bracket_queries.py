from bracketapp.models import (
    CorrectBracket,
    CorrectGame,
    Bracket,
    Game,
    DefaultBracket,
    DefaultGame,
    Team,
    BracketTeam,
)
from bracketapp import db
from bracketapp.utils import bracket_utils
from bracketapp.config import YEAR


##
## Bracket and Game queries
##
def create_user_bracket(user_id, name, winner, w_goals, l_goals):
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


def create_user_game(user_id, bracket_id, game_num, winner):
    new_game = Game(
        user_id=user_id, bracket_id=bracket_id, game_num=game_num, winner=winner
    )

    db.session.add(new_game)
    db.session.commit()

    return new_game


def update_user_bracket(user_id, name, winner, w_goals, l_goals, bracket=None):
    bracket = bracket if bracket else get_bracket_for_user_id(user_id=user_id)

    bracket.name = name
    bracket.winner = winner
    bracket.w_goals = w_goals
    bracket.l_goals = l_goals

    db.session.commit()

    return bracket


def update_user_bracket_rank(bracket, rank):
    bracket.rank = rank
    db.session.commit()


def update_user_game(bracket_id, game_num, winner):
    game = get_user_game(bracket_id=bracket_id, game_num=game_num)
    game.winner = winner

    db.session.commit()

    return game


def get_bracket_for_bracket_id(bracket_id):
    if not bracket_id:
        return
    return Bracket.query.filter_by(id=bracket_id).first()


def get_user_bracket_for_bracket_id_and_year(bracket_id, year):
    if not bracket_id or not year:
        return
    return Bracket.query.filter_by(id=bracket_id, year=year).first()


def get_bracket_for_user_id(user_id):
    if not user_id:
        return
    return Bracket.query.filter_by(user_id=user_id, year=YEAR).first()


def get_user_game(bracket_id, game_num):
    if not bracket_id or not game_num:
        return
    return Game.query.filter_by(bracket_id=bracket_id, game_num=game_num).first()


def get_all_brackets():
    return Bracket.query.filter_by(year=YEAR).all()


def get_all_user_brackets():
    brackets = []
    bs = Bracket.query.filter_by(year=YEAR).all()
    for b in bs:
        brackets.append(bracket_utils.BracketInterface(b.id, bracket=b))

    return brackets


def get_all_user_brackets_for_year(year):
    if not year:
        return []
    brackets = []
    bs = Bracket.query.filter_by(year=year).all()
    for b in bs:
        brackets.append(
            bracket_utils.BracketInterface(b.id, bracket=b, safe_only=False)
        )

    return brackets


def get_all_user_games_for_bracket(bracket_id):
    if not bracket_id:
        return []
    return Game.query.filter_by(bracket_id=bracket_id).all()


def delete_all_user_brackets():
    # return  # i don't want to accidentally delete the brackets
    brackets = Bracket.query.filter_by(year=YEAR).all()
    for b in brackets:
        delete_user_bracket(b.id)


def delete_user_bracket(bracket_id):
    # return  # i don't want to accidentally delete the brackets
    bracket = get_bracket_for_bracket_id(bracket_id=bracket_id)
    games = get_all_user_games_for_bracket(bracket_id=bracket.id)

    for game in games:
        db.session.delete(game)
        db.session.commit()

    db.session.delete(bracket)
    db.session.commit()


##
## CorrectBracket and CorrectGame queries
##
def create_correct_bracket():
    correct = CorrectBracket(year=YEAR)
    db.session.add(correct)
    db.session.commit()

    for i in range(1, 16):
        new_game = CorrectGame(bracket_id=correct.id, game_num=f"game{i}")
        db.session.add(new_game)
        db.session.commit()

    return bracket_utils.CorrectBracketInterface(bracket=correct)


def update_correct_bracket(winner, w_goals, l_goals, bracket=None):
    bracket = bracket if bracket else get_correct_bracket()

    bracket.winner = winner
    bracket.w_goals = w_goals
    bracket.l_goals = l_goals

    db.session.commit()

    return bracket


def update_correct_game(b_id, game_num, winner, h_goals, loser, a_goals):
    game = get_correct_game(bracket_id=b_id, game_num=game_num)
    game.winner = winner
    game.loser = loser
    game.h_goals = h_goals
    game.a_goals = a_goals

    db.session.commit()


def get_correct_bracket():
    return CorrectBracket.query.filter_by(year=YEAR).first()


def get_correct_bracket_for_year(year):
    if not year:
        return
    return CorrectBracket.query.filter_by(year=year).first()


def get_all_completed_correct_brackets():
    return (
        CorrectBracket.query.filter(CorrectBracket.winner != None)
        .order_by(CorrectBracket.year.desc())
        .all()
    )


def get_correct_game(bracket_id, game_num):
    if not bracket_id or not game_num:
        return
    return CorrectGame.query.filter_by(bracket_id=bracket_id, game_num=game_num).first()


def get_all_correct_games_for_correct_bracket(bracket_id):
    if not bracket_id:
        return
    return CorrectGame.query.filter_by(bracket_id=bracket_id).all()


def delete_correct_bracket():
    correct = bracket_utils.CorrectBracketInterface()

    for game in correct.games:
        db.session.delete(game)
        db.session.commit()

    db.session.delete(correct.bracket)
    db.session.commit()


##
## DefaultBracket and DefaultGame queries
##
def create_default_bracket():
    default = DefaultBracket(year=YEAR)
    db.session.add(default)
    db.session.commit()

    for i in range(1, 9):
        new_game = DefaultGame(bracket_id=default.id, game_num=f"game{i}")
        db.session.add(new_game)
        db.session.commit()

    return bracket_utils.DefaultBracketInterface(bracket=default)


def update_default_game(b_id, game_num, home, away):
    game = get_default_game(bracket_id=b_id, game_num=game_num)
    game.home = home
    game.away = away

    db.session.commit()


def get_default_bracket():
    return DefaultBracket.query.filter_by(year=YEAR).first()


def get_default_bracket_for_year(year):
    if not year:
        return
    return DefaultBracket.query.filter_by(year=year).first()


def get_default_game(bracket_id, game_num):
    if not bracket_id or not game_num:
        return
    return DefaultGame.query.filter_by(bracket_id=bracket_id, game_num=game_num).first()


def get_all_default_games_for_default_bracket(bracket_id):
    if not bracket_id:
        return []
    return DefaultGame.query.filter_by(bracket_id=bracket_id).all()


def delete_default_bracket():
    default = bracket_utils.DefaultBracketInterface()

    for game in default.games:
        db.session.delete(game)
        db.session.commit()

    db.session.delete(default.bracket)
    db.session.commit()


##
## other queries
##
def get_all_teams():
    default = bracket_utils.DefaultBracketInterface()
    lst = []
    for game in default.games:
        lst += [game.home, game.away]

    return set(lst)


def update_bracket_standings(brackets=None, correct=None):
    brackets = brackets if brackets else get_all_user_brackets()
    correct = correct if correct else get_correct_bracket()

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

        update_user_bracket_rank(bracket=bracket.bracket, rank=rank)


def update_all_bracket_points():
    brackets = get_all_user_brackets()
    correct = bracket_utils.CorrectBracketInterface(bracket=get_correct_bracket())
    teams = get_all_teams()

    for user_bracket in brackets:
        points_dict = bracket_utils.calculate_points_for_bracket(
            user_bracket, correct, teams
        )

        user_bracket.bracket.r1 = points_dict.get("r1")
        user_bracket.bracket.r2 = points_dict.get("r2")
        user_bracket.bracket.r3 = points_dict.get("r3")
        user_bracket.bracket.r4 = points_dict.get("r4")
        user_bracket.bracket.points = points_dict.get("points")

        user_bracket.bracket.max_points = (
            bracket_utils.calculate_max_points_for_bracket(user_bracket, correct, teams)
        )
        db.session.commit()

    update_bracket_standings(brackets=brackets, correct=correct)


##
## Team and BracketTeam queries
##


def get_icon_path(name):
    name_stripped = name.replace(" ", "").replace(".", "")
    return f"/static/images/{name_stripped}.svg"


def create_team(teamname):
    icon_path = get_icon_path(teamname)
    team = Team(name=teamname, icon_path=icon_path)
    db.session.add(team)
    db.session.commit()


def get_team_by_name(name):
    return Team.query.filter_by(name=name).first()


def get_team_by_id(id):
    return Team.query.filter_by(id=id).first()


def get_team_by_bracket_team_id(id):
    b_team = get_bracket_team_by_id(id=id)
    return get_team_by_id(id=b_team.team_id)


def create_bracket_team(team_name, rank, year):
    team = get_team_by_name(name=team_name)
    b_team = BracketTeam(team_id=team.id, rank=rank, year=year)
    db.session.add(b_team)
    db.session.commit()


def get_bracket_team_by_name_and_year(team_name, year):
    team = get_team_by_name(name=team_name)
    return BracketTeam.query.filter_by(team_id=team.id, year=year).first()


def get_bracket_team_by_id(id):
    return BracketTeam.query.filter_by(id=id).first()


def get_all_bracket_teams_for_year(year):
    return BracketTeam.query.filter_by(year=year).all()
