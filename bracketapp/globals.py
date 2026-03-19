import datetime
import os
import time

import redis

BRACKET_CLOSE_TIME = datetime.datetime.strptime(
    "2026-03-26 18:00:00", "%Y-%m-%d %H:%M:%S"
).replace(tzinfo=datetime.UTC)

YEAR = int(os.environ.get("YEAR"))

current_time = datetime.datetime.now(datetime.UTC)

CAN_EDIT_BRACKET = os.environ.get("CAN_EDIT_BRACKET") == "True"


class Global:
    remote_client = redis.Redis(
        host=os.environ.get("REDIS_HOST"),
        port=os.environ.get("REDIS_PORT"),
        password=os.environ.get("REDIS_PASSWORD"),
        decode_responses=True,  # Optional: automatically decode responses
    )

    # BRACKET_CLOSE_TIME = datetime.datetime.strptime(
    #     "2026-03-26 18:00:00", "%Y-%m-%d %H:%M:%S"
    # ).replace(tzinfo=datetime.UTC)

    # YEAR = int(os.environ.get("YEAR"))

    # current_time = datetime.datetime.now(datetime.UTC)

    # CAN_EDIT_BRACKET = os.environ.get("CAN_EDIT_BRACKET") == "True"

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
    def r_CAN_EDIT_BRACKET(self):
        start_time = time.perf_counter()
        val = self.remote_client.get("CAN_EDIT_BRACKET") == "True"
        end_time = time.perf_counter()

        # print(f"Execution time: {end_time - start_time:.4f} seconds")
        return val, end_time - start_time

    @property
    def r_YEAR(self):
        start_time = time.perf_counter()
        val = int(self.remote_client.get("YEAR"))
        end_time = time.perf_counter()

        # print(f"Execution time: {end_time - start_time:.4f} seconds")
        return val, end_time - start_time


g = Global()
# (
#     False
#     if current_time >= BRACKET_CLOSE_TIME
#     else os.environ.get("CAN_EDIT_BRACKET") == "True"
# )
