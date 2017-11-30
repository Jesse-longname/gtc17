from server.server import db

class CallOutcome(db.Model):
    __tablename__ = 'CallOutcome'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), nullable=False)
    icon_name = db.Column(db.String(64), nullable=False)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'icon_name': self.icon_name
        }