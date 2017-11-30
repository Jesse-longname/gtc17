from server.server import db
from . import user
import datetime

class Like(db.Model):
    __tablename__ = 'Like'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, default=datetime.datetime.utcnow(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('Post.id'), nullable=False)

    user = db.relationship('User')

    @property
    def serialize(self):
        return {
            'id': self.id,
            'date': self.date,
            'user': self.user.serialize,
            'post_id': self.post_id
        }

    def create_like(data):
        like = Like()
        like.post_id = data['post_id']
        like.user_id = data['user']['id']
        return like
