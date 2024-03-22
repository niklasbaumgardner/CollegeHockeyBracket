from flask import Blueprint, render_template, url_for
from bracketapp.utils import bracket_utils
from bracketapp.config import CAN_EDIT_BRACKET, YEAR


index_bp = Blueprint("index_bp", __name__)


@index_bp.route("/", methods=["GET"])
def index():
    can_click = not CAN_EDIT_BRACKET
    # TODO: return the correct bracket if possible
    standings = bracket_utils.get_bracket_standings()
    standings_json = [b.to_json() for b in standings]

    message = f'Welcome to this years bracket challenge! The tournament starts on Thursday, March 28 at 2:00PM ET.<br/>Make sure you <a href="{ url_for("editbracket_bp.edit_bracket") }">create your bracket</a> before then!'
    if can_click:
        winner = bracket_utils.get_winner(standings)

        if not winner.tie and len(winner.winner) == 1:
            message = f'<h4>Congratulations to { winner.winner[0].username }</h4><a href="{ url_for("viewbracket_bp.view_bracket", id=winner.winner[0].bracket.id) }">{ winner.winner[0].bracket.name }</a>, { winner.winner[0].username } won this year\'s bracket challenge with <b>{ winner.winner[0].bracket.points }</b> points.'
        elif winner.tie and len(winner.winner) > 1:
            message = f"<h4>We have a tie between {len(winner.winner)} brackets</h4>"
            message += f"<div>The following brackets have tied with {winner.winner[0].bracket.points} points after the tiebreak (total goals: {winner.total_correct_goals})</div>"
            for bracket in winner.winner:
                message += f'<div><a href="{ url_for("viewbracket_bp.view_bracket", id=bracket.bracket.id) }">{ bracket.bracket.name }</a>, { bracket.username } tied this year\'s bracket challenge with { winner.winner[0].bracket.points } points and { bracket.bracket.w_goals + bracket.bracket.l_goals } total goals</div>'
        elif winner.tie and len(winner.winner) == 1:
            message = f'<h4>Congratulations to { winner.winner[0].username }</h4><a href="{ url_for("viewbracket_bp.view_bracket", id=winner.winner[0].bracket.id) }">{ winner.winner[0].bracket.name }</a>, { winner.winner[0].username } won this year\'s bracket challenge by the tiebreak with <b>{ winner.winner[0].bracket.points }</b> points and a goal differential of <b>{ abs((winner.winner[0].bracket.w_goals + winner.winner[0].bracket.l_goals) - (winner.total_correct_goals)) }</b>.'
        else:
            message = f"The tournament has started. See the current standings below."

    return render_template(
        "standings.html",
        standings=standings_json,
        CAN_EDIT_BRACKET=CAN_EDIT_BRACKET,
        message=message,
        year=YEAR,
    )
