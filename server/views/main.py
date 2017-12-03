import json
from flask import render_template, g, abort, Blueprint, redirect, request, jsonify
from flask_login import current_user, logout_user, login_user
from server.server import app, login_manager, db
from server import ldap
from ..models.user import User

main = Blueprint('main', __name__)

app.register_error_handler(500, lambda e: 'Error: \n' + jsonify(e))

def get_remote_user():
    return "DEVINTERNAL\\giftthecode"	
    if app.config['SERVER'] == 'Local':
        return "DEVINTERNAL\\giftthecode"
    return request.environ.get('REMOTE_USER')

def ldap_authorize(employee_id):
    print("FIX LDAP AUTHORIZE")
    # user = User.query.filter_by(employee_id=employee_id).first()
    # return user
    user_info = ldap.get_user_info(employee_id)
    if not user_info:
        return None
    user = User.query.filter_by(username=user_info['cn']).first()
    if not user:
        user = User()
    user = update_user_using_LDAP(user, user_info)
    return user

def update_user_using_LDAP(user, user_info):
    # user.employee_id = user_info['cn']
    user.first_name = user_info['givenName']
    if not user.first_name:
         user.first_name = 'Awesome'
    user.last_name = user_info['sn']
    if not user.last_name:
         user.last_name = 'Dev'
    user.email = user_info['mail']
    user.username = user_info['cn']
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
    user_info = ldap.get_user_info(id)
    if user_info == ['Account does not exist']:
        abort(403)
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