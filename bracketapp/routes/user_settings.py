from flask import Blueprint, request
from flask_login import current_user
from bracketapp.queries import user_settings_queries
from bracketapp import cache
from bracketapp.utils.constants import user_settings_cache_key


user_settings_bp = Blueprint("user_settings_bp", __name__)


@user_settings_bp.post("/update_settings")
def update_settings():
    if not current_user.is_authenticated:
        return {}

    settings_data = request.get_json()

    user_settings_queries.update_user_settings(**settings_data)
    cache.delete(user_settings_cache_key(current_user.id))
    return {"success": True}
