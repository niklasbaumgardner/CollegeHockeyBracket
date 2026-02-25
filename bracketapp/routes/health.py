from flask import Blueprint

health_bp = Blueprint("health_bp", __name__)


@health_bp.route("/ok")
@health_bp.route("/up")
@health_bp.route("/health")
@health_bp.route("/healthy")
def healthy():
    return "OK", 200
