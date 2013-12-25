# A collection of utils that are used throught the app
from bson import json_util
import json
from flask import current_app


def mjsonify(object):
    '''
    we need this method because flask's jsonify cannot encode date objects. this
    is decoded using pymongo's decoder
    '''

    return current_app.response_class(
        json.dumps(object, default=json_util.default), 
        mimetype='application/json')
