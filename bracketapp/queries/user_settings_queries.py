from bracketapp.models import UserSettings
from flask_login import current_user
from bracketapp import db, cache
from sqlalchemy import select, cast
from sqlalchemy.dialects.postgresql import insert as pg_insert
from sqlalchemy.dialects.postgresql import JSONB
from bracketapp.utils.constants import user_settings_cache_key


##
## UserSettings queries
##


VALID_USER_SETTINGS_ARGS = set(
    [
        "theme",
        "mode",
        "primary_color",
        "background_color",
        "color_contrast",
        "color_palette",
        "rounding",
        "spacing",
        "border_width",
    ]
)
ARGS_ALLOW_NULL = set(
    [
        "primary_color",
        "background_color",
        "color_contrast",
        "color_palette",
        "rounding",
        "spacing",
        "border_width",
    ]
)

VALID_THEMES = set(
    [
        "default",
        "awesome",
        "shoelace",
        "active",
        "brutalist",
        "glossy",
        "matter",
        "mellow",
        "playful",
        "premium",
        "tailspin",
    ]
)

VALID_THEME_MODES = set({"light", "dark"})

VALID_PRIMARY_COLORS = set(
    [
        "red",
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
        "slate",
        "gray",
        "zinc",
        "neutral",
        "stone",
    ]
)

VALID_BACKGROUND_COLORS = set(
    [
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
    ]
)

VALID_COLOR_PALETTES = set(
    [
        "default",
        "bright",
        "shoelace",
        "rudimentary",
        "elegant",
        "mild",
        "natural",
        "anodized",
        "vogue",
    ]
)

VALID_ROUNDING_VALUES = set([r / 10 for r in range(41)])

VALID_SPACING_VALUES = set([r / 80 for r in range(40, 161)])

VALID_BORDER_WIDTHS = set([r / 2 for r in range(1, 9)])


def is_valid_user_setting_arg(arg, val):
    if arg in VALID_USER_SETTINGS_ARGS:
        if val is None:
            return arg in ARGS_ALLOW_NULL
        return True

    return False


def get_user_settings():
    cache_key = user_settings_cache_key(current_user.id)
    if result := cache.get(cache_key):
        return result

    settings = db.session.scalars(
        select(UserSettings).where(UserSettings.user_id == current_user.id).limit(1)
    ).first()

    settings_dict = None
    if settings:
        settings_dict = settings.to_dict()
        cache.set(cache_key, settings_dict)

    return settings_dict


def update_user_settings(**kwargs):
    settings_data = {"theme": "shoelace"}
    for arg, val in kwargs.items():
        if is_valid_user_setting_arg(arg, val):
            settings_data[arg] = val

    values = [
        {
            "user_id": current_user.id,
            "settings": cast(settings_data, JSONB),
        }
    ]

    stmt = pg_insert(UserSettings).values(values)
    upsert_stmt = stmt.on_conflict_do_update(
        constraint="user_settings_user_id_unique",
        set_={
            "settings": UserSettings.settings + stmt.excluded.settings,
        },
    )
    db.session.execute(upsert_stmt)
    db.session.commit()


def validate_arg(arg, value):
    match arg:
        case "theme":
            return validate_theme(value)
        case "mode":
            return validate_mode(value)
        case "primary_color":
            return validate_primary_color(value)
        case "background_color":
            return validate_background_color(value)
        case "color_palette":
            return validate_color_palette(value)
        case "rounding":
            return validate_rounding(value)
        case "spacing":
            return validate_spacing(value)
        case "border_width":
            return validate_border_width(value)

    return False


def validate_theme(theme):
    return theme in VALID_THEMES


def validate_mode(mode):
    return mode in VALID_THEME_MODES


def validate_primary_color(primary_color):
    return primary_color in VALID_PRIMARY_COLORS


def validate_background_color(background_color):
    return background_color in VALID_BACKGROUND_COLORS


def validate_color_palette(color_palette):
    return color_palette in VALID_COLOR_PALETTES


def validate_rounding(rounding):
    return rounding in VALID_ROUNDING_VALUES


def validate_spacing(spacing):
    return spacing in VALID_SPACING_VALUES


def validate_border_width(border_width):
    return border_width in VALID_BORDER_WIDTHS
