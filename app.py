from flask import Flask, redirect, url_for


app = Flask(__name__)


from books import booksbp
app.register_blueprint(booksbp, url_prefix='/books')


@app.route('/')
def home():
    return redirect(url_for('books.home'))



