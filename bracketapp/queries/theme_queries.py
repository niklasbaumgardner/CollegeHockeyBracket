from bracketapp.models import Theme
from bracketapp import db
from flask_login import current_user
import re


##
## theme queries
##
def get_theme():
    return Theme.query.filter_by(user_id=current_user.id).first()


def set_theme(theme_color=None, background_color=None, color=None):
    if not current_user.is_authenticated:
        return

    if theme_color is not None and theme_color not in ("", "dark", "light"):
        return

    print(re.search("hsla\(\d+,\s?\d+%,\s?\d+%\,\s?\d{1}\.\d+\)", background_color))
    background_color_matches = (
        re.search("hsla\(\d+,\s?\d+%,\s?\d+%\,\s?\d{1}\.\d+\)", background_color)
        if background_color
        else None
    )
    if background_color_matches is not None or background_color in (
        "",
        "niks-favorite",
        "red",
        "gray",
        "orange",
        "amber",
        "yellow",
        "lime",
        "green",
        "emerald",
        "teal",
        "cyan",
        "sky",
        "blue",
        "indigo",
        "violet",
        "purple",
        "fuchsia",
        "pink",
        "rose",
    ):
        pass
    else:
        return

    if color is not None and color not in (
        "",
        "red",
        "gray",
        "orange",
        "amber",
        "yellow",
        "lime",
        "green",
        "emerald",
        "teal",
        "cyan",
        "sky",
        "blue",
        "indigo",
        "violet",
        "purple",
        "fuchsia",
        "pink",
        "rose",
    ):
        return

    theme = get_theme()

    if theme:
        if theme_color is not None:
            theme.theme = theme_color
        if background_color is not None:
            theme.backgroundColor = background_color
        if color is not None:
            theme.color = color
        db.session.commit()
    else:
        theme = Theme(
            user_id=current_user.id,
            theme=theme_color or "",
            backgroundColor=background_color or "",
            color=color or "",
        )
        db.session.add(theme)
        db.session.commit()

    return theme
