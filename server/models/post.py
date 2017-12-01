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
    def serialize(self):
        return {
            'id': self.id,
            'date': self.date,
            'likes': [like.serialize for like in self.likes],
            'user': self.user.serialize,
            'content': self.content,
            'category': self.category.serialize,
            'outcome': self.outcome.serialize,
            'children': self.serialize_children(),
            'parent': self.serialize_parent()
        }
    

    def serialize_children(self):
        children_list = []
        for child in self.children:
            children_list.append({
                'id': child.id,
                'date': child.date,
                'likes': [like.serialize for like in child.likes],
                'user': child.user.serialize,
                'content': child.content,
                'category': child.category.serialize,
                'outcome': child.outcome.serialize,
                'children': child.serialize_children(),
                'parent': child.serialize_parent()
            })
        return children_list

    def serialize_parent(self):
        if not self.parent_id:
            return {}
        return {
            'id': self.parent_id,
            'date': self.parent.date,
            'likes': [like.serialize for like in self.parent.likes],
            'user': self.parent.user.serialize,
            'content': self.parent.content,
            'category': self.parent.category.serialize,
            'outcome': self.parent.outcome.serialize,
            'parent': self.parent.serialize_parent()
        }

    def create_post(data):
        post = Post()
        post.content = data['content']
        post.category_id = data['category']['id']
        post.outcome_id = data['outcome']['id']
        if 'parent' in data and data['parent']:
            post.parent_id = data['parent']['id']
        return post