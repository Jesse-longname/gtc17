from server.server import db
from . import user, post_category, call_outcome, like
import datetime

class Post(db.Model):
    __tablename__ = 'Post'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, default=datetime.datetime.utcnow, nullable=False)

    content = db.Column(db.Text, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('PostCategory.id'), nullable=False)
    outcome_id = db.Column(db.Integer, db.ForeignKey('CallOutcome.id'), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('Post.id'))

    user = db.relationship('User')
    category = db.relationship('PostCategory')
    outcome = db.relationship('CallOutcome')
    children = db.relationship('Post', backref=db.backref('parent', remote_side=[id]))
    likes = db.relationship('Like')

    @property
    def serialize(self, expand=True):
        return {
            'id': self.id,
            'date': self.date,
            'likes': [like.serialize for like in self.likes],
            'user': self.user.serialize,
            'content': self.content,
            'category': self.category.serialize,
            'outcome': self.outcome.serialize,
            'children': [child.serialize for child in self.children] if expand else {},
            'parent': self.parent.serialize(expand=False) if self.parent_id is not None else {}
        }

    def create_post(data):
        post = Post()
        post.content = data['content']
        post.category_id = data['category']['id']
        post.outcome_id = data['outcome']['id']
        if 'parent' in data and data['parent']:
            post.parent_id = data['parent']['id']
        return post