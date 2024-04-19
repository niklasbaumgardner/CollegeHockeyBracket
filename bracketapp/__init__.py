from flask import Flask
from flask_bcrypt import Bcrypt
from bracketapp.config import Config
from flask_migrate import Migrate
from flask_mail import Mail
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from apitally.flask import ApitallyMiddleware
import os


bcrypt = Bcrypt()
migrate = Migrate()
mail = Mail()
login_manager = LoginManager()
db = SQLAlchemy(
    engine_options=dict(
        pool_pre_ping=True,
        pool_size=10,
        max_overflow=20,
    )
)


app = Flask(__name__)

app.config.from_object(Config)

db.init_app(app)
bcrypt.init_app(app)
login_manager.init_app(app)
login_manager.login_view = "auth_bp.login"
login_manager.login_message_category = "alert-primary"
mail.init_app(app)

APITALLY_CLIENT_ID = os.environ.get("APITALLY_CLIENT_ID")
if APITALLY_CLIENT_ID:
    app.wsgi_app = ApitallyMiddleware(
        app,
        client_id=APITALLY_CLIENT_ID,
        env=os.environ.get("APITALLY_ENVIRONMENT"),
    )

from bracketapp.routes.admin import admin_bp
from bracketapp.routes.archive import archive_bp
from bracketapp.routes.auth import auth_bp
from bracketapp.routes.editbracket import editbracket_bp
from bracketapp.routes.index import index_bp
from bracketapp.routes.preferences import preferences_bp
from bracketapp.routes.profile import profile_bp
from bracketapp.routes.theme import theme_bp
from bracketapp.routes.viewbracket import viewbracket_bp
from bracketapp.utils.context_processor import context_processor_bp

app.register_blueprint(admin_bp)
app.register_blueprint(archive_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(editbracket_bp)
app.register_blueprint(index_bp)
app.register_blueprint(preferences_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(theme_bp)
app.register_blueprint(viewbracket_bp)
app.register_blueprint(context_processor_bp)

with app.app_context():
    db.create_all()

migrate.init_app(app, db)

from bracketapp.utils.jinja_filters import add_filters

add_filters()
