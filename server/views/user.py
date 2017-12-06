from flask import Blueprint, jsonify, request
from flask_login import current_user
from server.server import gen_response
from server.server import db

user = Blueprint('user', __name__)

@user.route('/')
def get_current_user():
    return gen_response('Here is you', current_user.serialize)

@user.route('/', methods=['POST'])
def edit_user():
    data = request.get_json(force=True)
    if data['id'] != current_user.id:
        return gen_response('Hey, you can\'t edit someone that isn\'t you!', data, 401, True)
    for key in set(data.keys()).intersection(set(current_user.get_editable)):
        setattr(current_user, key, data[key])
    db.session.add(current_user)
    db.session.commit()
    return gen_response('Successfully edited profile!', current_user.serialize)

    