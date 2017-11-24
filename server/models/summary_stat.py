from server.server import db

class SummaryStat(db.Model):
    __tablename__ = 'SummaryStat'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    entries = db.relationship('SummaryStatEntry', lazy=False)


    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'entries': [entry.serialize for entry in self.entries] if self.entries is not None else {}
        }