import os
import pickle
import time
from datetime import datetime
from zoneinfo import ZoneInfo

from flask_login import current_user
from redis import Redis

tz = ZoneInfo("America/New_York")


BRACKET_OPEN_TIME = datetime(2026, 3, 22, 16, 0, tzinfo=tz)
BRACKET_CLOSE_TIME = datetime(2026, 3, 26, 14, 0, tzinfo=tz)


YEAR = int(os.environ.get("YEAR"))


CAN_EDIT_BRACKET = os.environ.get("CAN_EDIT_BRACKET") == "True"


class RedisClient(Redis):
    def set(self, name, value):
        if value is None:
            self.delete(name)

        return super().set(name, pickle.dumps(value))

    def get(self, name):
        value = super().get(name)
        if value is None:
            return None
        return pickle.loads(value)

    def keys(self, name):
        keys = super().keys(name)

        return [k.decode("utf-8") for k in keys]


class Global:
    keydb_client = RedisClient(
        host=os.environ.get("KEYDB_HOST"),
        port=os.environ.get("KEYDB_PORT"),
        password=os.environ.get("KEYDB_PASSWORD"),
    )

    def get_all_contents(self):
        keys = self.keydb_client.keys("*")
        return {k: self.keydb_client.get(k) for k in keys}

    @property
    def CAN_EDIT_BRACKET(self):
        can_edit = self.keydb_client.get("CAN_EDIT_BRACKET")

        if can_edit is None:
            return CAN_EDIT_BRACKET

        return can_edit == "True"

    @property
    def YEAR(self):
        year = self.keydb_client.get("YEAR")
        if year is None:
            return YEAR

        return int(year)

    @CAN_EDIT_BRACKET.setter
    def CAN_EDIT_BRACKET(self, can_edit):
        if not current_user.is_admin():
            return

        self.keydb_client.set("CAN_EDIT_BRACKET", can_edit)

    @YEAR.setter
    def YEAR(self, year):
        if not current_user.is_admin():
            return

        return self.keydb_client.set("YEAR", year)

    @property
    def t_CAN_EDIT_BRACKET(self):
        start_time = time.perf_counter()
        val = BRACKET_OPEN_TIME < datetime.now(tz=tz) < BRACKET_CLOSE_TIME
        end_time = time.perf_counter()

        # print(f"Execution time: {end_time - start_time:.4f} seconds")
        return val, end_time - start_time

    @property
    def l_CAN_EDIT_BRACKET(self):
        start_time = time.perf_counter()
        val = CAN_EDIT_BRACKET
        end_time = time.perf_counter()

        # print(f"Execution time: {end_time - start_time:.4f} seconds")
        return val, end_time - start_time

    @property
    def l_YEAR(self):
        start_time = time.perf_counter()
        val = YEAR
        end_time = time.perf_counter()

        # print(f"Execution time: {end_time - start_time:.4f} seconds")
        return val, end_time - start_time

    @property
    def k_CAN_EDIT_BRACKET(self):
        start_time = time.perf_counter()
        val = self.keydb_client.get("CAN_EDIT_BRACKET") == "True"
        end_time = time.perf_counter()

        # print(f"Execution time: {end_time - start_time:.4f} seconds")
        return val, end_time - start_time

    @property
    def k_YEAR(self):
        start_time = time.perf_counter()
        val = int(self.keydb_client.get("YEAR"))
        end_time = time.perf_counter()

        # print(f"Execution time: {end_time - start_time:.4f} seconds")
        return val, end_time - start_time


g = Global()
