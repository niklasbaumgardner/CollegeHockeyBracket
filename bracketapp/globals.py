import datetime
import os
import time

import redis
import valkey
from flask_login import current_user

BRACKET_CLOSE_TIME = datetime.datetime.strptime(
    "2026-03-26 18:00:00", "%Y-%m-%d %H:%M:%S"
).replace(tzinfo=datetime.UTC)

YEAR = int(os.environ.get("YEAR"))

current_time = datetime.datetime.now(datetime.UTC)

CAN_EDIT_BRACKET = os.environ.get("CAN_EDIT_BRACKET") == "True"


class Global:
    # redis_client = redis.Redis(
    #     host=os.environ.get("REDIS_HOST"),
    #     port=os.environ.get("REDIS_PORT"),
    #     password=os.environ.get("REDIS_PASSWORD"),
    #     decode_responses=True,  # Optional: automatically decode responses
    # )

    # valkey_client = client = valkey.Valkey(
    #     host=os.environ.get("VALKEY_HOST"),
    #     port=os.environ.get("VALKEY_PORT"),
    #     password=os.environ.get("VALKEY_PASSWORD"),
    #     decode_responses=True,
    # )

    keydb_client = redis.Redis(
        host=os.environ.get("KEYDB_HOST"),
        port=os.environ.get("KEYDB_PORT"),
        password=os.environ.get("KEYDB_PASSWORD"),
        decode_responses=True,  # Optional: automatically decode responses
    )

    # dragonfly_client = redis.Redis(
    #     host=os.environ.get("DRAGONFLY_HOST"),
    #     port=os.environ.get("DRAGONFLY_PORT"),
    #     password=os.environ.get("DRAGONFLY_PASSWORD"),
    #     decode_responses=True,  # Optional: automatically decode responses
    # )

    # print(
    #     redis_client.ping(),
    #     valkey_client.ping(),
    #     keydb_client.ping(),
    #     dragonfly_client.ping(),
    # )

    # is_can_edit_set = dragonfly_client.get("CAN_EDIT_BRACKET")
    # is_year_set = dragonfly_client.get("YEAR")

    # if is_can_edit_set is None:
    #     dragonfly_client.set("CAN_EDIT_BRACKET", "True")

    # if is_year_set is None:
    #     dragonfly_client.set("YEAR", 2025)

    # BRACKET_CLOSE_TIME = datetime.datetime.strptime(
    #     "2026-03-26 18:00:00", "%Y-%m-%d %H:%M:%S"
    # ).replace(tzinfo=datetime.UTC)

    # YEAR = int(os.environ.get("YEAR"))

    # current_time = datetime.datetime.now(datetime.UTC)

    # CAN_EDIT_BRACKET = os.environ.get("CAN_EDIT_BRACKET") == "True"

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

    # @property
    # def l_CAN_EDIT_BRACKET(self):
    #     start_time = time.perf_counter()
    #     val = CAN_EDIT_BRACKET
    #     end_time = time.perf_counter()

    #     # print(f"Execution time: {end_time - start_time:.4f} seconds")
    #     return val, end_time - start_time

    # @property
    # def l_YEAR(self):
    #     start_time = time.perf_counter()
    #     val = YEAR
    #     end_time = time.perf_counter()

    #     # print(f"Execution time: {end_time - start_time:.4f} seconds")
    #     return val, end_time - start_time

    # @property
    # def r_CAN_EDIT_BRACKET(self):
    #     start_time = time.perf_counter()
    #     val = self.redis_client.get("CAN_EDIT_BRACKET") == "True"
    #     end_time = time.perf_counter()

    #     # print(f"Execution time: {end_time - start_time:.4f} seconds")
    #     return val, end_time - start_time

    # @property
    # def r_YEAR(self):
    #     start_time = time.perf_counter()
    #     val = int(self.redis_client.get("YEAR"))
    #     end_time = time.perf_counter()

    #     # print(f"Execution time: {end_time - start_time:.4f} seconds")
    #     return val, end_time - start_time

    # @property
    # def v_CAN_EDIT_BRACKET(self):
    #     start_time = time.perf_counter()
    #     val = self.valkey_client.get("CAN_EDIT_BRACKET") == "True"
    #     end_time = time.perf_counter()

    #     # print(f"Execution time: {end_time - start_time:.4f} seconds")
    #     return val, end_time - start_time

    # @property
    # def v_YEAR(self):
    #     start_time = time.perf_counter()
    #     val = int(self.valkey_client.get("YEAR"))
    #     end_time = time.perf_counter()

    #     # print(f"Execution time: {end_time - start_time:.4f} seconds")
    #     return val, end_time - start_time

    # @property
    # def k_CAN_EDIT_BRACKET(self):
    #     start_time = time.perf_counter()
    #     val = self.keydb_client.get("CAN_EDIT_BRACKET") == "True"
    #     end_time = time.perf_counter()

    #     # print(f"Execution time: {end_time - start_time:.4f} seconds")
    #     return val, end_time - start_time

    # @property
    # def k_YEAR(self):
    #     start_time = time.perf_counter()
    #     val = int(self.keydb_client.get("YEAR"))
    #     end_time = time.perf_counter()

    #     # print(f"Execution time: {end_time - start_time:.4f} seconds")
    #     return val, end_time - start_time

    # @property
    # def d_CAN_EDIT_BRACKET(self):
    #     start_time = time.perf_counter()
    #     val = self.dragonfly_client.get("CAN_EDIT_BRACKET") == "True"
    #     end_time = time.perf_counter()

    #     # print(f"Execution time: {end_time - start_time:.4f} seconds")
    #     return val, end_time - start_time

    # @property
    # def d_YEAR(self):
    #     start_time = time.perf_counter()
    #     val = int(self.dragonfly_client.get("YEAR"))
    #     end_time = time.perf_counter()

    #     # print(f"Execution time: {end_time - start_time:.4f} seconds")
    #     return val, end_time - start_time


g = Global()
# (
#     False
#     if current_time >= BRACKET_CLOSE_TIME
#     else os.environ.get("CAN_EDIT_BRACKET") == "True"
# )
