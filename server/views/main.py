import json
from flask import render_template, g, abort, Blueprint, redirect, request
from flask_login import current_user, logout_user, login_user
from server.server import app, login_manager, db
from server import ldap
from ..models.user import User

main = Blueprint('main', __name__)

def get_remote_user():
    if app.config['SERVER'] == 'Local':
        return app.config['USERNAME']
    print("request: " + request.environ.get('REMOTE_USER'))
    return request.environ.get('REMOTE_USER')

def ldap_authorize(employee_id):
    print("FIX LDAP AUTHORIZE")
    user = User.query.filter_by(employee_id=employee_id).first()
    return user
    user_info = ldap.get_user_info(employee_id)
    if not user_info:
        return None
    user = User.query.filter_by(employee_id=int(user_info['cn'])).first()
    if not user:
        user = User()
    user = update_user_using_LDAP(user, user_info)
    return user

def update_user_using_LDAP(user, user_info):
    user.employee_id = user_info['cn']
    user.first = user_info['givenName']
    user.last = user_info['sn']
    user.email = user_info['mail']
    save_user(user)
    return user

def save_user(user):
    db.session.add(user)
    db.session.commit()
    
@main.route('/')
def index():
    try:
        user = json.dumps(current_user.serialize)
        return render_template('index.html')
    except AttributeError:
        return redirect('/login')

@main.route('/login', methods=['GET', 'POST'])
def login():
    domain, id = get_remote_user().split('\\')
    referrer = request.referrer if request.referrer is not None else '/'
    if current_user.is_authenticated:
        return redirect(referrer)
    user = ldap_authorize(id)
    if user:
        user.authenticated = True
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return redirect(referrer)
    abort(403)

@main.before_request
def before_request():
    print('hi')
    if current_user.is_authenticated:
        print('hello')
        g.user = current_user

@login_manager.unauthorized_handler
def unauthorized():
    print('hello')
    return redirect('/')

@login_manager.user_loader
def load_user(user_id):
    return User.query.filter_by(id=1).first()
    # return User.query.filter_by(id=1).first()

@main.route('/logout', methods=['GET', 'POST'])
def logout():
    if current_user.is_authenticated:
        current_user.is_authenticated = False
        db.session.add(current_user)
        db.session.commit()
    logout_user()
    return 'Logged out!'