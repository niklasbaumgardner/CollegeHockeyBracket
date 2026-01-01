from flask import url_for
from flask_mail import Message
from bracketapp import app, mail
from threading import Thread
import os


def async_email_sender(a_app, msg):
    with a_app.app_context():
        mail.send(msg)


def send_async_email(msg):
    Thread(target=send_async_email, args=(app, msg)).start()


def send_reset_email(user):
    if not user:
        return

    token = user.get_reset_token()
    msg = Message("Password Reset Request", recipients=[user.email])
    msg.body = f"""To reset your password, visit the following link:
{url_for("auth_bp.password_reset", token=token, _external=True)}
If you did not make this request then please ignore this email and no changes will be made.
"""

    send_async_email(msg)


def send_signup_notification_email():
    msg = Message("New User Signup", recipients=[os.environ.get("ALERT_EMAIL_ADDRESS")])
    msg.body = "A new user just signed up"
    mail.send(msg)
