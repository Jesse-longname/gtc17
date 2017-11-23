from server.server import db
from . import user, stat_group

class Stat(db.Model):
    __tablename__ = 'Stat'
    id = db.Column(db.Integer, primary_key=True)
    eval_date = db.Column(db.DateTime, nullable=False)
    percent = db.Column(db.Float, nullable=False)
    max_val = db.Column(db.Integer, nullable=False)

    stat_group_id = db.Column(db.Integer, db.ForeignKey('StatGroup.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'))

    stat_group = db.relationship('StatGroup')
    user = db.relationship('User')

    @property
    def serialize(self):
        return {
            'id': self.id,
            'eval_date': self.eval_date,
            'percent': self.percent,
            'max_val': self.max_val,
            'stat_group': self.stat_group.serialize if self.stat_group is not None else {},
            'user': self.user.serialize if self.user is not None else {}
        }