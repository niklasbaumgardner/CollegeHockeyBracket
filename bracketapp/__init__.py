from flask_bcrypt import Bcrypt
from bracketapp.config import Config
from flask_mail import Mail
from flask_login import LoginManager
from flask_sqlalchemy_lite import SQLAlchemy
from sqlalchemy.pool import NullPool
from sqlalchemy.orm import DeclarativeBase
import os
import sentry_sdk
from werkzeug.middleware.proxy_fix import ProxyFix
from pymemcache.client.base import Client
from pymemcache import serde
from bracketapp.appsignal import appsignal

if not os.environ.get("FLASK_DEBUG"):
    appsignal.start()


class BaseModel(DeclarativeBase):
    pass


from flask import Flask

app = Flask(__name__)

app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)

if not os.environ.get("FLASK_DEBUG"):
    sentry_sdk.init(
        dsn=os.environ.get("SENTRY_DSN"),
        traces_sample_rate=1.0,
        send_default_pii=True,
        release="nbbracketchallenge@3.0.0",
    )


app.config.from_object(Config)

db = SQLAlchemy(engine_options=dict(poolclass=NullPool, future=True))
db.init_app(app)

bcrypt = Bcrypt()
bcrypt.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "auth_bp.login"
login_manager.login_message_category = "brand"

mail = Mail()
mail.init_app(app)

cache = Client(
    Config.CACHE_MEMCACHED_SERVER,
    serde=serde.pickle_serde,
    connect_timeout=2,
    timeout=1,
    ignore_exc=True,
)


# ruff: noqa: E402
from bracketapp.routes.admin import admin_bp
from bracketapp.routes.archive import archive_bp
from bracketapp.routes.auth import auth_bp
from bracketapp.routes.createbracket import createbracket_bp
from bracketapp.routes.deletebracket import deletebracket_bp
from bracketapp.routes.editbracket import editbracket_bp
from bracketapp.routes.groups import groups_bp
from bracketapp.routes.leaderboard import leaderboard_bp
from bracketapp.routes.mybrackets import mybrackets_bp
from bracketapp.routes.preferences import preferences_bp
from bracketapp.routes.profile import profile_bp
from bracketapp.routes.user_settings import user_settings_bp
from bracketapp.routes.viewbracket import viewbracket_bp
from bracketapp.utils.context_processor import context_processor_bp

app.register_blueprint(admin_bp)
app.register_blueprint(archive_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(createbracket_bp)
app.register_blueprint(deletebracket_bp)
app.register_blueprint(editbracket_bp)
app.register_blueprint(groups_bp)
app.register_blueprint(leaderboard_bp)
app.register_blueprint(mybrackets_bp)
app.register_blueprint(preferences_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(user_settings_bp)
app.register_blueprint(viewbracket_bp)
app.register_blueprint(context_processor_bp)

# with app.app_context():
#     BaseModel.metadata.create_all(db.engine)
