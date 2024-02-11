from flask import Blueprint, render_template, redirect, url_for, request
from flask_login import current_user, login_required
from bracketapp.utils import bracket_utils, queries
from bracketapp.config import CAN_EDIT_BRACKET


editbracket_bp = Blueprint("editbracket_bp", __name__)


@editbracket_bp.route("/edit_bracket", methods=["GET", "POST"])
@login_required
def edit_bracket():
    if not CAN_EDIT_BRACKET:
        return redirect(url_for("viewbracket_bp.view_bracket"))

    if request.method == "GET":
        default = bracket_utils.DefaultBracketInterface()
        bracket = queries.get_bracket_for_user_id(user_id=current_user.get_id())
        if bracket:
            bracket = bracket_utils.BracketInterface(
                bracket_id=bracket.id, bracket=bracket, safe_only=False
            )
        else:
            bracket = bracket_utils.EmptyBracket()
        return render_template(
            "edit_bracket.html",
            bracket=bracket.to_json(),
            default=default.to_json(),
        )
    elif request.method == "POST":
        existing_bracket = queries.get_bracket_for_user_id(
            user_id=current_user.get_id()
        )

        if existing_bracket:
            existing_bracket = queries.update_user_bracket(
                user_id=current_user.get_id(),
                name=request.form.get("name").strip(),
                winner=request.form.get("game15"),
                w_goals=request.form.get("w_goals"),
                l_goals=request.form.get("l_goals"),
                bracket=existing_bracket,
            )

            for i in range(1, 16):
                game_number = f"game{i}"
                queries.update_user_game(
                    bracket_id=existing_bracket.id,
                    game_num=game_number,
                    winner=request.form.get(game_number),
                )
        else:
            game15 = request.form.get("game15")
            name = request.form.get("name")
            w_goals = request.form.get("w_goals")
            l_goals = request.form.get("l_goals")
            new_bracket = queries.create_user_bracket(
                user_id=current_user.get_id(),
                name=name,
                winner=game15,
                w_goals=w_goals,
                l_goals=l_goals,
            )

            for i in range(1, 16):
                queries.create_user_game(
                    user_id=current_user.get_id(),
                    bracket_id=new_bracket.id,
                    game_num=f"game{i}",
                    winner=request.form.get(f"game{i}"),
                )

    return redirect(url_for("viewbracket_bp.view_bracket"))
