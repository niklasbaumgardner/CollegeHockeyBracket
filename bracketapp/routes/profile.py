from flask import Blueprint, render_template, request, redirect, url_for
from flask_login import current_user, login_required
from bracketapp.queries import user_queries

profile_bp = Blueprint("profile_bp", __name__)


@profile_bp.route("/profile", methods=["GET", "POST"])
@login_required
def profile():
    user = user_queries.get_user_by_id(id=current_user.id)
    if request.method == "POST":
        username = request.form.get("username")
        email = request.form.get("email")

        user_queries.update_user(id=user.id, email=email, username=username)

        return redirect(url_for("profile_bp.profile"))
    return render_template("profile.html", username=user.username, email=user.email)
