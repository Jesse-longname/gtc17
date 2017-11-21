from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

static_folder = '../dist'
template_folder = '../dist'

app = Flask(__name__, static_folder=static_folder, template_folder=template_folder)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dev.db'
db = SQLAlchemy(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def indexify(path):
    return render_template('index.html')

from server.views import stats
app.register_blueprint(stats.stats, url_prefix='/api/stats/')