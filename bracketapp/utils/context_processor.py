from flask_login import current_user
from flask import Blueprint
from bracketapp.queries import bracket_queries, user_settings_queries
from bracketapp.config import YEAR, CAN_EDIT_BRACKET
import re

context_processor_bp = Blueprint("context_processor_bp", __name__)


@context_processor_bp.app_context_processor
def globals():
    user_settings = None
    my_bracket_count = 0

    if current_user.is_authenticated:
        user_settings = user_settings_queries.get_user_settings()
        my_bracket_count = bracket_queries.my_bracket_count()

    return dict(
        user_settings=user_settings.to_dict()
        if user_settings
        else {"settings": {"theme": "classic"}},
        MY_BRACKET_COUNT=my_bracket_count,
        CURRENT_YEAR=YEAR,
        CAN_EDIT_BRACKET=CAN_EDIT_BRACKET,
    )
