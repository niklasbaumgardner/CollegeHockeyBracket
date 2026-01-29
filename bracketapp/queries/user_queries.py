from bracketapp.utils.constants import user_cache_key
from bracketapp.models import User
from flask_login import current_user
from bracketapp import bcrypt, db, cache
from sqlalchemy import func, insert, select, update


##
## User queries
##


def create_user(email, username, password):
    hash_ = hash_password(password=password)
    stmt = insert(User).values(email=email, username=username, password=hash_)
    result = db.session.execute(stmt)
    user_id = result.inserted_primary_key.id
    db.session.commit()
    return user_id


def get_user_by_id(id):
    stmt = select(User).where(User.id == id)
    return db.session.scalars(stmt.limit(1)).first()


def get_user_by_email(email):
    stmt = select(User).where(User.email == email)
    return db.session.scalars(stmt.limit(1)).first()


def update_user(username, email):
    update_dict = dict()
    if username is not None:
        update_dict["username"] = username.strip()
    if email is not None:
        update_dict["email"] = email.strip()

    stmt = update(User).where(User.id == current_user.id).values(update_dict)

    db.session.execute(stmt)
    db.session.commit()

    cache.delete(user_cache_key(current_user.id))


def update_user_password(id, password):
    if not password or not id:
        return

    user = get_user_by_id(id=id)
    if not user:
        return
    hash_ = hash_password(password=password)

    stmt = update(User).where(User.id == user.id).values(password=hash_)

    db.session.execute(stmt)
    db.session.commit()


def hash_password(password):
    return bcrypt.generate_password_hash(password=password).decode("utf-8")


def is_email_unique(email):
    stmt = select(func.count()).where(User.email == email)
    count = db.session.execute(stmt).scalar_one()
    return count == 0


def is_username_unique(username):
    stmt = select(func.count()).where(User.username == username)
    count = db.session.execute(stmt).scalar_one()
    return count == 0
