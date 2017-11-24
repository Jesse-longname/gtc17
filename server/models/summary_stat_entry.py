from server.server import db

class SummaryStatEntry(db.Model):
    __tablename__ = 'SummaryStatEntry'
    id = db.Column(db.Integer, primary_key=True)
    stat_id = db.Column(db.Integer, db.ForeignKey('SummaryStat.id'), nullable=False)
    key = db.Column(db.String(64), nullable=False)
    value = db.Column(db.String(64), nullable=False)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'stat_id': self.stat_id,
            'key': self.key,
            'value': self.value
        }