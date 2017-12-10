from flask import Flask, render_template, jsonify, url_for, redirect, request, send_file
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, current_user
from werkzeug.utils import secure_filename
import click

static_folder = '../dist'
template_folder = '../dist'
upload_folder = 'files' # This needs to be relative to the root directory, or from where run.py is. Not sure why
allowed_extensions = set(['png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__, static_folder=static_folder, template_folder=template_folder)
app.config.from_object('server.config.Config')
app.config['UPLOAD_FOLDER'] = upload_folder

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)

# Taken from the flask docs
def allowed_file(filename):
    return '.' in filename and \
            filename.rsplit('.', 1)[1].lower() in allowed_extensions

@app.route('/<path:path>')
def indexify(path):
    if allowed_file(path):
        return send_file('../' + path, mimetype='image/'+path.rsplit('.', 1)[1].lower())
    return redirect('/')

def gen_response(message, data, code=200, modal=False):
    return jsonify({
        'message': message,
        'data': data,
        'code': code,
        'modal': modal
    })

from server.scripts import scripts

@app.cli.command()
@click.argument('file_loc')
def load_data(file_loc):
    """ Loads the Quality Review Data from the given file """
    scripts.load_data(file_loc)

@app.cli.command()
def create_db():
    """ Create the database and some preliminary data """
    scripts.create_db()

@app.cli.command()
@click.argument('pre_call_file_loc')
@click.argument('pre_call_sheet_num')
@click.argument('post_call_file_loc')
@click.argument('post_call_sheet_num')
def load_summary_stats(
        pre_call_file_loc, pre_call_sheet_num, post_call_file_loc, post_call_sheet_num):
    """ Loads Summary Stats for the given sheets. Sheets should be call data """
    scripts.load_summary_stats(
        pre_call_file_loc,
        pre_call_sheet_num,
        post_call_file_loc,
        post_call_sheet_num)

@app.cli.command()
def list_routes():
    """ Lists the routes available """
    output = []
    for rule in app.url_map.iter_rules():

        options = {}
        for arg in rule.arguments:
            options[arg] = "[{0}]".format(arg)

        methods = ','.join(rule.methods)
        url = url_for(rule.endpoint, **options)
        line = "{:50s} {:20s} {}".format(rule.endpoint, methods, url)
        output.append(line)

    for line in sorted(output):
        print(line)

@app.cli.command()
def add_sample_data():
    scripts.add_sample_data()

from server.views import main, stats, posts, data, user
app.register_blueprint(main.main)
app.register_blueprint(stats.stats, url_prefix='/api/stats')
app.register_blueprint(posts.posts, url_prefix='/api/posts')
app.register_blueprint(data.data, url_prefix='/api/data')
app.register_blueprint(user.user, url_prefix='/api/user')