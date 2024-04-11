from flask_login import current_user
from flask import Blueprint
from bracketapp.queries import theme_queries, user_queries
from bracketapp.config import YEAR
import re
import stream_chat
import os
import json

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
                re.search(
                    "hsla\(\d+,\s?\d+%,\s?\d+%\,\s?\d{1}\.\d+\)", theme.backgroundColor
                )
                if theme.backgroundColor
                else None
            ),
        )

    return dict(theme="", backgroundColor="", color="")


@context_processor_bp.app_context_processor
def utility_processor():
    return dict(current_year=YEAR)


@context_processor_bp.app_context_processor
def utility_processor():
    if not current_user.is_authenticated:
        return dict(chat_user="[]")

    server_client = stream_chat.StreamChat(
        api_key=os.environ.get("STREAM_CHAT_API_KEY"),
        api_secret=os.environ.get("STREAM_CHAT_SECRET_KEY"),
    )

    token = server_client.create_token(f"{current_user.id}")
    chat_user = dict(id=current_user.id, name=current_user.username, token=token)

    return dict(chat_user=json.dumps(chat_user))
