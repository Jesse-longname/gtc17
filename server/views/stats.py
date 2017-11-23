from flask import Blueprint, jsonify
from server.server import gen_response
from server.models.user import User
from server.models.stat import Stat
from server.models.stat_group import StatGroup

stats = Blueprint('stats', __name__)

@stats.route('/')
def get_all_stats():
    query = Stat.query.all()
    stat_list = [stat.serialize for stat in query]
    return gen_response('Retrieved Stats', stat_list)

@stats.route('/<string:username>')
def get_user_stats(username=""):
    query = Stat.query.join(User).filter(User.username == username).all()
    if not query:
        return gen_response('No results for User: ' + username, username, 400, True)
    stat_list = [stat.serialize for stat in query]
    print(stat_list)
    return gen_response('Retrieved User Stats for ' + username, stat_list)


