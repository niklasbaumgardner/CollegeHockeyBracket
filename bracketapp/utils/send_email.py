import os
from threading import Thread

from flask import url_for
from flask_mail import Message

from bracketapp import app, mail
from bracketapp.models import User


def async_email_sender(a_app, msg):
    with a_app.app_context():
        mail.send(msg)


def send_async_email(msg):
    Thread(target=async_email_sender, args=(app, msg)).start()


def send_reset_email(user):
    if not user:
        return

    token = user.get_reset_token()
    msg = Message("Password Reset Request", recipients=[user.email])
    msg.body = f"""To reset your password, visit the following link:
{url_for("auth_bp.password_reset", token=token, _external=True)}
The link is only valid for 10 minutes.
If you did not make this request then please ignore this email and no changes will be made.
"""

    send_async_email(msg)


def send_new_user_login_email(email):
    if not email:
        return

    token = User.get_new_user_login_token(email)

    msg = Message("NB Bracket Challenge Login Link", recipients=[email])
    msg.body = f"""To login, click the following link:
{url_for("auth_bp.passwordless_login", token=token, _external=True)}
The link is only valid for 10 minutes.
If you did not make this request then please ignore this email and no changes will be made.
"""

    send_async_email(msg)


def send_login_email(user):
    if not user:
        return

    token = user.get_login_token()
    msg = Message("NB Bracket Challenge Login Link", recipients=[user.email])
    msg.body = f"""To login, click the following link:
{url_for("auth_bp.passwordless_login", token=token, _external=True)}
The link is only valid for 10 minutes.
If you did not make this request then please ignore this email and no changes will be made.
"""

    send_async_email(msg)


def send_signup_notification_email():
    msg = Message("New User Signup", recipients=[os.environ.get("ALERT_EMAIL_ADDRESS")])
    msg.body = "A new user just signed up"
    mail.send(msg)
