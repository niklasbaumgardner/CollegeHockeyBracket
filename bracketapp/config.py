import os


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.environ.get("SQLALCHEMY_DATABASE_URI")
    MAIL_SERVER = "smtp.gmail.com"
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get("EMAIL_USER")
    MAIL_PASSWORD = os.environ.get("EMAIL_PASS")
    MAIL_DEFAULT_SENDER = ("NB Bracket Challenge", "hockey@niklasb.com")
    SQLALCHEMY_TRACK_MODIFICATIONS = False


YEAR = int(os.environ.get("YEAR"))
CAN_EDIT_BRACKET = os.environ.get("CAN_EDIT_BRACKET") == "True"
