LEADERBOARD_CACHE_KEY = "api_leaderboard"
ARCHIVE_YEARS_CACHE_KEY = "archive"
ARCHIVE_BASE_CACHE_KEY = "api_archive"
GROUP_BASE_CACHE_KEY = "api_group"
MY_BRACKETS_BASE_CACHE_KEY = "my_brackets"
USER_BASE_CACHE_KEY = "user"
USER_SETTINGS_BASE_CACHE_KEY = "user_settings"
BRACKET_BASE_CACHE_KEY = "bracket"
CORRECT_BRACKET_BASE_CACHE_KEY = "correct_bracket"
DEFAULT_BRACKET_BASE_CACHE_KEY = "default_bracket"


def cache_key_generator(base_key, extra_key):
    return f"{base_key}_{extra_key}"


def archive_year_cache_key(year):
    return cache_key_generator(ARCHIVE_BASE_CACHE_KEY, year)


def my_brackets_cache_key(user_id):
    return cache_key_generator(MY_BRACKETS_BASE_CACHE_KEY, user_id)


def user_cache_key(user_id):
    return cache_key_generator(USER_BASE_CACHE_KEY, user_id)


def user_settings_cache_key(user_id):
    return cache_key_generator(USER_SETTINGS_BASE_CACHE_KEY, user_id)


def group_cache_key(group_id):
    return cache_key_generator(GROUP_BASE_CACHE_KEY, group_id)


def bracket_cache_key(bracket_id):
    return cache_key_generator(BRACKET_BASE_CACHE_KEY, bracket_id)


def correct_bracket_cache_key(year, include_games=False):
    base_cache_key = cache_key_generator(CORRECT_BRACKET_BASE_CACHE_KEY, year)
    if not include_games:
        return base_cache_key

    return cache_key_generator(base_cache_key, "with_games")


def default_bracket_cache_key(year):
    return cache_key_generator(DEFAULT_BRACKET_BASE_CACHE_KEY, year)
