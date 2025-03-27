from bracketapp.models import User
from bracketapp import db, login_manager
from bracketapp import bcrypt


@login_manager.user_loader
def load_user(user_id):
    return get_user_by_id(id=user_id)


##
## user queries
##


def create_user(email, username, password):
    hash_ = hash_password(password=password)
    new_user = User(email=email[:60].lower(), username=username[:60], password=hash_)
    db.session.add(new_user)
    db.session.commit()


def get_user_by_id(id):
    return User.query.filter_by(id=id).first()


def get_user_by_email(email):
    return User.query.filter_by(email=email.lower()).first()


def get_all_users():
    return User.query.all()


def update_user(id, username=None, email=None, token=None):
    user = get_user_by_id(id=id)

    username = username if is_username_unique(username=username) else None
    email = email if is_email_unique(email=email) else None

    if username is not None:
        user.username = username[:60]

    if email is not None:
        user.email = email[:60].lower()

    if token is not None:
        user.streamchat_token = token

    db.session.commit()


def update_user_password(id, password):
    if not password or not id:
        return

    user = get_user_by_id(id=id)
    hash_ = hash_password(password=password)
    user.password = hash_

    db.session.commit()


def hash_password(password):
    return bcrypt.generate_password_hash(password=password).decode("utf-8")


def is_email_unique(email):
    return not User.query.filter_by(email=email.lower()).first()


def is_username_unique(username):
    return not User.query.filter_by(username=username).first()
