from flask import Blueprint, render_template

from models import db

booksbp = Blueprint('books',
                    __name__,
                    template_folder='templates',
                    static_folder='static')


@booksbp.route('/')
def home():
    for book in db.Book.find():
        print book
    return render_template('singlepage.html')


'''
 In the first cut of this app I will use flask's class based views to serve
the rest api.
'''

from flask import abort, jsonify
from flask.views import MethodView
from bson.objectid import ObjectId

from lib import mjsonify


class BooksApi(MethodView):
    '''
    serve up json rest api for books
    '''

    def get(self, book_id):
        
        if book_id:
            # look up book by id and return
            try:
                book = db.Book.find_one_or_404(ObjectId(book_id))
                return mjsonify(book)
            except:
                raise InvalidUsage('book not found', payload={'book_id': book_id})
        else:
            # return all the books
            books = db.Book.find()
            return mjsonify(list(books))

    def post(self):
        ''' create a new book '''
        pass

    def delete(self, book_id):
        ''' delete the book with id book_id '''
        pass

    def put(self, book_id):
        ''' update a book '''
        pass


books_api = BooksApi.as_view('api')

# add url rules for this view to the books blueprint
booksbp.add_url_rule('/api/', defaults={'book_id': None},
                     view_func=books_api, methods=['GET',] )
booksbp.add_url_rule('/api/', view_func=books_api, methods=['POST',])
booksbp.add_url_rule('/api/<book_id>', view_func=books_api,
                     methods=['GET', 'PUT', 'DELETE',])


# Handle errors with api calls. A copy of what the flask docs do.
class InvalidUsage(Exception):
    ''' Something went wrong while fullfilling this request '''
    
    def __init__(self, message, status_code=404, payload=None):
        super(InvalidUsage, self).__init__()
        self.message = message
        self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rdict = dict(self.payload or ())
        rdict['message'] = self.message
        return rdict


@booksbp.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response
