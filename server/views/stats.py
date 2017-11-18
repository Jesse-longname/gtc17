from flask import Blueprint, jsonify

stats = Blueprint('stats', __name__)

@stats.route('/')
def get_all_stats():
    return jsonify('yo')