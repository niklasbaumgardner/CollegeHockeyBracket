from bracketapp.queries import bracket_queries
from flask import Blueprint, redirect, url_for, flash
from flask_login import login_required
from bracketapp.config import CAN_EDIT_BRACKET, YEAR


deletebracket_bp = Blueprint("deletebracket_bp", __name__)


@deletebracket_bp.post("/delete_bracket/<int:id>")
@login_required
def delete_bracket(id):
    bracket = bracket_queries.get_my_bracket_for_bracket_id(bracket_id=id)
    if bracket and bracket.year == YEAR and CAN_EDIT_BRACKET:
        bracket_queries.delete_bracket(bracket_id=bracket.id)
        flash("Bracket deleted")

    return redirect(url_for("mybrackets_bp.my_brackets"))
