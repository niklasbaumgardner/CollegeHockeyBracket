from datetime import datetime


class Cache:
    def __init__(self):
        self.data = {}

    def get(self, key):
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
    def __init__(self):
        self.data = {}

    def get(self, key):
        value, expires = self.data.get(key, (None, None))

        if value and self.is_time_still_valid(expires):
            return value

        return None

    def set(self, key, value, valid_time=3600 * 24):
        expires = datetime.now().timestamp() + valid_time

        self.data[key] = (value, expires)

    def has(self, key):
        value, expires = self.data.get(key, (None, None))

        return value and self.is_time_still_valid(expires)

    def is_time_still_valid(self, expires):
        now = datetime.now().timestamp()

        return now < expires

    def invalidate(self, keys):
        for key in keys:
            if key in self.data:
                del self.data[key]

    def invalidate_all(self):
        self.data.clear()


cache = Cache()

timed_cache = TimedCache()
