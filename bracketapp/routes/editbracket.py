from bracketapp.queries import bracket_queries
from flask import Blueprint, render_template, redirect, url_for, request, flash
from flask_login import current_user, login_required
from bracketapp.utils import bracket_utils
from bracketapp.config import CAN_EDIT_BRACKET


editbracket_bp = Blueprint("editbracket_bp", __name__)


@editbracket_bp.get("/edit_bracket/<int:id>")
@login_required
def edit_bracket(id):
    my_bracket_count = bracket_queries.my_bracket_count()
    if my_bracket_count >= 5:
        # if we don't have a bracket id and we are already at the max number of
        # # brackets, flash a message and go to viewing my brackets
        flash("You have already created 5/5 brackets for this year", "danger")
        return redirect(url_for("mybrackets_bp.my_brackets"))

    if not CAN_EDIT_BRACKET:
        # if we have a bracket id and we can't edit, go to viewing the bracket
        return redirect(url_for("viewbracket_bp.view_bracket", id=id))

    bracket = bracket_queries.get_my_bracket_for_bracket_id(bracket_id=id)

    if not bracket:
        # is this really what i want to do?
        return redirect(url_for("viewbracket_bp.view_bracket", id=id))

    default = bracket_queries.get_default_bracket()

    return render_template(
        "edit_bracket.html",
        bracket=bracket.to_dict(safe_only=False),
        default=default.to_dict(),
    )


@editbracket_bp.get("/new_bracket")
@login_required
def new_bracket():
    my_bracket_count = bracket_queries.my_bracket_count()
    if my_bracket_count >= 5:
        # if we don't have a bracket id and we are already at the max number of
        # # brackets, flash a message and go to viewing my brackets
        flash("You have already created 5/5 brackets for this year", "danger")
        return redirect(url_for("mybrackets_bp.my_brackets"))

    if not CAN_EDIT_BRACKET:
        # if we don't have a bracket id and we can't edit, go to viewing my brackets
        flash("Editing is disabled", "danger")
        return redirect(url_for("mybrackets_bp.my_brackets"))

    bracket = bracket_queries.get_empty_bracket()
    default = bracket_queries.get_default_bracket()

    return render_template(
        "edit_bracket.html",
        bracket=bracket.to_dict(safe_only=False),
        default=default.to_dict(),
    )


@editbracket_bp.post("/edit_bracket/<int:id>")
@login_required
def edit_bracket_post(id):
    my_bracket_count = bracket_queries.my_bracket_count()
    if my_bracket_count >= 5:
        # if we don't have a bracket id and we are already at the max number of
        # # brackets, flash a message and go to viewing my brackets
        flash("You have already created 5/5 brackets for this year", "danger")
        return redirect(url_for("mybrackets_bp.my_brackets"))

    if not CAN_EDIT_BRACKET:
        # if we have a bracket id and we can't edit, go to viewing the bracket
        return redirect(url_for("viewbracket_bp.view_bracket", id=id))

    existing_bracket = bracket_queries.get_my_bracket_for_bracket_id(bracket_id=id)

    if existing_bracket:
        existing_bracket = bracket_queries.update_bracket(
            user_id=current_user.id,
            name=request.form.get("name").strip(),
            winner=request.form.get("game15"),
            w_goals=request.form.get("w_goals"),
            l_goals=request.form.get("l_goals"),
            bracket=existing_bracket,
        )

        for i in range(1, 16):
            game_number = f"game{i}"
            bracket_queries.update_game(
                bracket_id=existing_bracket.id,
                game_num=game_number,
                winner=request.form.get(game_number),
            )

        flash("Your bracket has been saved", "success")

    else:
        flash("No bracket was found for that id. Please try again", "danger")

    return redirect(url_for("mybrackets_bp.my_brackets"))


@editbracket_bp.post("/new_bracket")
@login_required
def new_bracket_post():
    my_bracket_count = bracket_queries.my_bracket_count()
    if my_bracket_count >= 5:
        # if we don't have a bracket id and we are already at the max number of
        # # brackets, flash a message and go to viewing my brackets
        flash("You have already created 5/5 brackets for this year", "danger")
        return redirect(url_for("mybrackets_bp.my_brackets"))

    if not CAN_EDIT_BRACKET:
        # if we can't edit, go to viewing my brackets
        return redirect(url_for("mybrackets_bp.my_brackets"))

    game15 = request.form.get("game15")
    name = request.form.get("name")
    w_goals = request.form.get("w_goals")
    l_goals = request.form.get("l_goals")
    new_bracket = bracket_queries.create_bracket(
        user_id=current_user.id,
        name=name,
        winner=game15,
        w_goals=w_goals,
        l_goals=l_goals,
    )

    for i in range(1, 16):
        bracket_queries.create_game(
            user_id=current_user.id,
            bracket_id=new_bracket.id,
            game_num=f"game{i}",
            winner=request.form.get(f"game{i}"),
        )

    flash("Your bracket has been saved", "success")
    return redirect(url_for("mybrackets_bp.my_brackets"))
