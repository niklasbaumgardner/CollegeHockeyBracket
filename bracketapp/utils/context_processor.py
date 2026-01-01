from flask_login import current_user
from flask import Blueprint
from bracketapp.queries import bracket_queries, user_settings_queries
from bracketapp.config import YEAR, CAN_EDIT_BRACKET
import re

context_processor_bp = Blueprint("context_processor_bp", __name__)


@context_processor_bp.app_context_processor
def theme():
    def get_user_settings():
        if not current_user.is_authenticated:
            return None

        user_settings = user_settings_queries.get_user_settings()
        return user_settings

    user_settings = get_user_settings()
    if user_settings:
        return dict(user_settings=user_settings.to_dict())

    return dict(user_settings={"settings": {"theme": "classic"}})


@context_processor_bp.app_context_processor
def current_year():
    return dict(CURRENT_YEAR=YEAR)


@context_processor_bp.app_context_processor
def can_edit_bracket():
    return dict(CAN_EDIT_BRACKET=CAN_EDIT_BRACKET)


@context_processor_bp.app_context_processor
def my_bracket_count():
    my_bracket_count = bracket_queries.my_bracket_count()
    return dict(MY_BRACKET_COUNT=my_bracket_count)
