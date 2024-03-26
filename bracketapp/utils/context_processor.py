from flask_login import current_user
from flask import Blueprint
from bracketapp.queries import theme_queries
from bracketapp.config import YEAR
import re

context_processor_bp = Blueprint("context_processor_bp", __name__)


@context_processor_bp.app_context_processor
def utility_processor():
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
                re.search("hsl\(\d+,\s*\d+%,\s*\d+%\)", theme.backgroundColor)
                if theme.backgroundColor
                else None
            ),
        )

    return dict(theme="", backgroundColor="", color="")


@context_processor_bp.app_context_processor
def utility_processor():
    return dict(current_year=YEAR)
