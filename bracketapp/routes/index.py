from flask import Blueprint, render_template
from bracketapp.utils import bracket_utils
from bracketapp.config import CAN_EDIT_BRACKET, YEAR


index_bp = Blueprint("index_bp", __name__)


@index_bp.route("/", methods=["GET"])
def index():
    can_click = not CAN_EDIT_BRACKET
    # TODO: return the correct bracket if possible
    standings = bracket_utils.get_bracket_standings()
    standings_json = [b.to_json() for b in standings]
    winner = bracket_utils.get_winner(standings) if can_click else None
    return render_template(
        "standings.html",
        standings=standings_json,
        CAN_EDIT_BRACKET=CAN_EDIT_BRACKET,
        winner=winner,
        year=YEAR,
    )
