from flask import Blueprint
from server.server import gen_response, db
from server.models.call_outcome import CallOutcome
from server.models.post_category import PostCategory

data = Blueprint('data', __name__)

@data.route('/outcomes')
def get_outcomes():
    query = CallOutcome.query.all()
    outcomes = [outcome.serialize for outcome in query]
    return gen_response('Retrievevd Outcomes', outcomes)

@data.route('/categories')
def get_categories():
    query = PostCategory.query.all()
    categories = [category.serialize for category in query]
    return gen_response('Retrieved Categories', categories)