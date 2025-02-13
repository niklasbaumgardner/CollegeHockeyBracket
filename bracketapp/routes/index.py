from flask import Blueprint, render_template
from bracketapp.utils import bracket_utils
from bracketapp.config import CAN_EDIT_BRACKET, YEAR


index_bp = Blueprint("index_bp", __name__)


@index_bp.route("/", methods=["GET"])
def index():
    # TODO: return the correct bracket if possible
    standings, winners, correct = bracket_utils.get_bracket_standings()
    standings_dict = [
        b.to_dict(safe_only=CAN_EDIT_BRACKET, include_games=False) for b in standings
    ]
    winners_dict = [
        b.to_dict(safe_only=CAN_EDIT_BRACKET, include_games=False) for b in winners
    ]

    return render_template(
        "standings.html",
        standings=standings_dict,
        winners=winners_dict,
        year=YEAR,
    )
