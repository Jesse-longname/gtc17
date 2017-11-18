from flask import Flask, render_template

static_folder = '../dist'
template_folder = '../dist'

app = Flask(__name__, static_folder=static_folder, template_folder=template_folder)

@app.route('/<path:path>')
def indexify(path):
    return render_template('index.html')