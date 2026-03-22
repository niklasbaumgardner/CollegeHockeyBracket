import os
from datetime import datetime
from zoneinfo import ZoneInfo

from flask_login import current_user

from bracketapp.config import Config
from bracketapp.NBCacheClient import create_cache

tz = ZoneInfo("America/New_York")


BRACKET_OPEN_TIME = datetime(2026, 3, 22, 16, 0, tzinfo=tz)
BRACKET_CLOSE_TIME = datetime(2026, 3, 26, 13, 30, tzinfo=tz)


YEAR = int(os.environ.get("YEAR"))


CAN_EDIT_BRACKET = os.environ.get("CAN_EDIT_BRACKET") == "True"


class Global:
    client = create_cache("simple_valkey", Config)

    global_keys = ["CAN_EDIT_BRACKET", "YEAR"]

    def get_all_contents(self):
        return {k: self.client.get(k) for k in self.global_keys} | {
            "keys": self.get_all_keys()
        }

    def get_all_keys(self):
        return self.client.keys("*")

    def can_edit_by_time(self):
        if Config.FLASK_DEBUG:
            return CAN_EDIT_BRACKET

        return BRACKET_OPEN_TIME < datetime.now(tz) < BRACKET_CLOSE_TIME

    @property
    def CAN_EDIT_BRACKET(self):
        try:
            can_edit = self.client.get("CAN_EDIT_BRACKET")
        except:
            can_edit = None

        if can_edit is None:
            return self.can_edit_by_time()

        return can_edit

    @property
    def YEAR(self):
        try:
            year = self.client.get("YEAR")
        except:
            year = None

        if year is None:
            return YEAR

        return year

    @CAN_EDIT_BRACKET.setter
    def CAN_EDIT_BRACKET(self, can_edit):
        if not current_user.is_admin():
            return

        self.client.set("CAN_EDIT_BRACKET", can_edit)

    @YEAR.setter
    def YEAR(self, year):
        if not current_user.is_admin():
            return

        return self.client.set("YEAR", year)


g = Global()
