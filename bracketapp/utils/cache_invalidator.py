from bracketapp import cache, app
from bracketapp.utils.constants import (
    ARCHIVE_YEARS_CACHE_KEY,
    LEADERBOARD_CACHE_KEY,
    my_brackets_cache_key,
    group_cache_key,
    bracket_cache_key,
    correct_bracket_cache_key,
    default_bracket_cache_key,
    user_cache_key,
    user_settings_cache_key,
    archive_year_cache_key,
    my_bracket_count_cahce_key,
)
from flask_login import current_user
from bracketapp.queries import bracket_queries, group_queries, user_queries
from bracketapp.config import YEAR
from threading import Thread


def new_bracket(group_id=None):
    cache_keys = [
        LEADERBOARD_CACHE_KEY,
        my_brackets_cache_key(current_user.id),
        my_bracket_count_cahce_key(current_user.id),
    ]

    if group_id:
        cache_keys += [group_cache_key(group_id)]

    cache.delete_many(cache_keys)


def edit_bracket(bracket_id, name_changed):
    cache_keys = [
        my_brackets_cache_key(current_user.id),
        bracket_cache_key(bracket_id),
    ]
    if name_changed:
        cache_keys += [
            LEADERBOARD_CACHE_KEY,
            *[
                group_cache_key(g_id)
                for g_id in group_queries.get_my_group_ids_for_bracket_id(bracket_id)
            ],
        ]

    cache.delete_many(cache_keys)


def delete_bracket(bracket_id):
    cache_keys = [
        my_brackets_cache_key(current_user.id),
        my_bracket_count_cahce_key(current_user.id),
        bracket_cache_key(bracket_id),
        LEADERBOARD_CACHE_KEY,
        *[
            group_cache_key(g_id)
            for g_id in group_queries.get_my_group_ids_for_bracket_id(bracket_id)
        ],
    ]

    cache.delete_many(cache_keys)


def correct_bracket():
    cache.delete_many(
        [correct_bracket_cache_key(YEAR, True), correct_bracket_cache_key(YEAR, False)]
    )


def default_bracket():
    cache.delete(default_bracket_cache_key(YEAR))


def new_group():
    cache.delete(my_brackets_cache_key(current_user.id))


def edit_group(group_id, name_changed):
    cache_keys = [
        group_cache_key(group_id),
    ]

    if name_changed:
        cache_keys += [
            *[my_brackets_cache_key(u_id) for u_id in user_queries.get_all_user_ids()],
            *[
                bracket_cache_key(bracket_id)
                for bracket_id in bracket_queries.get_bracket_ids_for_group(group_id)
            ],
        ]

    cache.delete_many(cache_keys)


def join_group(group_id):
    cache_keys = [
        # TODO: Everyones my_brackets_cache_key?
        # Only if group size matters on my_brackets#groups
        # Leaning towards not updating because it's minor and likely to be invalidated somewhere else
        my_brackets_cache_key(current_user.id),
        group_cache_key(group_id),
    ]
    cache.delete_many(cache_keys)


def delete_group(group_id):
    cache_keys = [
        group_cache_key(group_id),
        # TODO: Everyones my_brackets_cache_key?
        *[my_brackets_cache_key(u_id) for u_id in user_queries.get_all_user_ids()],
        *[
            bracket_cache_key(bracket_id)
            for bracket_id in bracket_queries.get_bracket_ids_for_group(group_id)
        ],
    ]

    cache.delete_many(cache_keys)


def new_group_bracket(group_id, bracket_id):
    cache.delete_many(
        [
            my_brackets_cache_key(current_user.id),
            group_cache_key(group_id),
            bracket_cache_key(bracket_id),
        ]
    )


def delete_group_bracket(group_id, bracket_id):
    cache.delete_many(
        [
            my_brackets_cache_key(current_user.id),
            group_cache_key(group_id),
            bracket_cache_key(bracket_id),
        ]
    )


def update_points(bracket_ids, group_ids):
    cache.delete_many(
        [
            LEADERBOARD_CACHE_KEY,
            # TODO: Everyones my_brackets_cache_key?
            *[my_brackets_cache_key(u_id) for u_id in user_queries.get_all_user_ids()],
            *[bracket_cache_key(b_id) for b_id in bracket_ids],
            *[group_cache_key(g_id) for g_id in group_ids],
        ]
    )
    # Thread(target=update_points_async, args=(app, bracket_ids, group_ids)).start()


def update_points_async(a_app, bracket_ids, group_ids):
    with a_app.app_context():
        cache.delete_many(
            [
                LEADERBOARD_CACHE_KEY,
                # TODO: Everyones my_brackets_cache_key?
                *[
                    my_brackets_cache_key(u_id)
                    for u_id in user_queries.get_all_user_ids()
                ],
                *[bracket_cache_key(b_id) for b_id in bracket_ids],
                *[group_cache_key(g_id) for g_id in group_ids],
            ]
        )


def update_user():
    # TODO: Update archive, leaderboard, groups with user?
    # username is not show on bracket. so don't need to invalidate. same as ESPN
    # get group_ids where group_bracket
    # get year on brackets for archive

    cache.delete_many(
        [
            user_cache_key(current_user.id),
            LEADERBOARD_CACHE_KEY,
            *[group_cache_key(g_id) for g_id in group_queries.get_my_group_ids()],
            *[
                archive_year_cache_key(year)
                for year in bracket_queries.get_my_bracket_years()
            ],
        ]
    )


def logout_user():
    cache.delete(user_cache_key(current_user.id))


def update_user_settings():
    cache.delete(user_settings_cache_key(current_user.id))


def archive():
    cache.delete(ARCHIVE_YEARS_CACHE_KEY)
