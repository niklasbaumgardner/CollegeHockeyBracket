from datetime import datetime

from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import current_user, login_required, login_user, logout_user
from sentry_sdk import metrics

from bracketapp import bcrypt, login_manager
from bracketapp.models import User
from bracketapp.queries import user_queries
from bracketapp.utils import cache_invalidator, send_email

# import stream_chat


auth_bp = Blueprint("auth_bp", __name__)


@login_manager.unauthorized_handler
def unauthorized():
    next_url = request.path
    join_key = request.form.get("join_key")

    if join_key is not None:
        next_url += f"?join_key={join_key}"

    return redirect(url_for("auth_bp.login", next=next_url))


@auth_bp.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("mybrackets_bp.my_brackets"))

    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password").strip()
        remember = request.form.get("remember")

        if email and password:
            user = user_queries.get_user_by_email(email=email)

            if user and bcrypt.check_password_hash(user.password, password):
                remember = True if remember == "True" else False
                login_user(user, remember=remember)

                next_url = request.args.get("next")
                if not next_url:
                    next_url = url_for("mybrackets_bp.my_brackets")
                return redirect(next_url)

            elif user:
                flash("Password was incorrect. Try again", "danger")
                return redirect(url_for("auth_bp.login", email=email))

            flash("User not found. Please create an acount", "neutral")
            return redirect(url_for("auth_bp.login"))

    email = request.args.get("email")
    return render_template("login.html", email=email)


@auth_bp.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        email = request.form.get("email")
        username = request.form.get("username")
        password1 = request.form.get("password1").strip()

        if not user_queries.is_email_unique(email):
            flash("Email already exists. Please log in", "brand")
            return redirect(url_for("auth_bp.login", email=email))

        if not user_queries.is_username_unique(username):
            flash(
                "Username already exists. Please choose a different username",
                "danger",
            )
            return redirect(url_for("auth_bp.signup"))

        if len(password1) < 6:
            flash("Password must be longer than 6 characters. Try again", "warning")
            return redirect(url_for("auth_bp.signup"))

        user_queries.create_user(email=email, username=username, password=password1)
        metrics.count(
            "user_signup",
            1,
        )

        flash("Sign up succesful", "success")
        return redirect(url_for("auth_bp.login", email=email))

    return render_template("signup.html")


@auth_bp.route("/password_request", methods=["GET", "POST"])
def password_request():
    if current_user.is_authenticated:
        user = user_queries.get_user_by_id(id=current_user.id)
        token = user.get_reset_token()
        return redirect(url_for("auth_bp.password_reset", token=token))

    if request.method == "POST":
        email = request.form.get("email")
        next_url = request.form.get("next")
        user = user_queries.get_user_by_email(email=email)
        send_email.send_reset_email(user, next_url)
        flash(
            "An email has been sent with instructions to reset your password. Check spam folder.",
            "primary",
        )
        return redirect(url_for("auth_bp.login"))

    return render_template("password_request.html")


@auth_bp.route("/password_reset", methods=["GET", "POST"])
def password_reset():
    token = request.args.get("token")
    if request.method == "POST":
        user, next_url = User.verify_reset_token(token)
        if not user:
            flash("That is an invalid or expired token", "danger")
            if current_user.is_authenticated:
                return redirect(url_for("profile_bp.profile"))
            else:
                return redirect(url_for("auth_bp.password_request"))

        password1 = request.form.get("password1").strip()
        password2 = request.form.get("password2").strip()

        if password1 != password2:
            flash("Passwords are not equal. Please try again", "warning")
            return render_template("password_reset.html")

        user_queries.update_user_password(user.id, password=password1)
        flash(
            "Your password has been updated! You are now able to log in",
            "success",
        )
        return redirect(url_for("auth_bp.login", email=user.email, next=next_url))

    return render_template("password_reset.html")


@auth_bp.get("/logout")
@login_required
def logout():
    cache_invalidator.logout_user()
    logout_user()
    return redirect(url_for("auth_bp.login"))


@auth_bp.get("/username_unique")
def username_unique():
    username = request.args.get("username")

    return {"isUnique": user_queries.is_username_unique(username)}


@auth_bp.get("/email_unique")
def email_unique():
    email = request.args.get("email")

    return {"isUnique": user_queries.is_email_unique(email)}


@auth_bp.route("/email_login", methods=["GET", "POST"])
def email_login():
    if current_user.is_authenticated:
        return redirect(url_for("mybrackets_bp.my_brackets"))

    if request.method == "POST":
        email = request.form.get("email").strip().lower()
        next_url = request.form.get("next")
        user = user_queries.get_user_by_email(email=email)
        if not user:
            send_email.send_new_user_login_email(email, next_url)
        else:
            send_email.send_login_email(user, next_url)

        flash(
            "An email has been sent with a link to login. Check spam folder.",
            "primary",
        )
        return redirect(url_for("auth_bp.login"))

    return render_template("email_login.html")


@auth_bp.get("/passwordless_login/<string:token>")
def passwordless_login(token):
    token_data = User.verify_login_token(token)
    id = token_data.get("user_id")
    email = token_data.get("email")
    new_user = token_data.get("new_user")
    next_url = token_data.get("next_url")

    # The user could exist if the link is clicked a second time?
    user = user_queries.get_user_by_email(email)
    if new_user and not user:
        user_queries.create_user(
            email=email,
            username=email.split("@")[0] + f"{round(datetime.now().timestamp())}",
        )
        metrics.count(
            "user_signup",
            1,
        )

    if id and not user:
        user = user_queries.get_user_by_id(id)
    elif email and not user:
        user = user_queries.get_user_by_email(email)

    if not user:
        flash("Something went wrong.", "danger")
        return redirect(url_for("auth_bp.login"))

    login_user(user, remember=True)

    if next_url:
        return redirect(next_url)

    if new_user:
        return redirect(url_for("profile_bp.profile"))

    return redirect(url_for("mybrackets_bp.my_brackets"))


# @auth_bp.get("/create_streamchat_token")
# @login_required
# def create_streamchat_token():
#     server_client = stream_chat.StreamChat(
#         api_key=os.environ.get("STREAM_CHAT_API_KEY"),
#         api_secret=os.environ.get("STREAM_CHAT_SECRET_KEY"),
#     )

#     token = server_client.create_token(f"{current_user.id}")
#     user_queries.update_user(id=current_user.id, token=token)

#     return current_user.to_dict()
