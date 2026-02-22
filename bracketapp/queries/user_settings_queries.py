from flask_login import current_user
from sqlalchemy import cast, select
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.dialects.postgresql import insert as pg_insert

from bracketapp import cache, db
from bracketapp.models import UserSettings
from bracketapp.utils.constants import user_settings_cache_key

##
## UserSettings queries
##


VALID_VARIANTS = set(["brand", "danger", "neutral", "success", "warning"])

VALID_USER_SETTINGS_ARGS = (
    set(
        [
            "theme",
            "mode",
            "background_color",
            "color_contrast",
            "color_palette",
            "rounding",
        ]
    )
    | VALID_VARIANTS
)
ARGS_ALLOW_NULL = (
    set(
        [
            "background_color",
            "color_contrast",
            "color_palette",
            "rounding",
        ]
    )
    | VALID_VARIANTS
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


NUMBERS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

COLORS = [
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
    "taupe",
    "mauve",
    "mist",
    "olive",
]


VALID_BACKGROUND_COLORS = set(
    [
        "niks-favorite",
    ]
    + [f"--color-{color}-{number}" for color in COLORS for number in NUMBERS]
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


def is_valid_user_setting_arg(arg, val):
    if arg in VALID_USER_SETTINGS_ARGS:
        if val is None:
            return arg in ARGS_ALLOW_NULL
        return validate_arg(arg, val)

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
        case "background_color":
            return validate_background_color(value)
        case "color_palette":
            return validate_color_palette(value)
        case "rounding":
            return validate_rounding(value)

    if arg in VALID_VARIANTS:
        return validate_variant_color(value)

    return False


def validate_theme(theme):
    return theme in VALID_THEMES


def validate_mode(mode):
    return mode in VALID_THEME_MODES


def validate_variant_color(variant_color):
    return variant_color in COLORS


def validate_background_color(background_color):
    return background_color in VALID_BACKGROUND_COLORS


def validate_color_palette(color_palette):
    return color_palette in VALID_COLOR_PALETTES


def validate_rounding(rounding):
    return rounding in VALID_ROUNDING_VALUES
