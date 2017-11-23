from flask import Flask, render_template, jsonify, url_for
from flask_sqlalchemy import SQLAlchemy
import click

static_folder = '../dist'
template_folder = '../dist'

app = Flask(__name__, static_folder=static_folder, template_folder=template_folder)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dev.db'
app.config['SERVER_NAME'] = 'localhost:4200'
db = SQLAlchemy(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def indexify(path):
    return render_template('index.html')

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
    click.echo("Loading data...")
    scripts.load_data(file_loc)
    click.echo("Finished loading data...")

@app.cli.command()
def create_stat_groups():
    click.echo("Creating Stat Groups")
    scripts.create_stat_groups()
    click.echo("Finished Creating Stat Groups")

@app.cli.command()
def create_db():
    click.echo('Creating db')
    scripts.create_db()
    click.echo('Finished Created db')

@app.cli.command()
def list_routes():
    import urllib
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

from server.views import stats
app.register_blueprint(stats.stats, url_prefix='/api/stats')