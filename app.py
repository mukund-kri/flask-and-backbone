from flask import Flask, redirect, url_for


app = Flask(__name__)


# initialize mongo
app.config['MONGODB_DATABASE'] = 'books'

from models import db
db.init_app(app)


from books import booksbp
app.register_blueprint(booksbp, url_prefix='/books')


@app.route('/')
def home():
    return redirect(url_for('books.home'))



