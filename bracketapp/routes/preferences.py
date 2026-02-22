from flask import Blueprint, render_template
from flask_login import login_required

preferences_bp = Blueprint("preferences_bp", __name__)


@preferences_bp.route("/preferences", methods=["GET"])
@login_required
def preferences():
    return render_template("preferences.html")
