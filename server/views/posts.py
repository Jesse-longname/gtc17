from flask import Blueprint, jsonify, request
from server.server import gen_response, db
from server.models.post import Post
from server.models.like import Like
from server.models.user import User
from sqlalchemy import desc

posts = Blueprint('posts', __name__)

@posts.route('/', methods=['GET'])
def get_all_posts():
    query = Post.query.filter_by(parent_id=None).order_by(desc(Post.date)).all()
    post_list = [post.serialize for post in query]
    return gen_response('Retrieved Posts', post_list)

@posts.route('/', methods=['POST'])
def add_post():
    post = Post.create_post(request.get_json(force=True))
    if post is None:
        return gen_response('Invalid data', request.data, 400, True)
    
    # Replace with user stuff
    post.user_id = 1

    db.session.add(post)
    db.session.commit()
    return gen_response('Added post', post.serialize)

@posts.route('/<int:id>', methods=['POST'])
def update_post(id):
    forbidden_keys = ['id', 'user_id', 'user']

    data = request.get_json(force=True)
    post = Post.query.filter_by(id=id).first()
    if not post:
        return gen_response('Invalid Post id', data, 400, True)

    updates = []
    for key in data.keys():
        if key not in forbidden_keys and key in getattr(post):
            setattr(post, key, data[key])
            updates.append((key, data[key]))
    if len(updates) == 0:
        return gen_response('No valid attributes to change', data, 400, True)
    db.session.add(post)
    db.session.commit(post)
    return gen_response('Updated Post', updates)

@posts.route('/like/<int:id>', methods=['GET'])
def like_post(id):
    post = Post.query.filter_by(id=id).first()
    if not post:
        return gen_response('Invalid Post id', data, 400, True)

    return gen_response('Method not implemented', id)
