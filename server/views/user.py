from flask import Blueprint, jsonify, request
from flask_login import current_user
from server.server import gen_response
from server.server import db, allowed_file, app
from werkzeug.utils import secure_filename
import os

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

@user.route('/edit_image', methods=['POST'])
def upload_file():
    if 'avatar' not in request.files:
        return gen_response('No file part', request.data, 400, True)
    file = request.files['avatar']
    # if user does not select a file, browser also
    # submits a empty part without filename
    if file.filename == '':
        return gen_response('No selected file', request.data, 400, True)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        current_user.image_url = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        db.session.add(current_user)
        db.session.commit()
        return gen_response('Successfully edited image', current_user.serialize)
    return gen_response('Something went wrong :(', request.data, 400, True)

    