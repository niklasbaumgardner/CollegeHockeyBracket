from flask_login import current_user
from flask import Blueprint
from bracketapp.queries import bracket_queries, theme_queries
from bracketapp.config import YEAR, CAN_EDIT_BRACKET
import re

context_processor_bp = Blueprint("context_processor_bp", __name__)


@context_processor_bp.app_context_processor
def theme():
    def get_theme():
        if not current_user.is_authenticated:
            return None

        theme = theme_queries.get_theme()
        return theme

    theme = get_theme()

    if theme:
        return dict(
            theme=theme.theme,
            backgroundColor=theme.backgroundColor,
            color=theme.color,
            backgroundColorMatches=(
                re.search(
                    r"hsla\(\d+,\s?\d+%,\s?\d+%\,\s?\d{1}\.\d+\)", theme.backgroundColor
                )
                if theme.backgroundColor
                else None
            ),
        )

    return dict(theme="", backgroundColor="", color="")


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
