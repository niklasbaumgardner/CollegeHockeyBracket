from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import current_user, login_required

from bracketapp.queries import user_queries
from bracketapp.utils import cache_invalidator

profile_bp = Blueprint("profile_bp", __name__)


@profile_bp.route("/profile", methods=["GET", "POST"])
@login_required
def profile():
    if request.method == "POST":
        username = request.form.get("username")
        email = request.form.get("email")

        if not user_queries.is_username_unique(
            username
        ) and not user_queries.is_email_unique(email):
            flash(
                "Username and email are already taken. Please choose different ones",
                "danger",
            )
            return redirect(url_for("profile_bp.profile"))

        user_queries.update_user(email=email, username=username)
        if username != current_user.username:
            cache_invalidator.update_user()

        return redirect(url_for("profile_bp.profile"))
    return render_template(
        "profile.html", username=current_user.username, email=current_user.email
    )
