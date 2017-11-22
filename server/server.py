from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import click

static_folder = '../dist'
template_folder = '../dist'

app = Flask(__name__, static_folder=static_folder, template_folder=template_folder)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dev.db'
db = SQLAlchemy(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def indexify(path):
    return render_template('index.html')

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

from server.views import stats
app.register_blueprint(stats.stats, url_prefix='/api/stats/')