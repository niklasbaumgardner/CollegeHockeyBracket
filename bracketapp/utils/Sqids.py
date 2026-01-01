from sqids import Sqids as BaseSqids


class SqidsClass(BaseSqids):
    def encode_one(self, id):
        return self.encode([id])

    def decode_one(self, sqid):
        seq = self.decode(sqid)
        return seq[0]

    def decode_list(self, sqids):
        ret = []
        for sqid in sqids:
            ret.append(self.decode_one(sqid))

        return ret


sqids = SqidsClass(min_length=8)
