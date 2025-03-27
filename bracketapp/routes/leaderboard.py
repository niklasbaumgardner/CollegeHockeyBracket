from flask import Blueprint, render_template, redirect, url_for
from flask_login import current_user
from bracketapp.utils import bracket_utils
from bracketapp.config import CAN_EDIT_BRACKET, YEAR


leaderboard_bp = Blueprint("leaderboard_bp", __name__)


@leaderboard_bp.route("/", methods=["GET"])
def index():
    if current_user.is_authenticated:
        return redirect(url_for("mybrackets_bp.my_brackets"))

    return redirect(url_for("leaderboard_bp.leaderboard"))


@leaderboard_bp.route("/leaderboard", methods=["GET"])
def leaderboard():
    return render_template(
        "standings.html", content_url=url_for("leaderboard_bp.api_leaderboard")
    )


@leaderboard_bp.get("/api/leaderboard")
def api_leaderboard():
    # TODO: return the correct bracket if possible?
    # I forgot what I meant by this. Maybe bring correct to the
    # page to show correct winners on brackets table?
    standings, winners, correct = bracket_utils.get_bracket_standings()
    standings_dict = [
        b.to_dict(safe_only=CAN_EDIT_BRACKET, include_games=False) for b in standings
    ]
    winners_dict = [
        b.to_dict(safe_only=CAN_EDIT_BRACKET, include_games=False) for b in winners
    ]

    return dict(
        standings=standings_dict,
        winners=winners_dict,
        year=YEAR,
    )
