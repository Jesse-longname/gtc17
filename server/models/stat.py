from .. import db
from . import stat_group, user

class Stat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    eval_date = db.Column(db.DateTime, nullable=False)
    percent = db.Column(db.Float, nullable=False)
    stat_group_id = db.Column(db.Integer, ForeignKey('StatGroup.id'))
    user_id = db.Column(db.Integer, ForeignKey('User.id'))
    max_val = db.Column(db.Integer, nullable=False) # Needed?

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