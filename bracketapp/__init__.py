from flask import Flask
from flask_bcrypt import Bcrypt
from bracketapp.config import Config
from flask_mail import Mail
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.pool import NullPool
from sqlalchemy.orm import DeclarativeBase
import os
import sentry_sdk
from werkzeug.middleware.proxy_fix import ProxyFix
from scout_apm.flask import ScoutApm
from scout_apm.flask.sqlalchemy import instrument_sqlalchemy


class Base(DeclarativeBase):
    pass


app = Flask(__name__)

app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)

if not os.environ.get("FLASK_DEBUG"):
    sentry_sdk.init(
        dsn=os.environ.get("SENTRY_DSN"),
        # Set traces_sample_rate to 1.0 to capture 100%
        # of transactions for tracing.
        traces_sample_rate=1.0,
        _experiments={
            # Set continuous_profiling_auto_start to True
            # to automatically start the profiler on when
            # possible.
            "continuous_profiling_auto_start": True,
        },
        release="nbbracketchallenge@2.0.47",
    )


app.config.from_object(Config)

db = SQLAlchemy(engine_options=dict(poolclass=NullPool, future=True), model_class=Base)
db.init_app(app)

bcrypt = Bcrypt()
bcrypt.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "auth_bp.login"
login_manager.login_message_category = "alert-primary"

mail = Mail()
mail.init_app(app)

ScoutApm(app)
instrument_sqlalchemy(db)


# ruff: noqa: E402
from bracketapp.routes.admin import admin_bp
from bracketapp.routes.archive import archive_bp
from bracketapp.routes.auth import auth_bp
from bracketapp.routes.deletebracket import deletebracket_bp
from bracketapp.routes.editbracket import editbracket_bp
from bracketapp.routes.groups import groups_bp
from bracketapp.routes.leaderboard import leaderboard_bp
from bracketapp.routes.mybrackets import mybrackets_bp
from bracketapp.routes.preferences import preferences_bp
from bracketapp.routes.profile import profile_bp
from bracketapp.routes.theme import theme_bp
from bracketapp.routes.viewbracket import viewbracket_bp
from bracketapp.utils.context_processor import context_processor_bp

app.register_blueprint(admin_bp)
app.register_blueprint(archive_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(deletebracket_bp)
app.register_blueprint(editbracket_bp)
app.register_blueprint(groups_bp)
app.register_blueprint(leaderboard_bp)
app.register_blueprint(mybrackets_bp)
app.register_blueprint(preferences_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(theme_bp)
app.register_blueprint(viewbracket_bp)
app.register_blueprint(context_processor_bp)

with app.app_context():
    db.create_all()
