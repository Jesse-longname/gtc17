from .. import db

class StatGroup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name
        }