from flask import Blueprint, render_template
from bracketapp.utils import bracketUtils
from bracketapp.config import CAN_EDIT_BRACKET


index_bp = Blueprint("index_bp", __name__)


@index_bp.route("/", methods=["GET"])
def index():
    can_click = not CAN_EDIT_BRACKET
    standings = bracketUtils.getBracketStandings()
    winner = bracketUtils.getWinner(standings) if can_click else None
    return render_template(
        "standings.html",
        brackets=standings,
        can_click=can_click,
        winner=winner,
        len=len,
    )
