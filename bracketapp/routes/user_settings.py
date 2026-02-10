from flask import Blueprint, request
from flask_login import current_user
from bracketapp.queries import user_settings_queries
from bracketapp.utils import cache_invalidator


user_settings_bp = Blueprint("user_settings_bp", __name__)


@user_settings_bp.post("/update_settings")
def update_settings():
    if not current_user.is_authenticated:
        return {}

    settings_data = request.get_json()

    user_settings_queries.update_user_settings(**settings_data)

    cache_invalidator.update_user_settings()

    return {"success": True}
