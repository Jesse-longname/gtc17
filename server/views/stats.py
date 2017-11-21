from flask import Blueprint, jsonify
from server.models import stat_group, stat

stats = Blueprint('stats', __name__)

@stats.route('/')
def get_all_stats():
    return jsonify('yo')