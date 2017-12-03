from flask import Blueprint, jsonify, request
from flask_login import current_user
from server.server import gen_response

user = Blueprint('user', __name__)

@user.route('/')
def get_current_user():
    return gen_response('Here is you', current_user.serialize)