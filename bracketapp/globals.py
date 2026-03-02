import datetime
import os

BRACKET_CLOSE_TIME = datetime.datetime.strptime(
    "2026-03-26 18:00:00", "%Y-%m-%d %H:%M:%S"
).replace(tzinfo=datetime.UTC)

YEAR = int(os.environ.get("YEAR"))

current_time = datetime.datetime.now(datetime.UTC)

CAN_EDIT_BRACKET = os.environ.get("CAN_EDIT_BRACKET") == "True"


class Global:
    BRACKET_CLOSE_TIME = datetime.datetime.strptime(
        "2026-03-26 18:00:00", "%Y-%m-%d %H:%M:%S"
    ).replace(tzinfo=datetime.UTC)

    YEAR = int(os.environ.get("YEAR"))

    current_time = datetime.datetime.now(datetime.UTC)

    CAN_EDIT_BRACKET = os.environ.get("CAN_EDIT_BRACKET") == "True"


g = Global()
# (
#     False
#     if current_time >= BRACKET_CLOSE_TIME
#     else os.environ.get("CAN_EDIT_BRACKET") == "True"
# )
