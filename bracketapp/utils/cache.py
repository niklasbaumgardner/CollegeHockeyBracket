from datetime import datetime


TIMED_CACHE = {}


class Cache:
    def __init__(self):
        self.data = {}

    def get(self, key):
        print(f"cache hit on {key}")
        return self.data.get(key, None)

    def set(self, key, value):
        self.data[key] = value

    def has(self, key):
        return key in self.data

    def invalidate(self, keys):
        for key in keys:
            if key in self.data:
                del self.data[key]

    def invalidate_all(self):
        self.data.clear()


class TimedCache:
    valid_time = 3600 * 24  # 1 hour in seconds
    data = {}

    def get(self, key):
        result, set_time = self.data.get(key, (None, None))

        if set_time and self.is_time_still_valid(time=set_time):
            return result

        return None

    def set(self, key, value):
        now = datetime.now()

        self.data[key] = (value, now)

    def has(self, key):
        result, set_time = self.data.get(key, (None, None))

        return result and self.is_time_still_valid(time=set_time)

    def is_time_still_valid(self, time):
        now = datetime.now()

        return (now - time).total_seconds() < self.valid_time

    def invalidate(self):
        self.data.clear()


cache = Cache()
