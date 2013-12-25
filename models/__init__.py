from flask.ext.mongokit import MongoKit

from .books import Book


db = MongoKit()
db.register([Book])

