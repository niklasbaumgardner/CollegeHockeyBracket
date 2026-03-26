import sentry_sdk
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_mail import Mail
from flask_sqlalchemy_lite import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.pool import NullPool
from werkzeug.middleware.proxy_fix import ProxyFix

from bracketapp.config import Config
from bracketapp.NBCacheClient import create_cache


class BaseModel(DeclarativeBase):
    pass


app = Flask(__name__)

app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)

sentry_sdk.init(
    dsn=Config.SENTRY_DSN,
    traces_sample_rate=1.0,
    send_default_pii=True,
    release="nbbracketchallenge@3.0.29",
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


cache = create_cache("pymemcache", Config)


# ruff: noqa: E402
from bracketapp.routes.admin import admin_bp
from bracketapp.routes.archive import archive_bp
from bracketapp.routes.auth import auth_bp
from bracketapp.routes.createbracket import createbracket_bp
from bracketapp.routes.deletebracket import deletebracket_bp
from bracketapp.routes.editbracket import editbracket_bp
from bracketapp.routes.groups import groups_bp
from bracketapp.routes.health import health_bp
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
app.register_blueprint(health_bp)
app.register_blueprint(leaderboard_bp)
app.register_blueprint(mybrackets_bp)
app.register_blueprint(preferences_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(user_settings_bp)
app.register_blueprint(viewbracket_bp)
app.register_blueprint(context_processor_bp)


# with app.app_context():
#     BaseModel.metadata.create_all(db.engine)
