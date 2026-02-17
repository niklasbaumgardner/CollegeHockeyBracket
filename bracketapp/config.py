import os


class Config:
    APP_NAME = "NB Bracket Challenge"
    SECRET_KEY = os.environ.get("SECRET_KEY")
    SQLALCHEMY_ENGINES = {"default": os.environ.get("SQLALCHEMY_DATABASE_URI")}
    MAIL_SERVER = "smtp.gmail.com"
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get("EMAIL_USER")
    MAIL_PASSWORD = os.environ.get("EMAIL_PASS")
    MAIL_DEFAULT_SENDER = (APP_NAME, "hockey@niklasb.com")
    ERROR_LOGGING_EMAIL = os.environ.get("ERROR_LOGGING_EMAIL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    REMEMBER_COOKIE_NAME = os.environ.get("REMEMBER_COOKIE_NAME")
    REMEMBER_COOKIE_DOMAIN = os.environ.get("COOKIE_DOMAIN")
    SESSION_COOKIE_NAME = os.environ.get("SESSION_COOKIE_NAME")
    SESSION_COOKIE_DOMAIN = os.environ.get("COOKIE_DOMAIN")
    SENTRY_DSN = os.environ.get("SENTRY_DSN")
    FLASK_DEBUG = os.environ.get("FLASK_DEBUG")
    CACHE_MEMCACHED_SERVER = os.environ.get("CACHE_MEMCACHED_SERVER")


YEAR = int(os.environ.get("YEAR"))
CAN_EDIT_BRACKET = os.environ.get("CAN_EDIT_BRACKET") == "True"
