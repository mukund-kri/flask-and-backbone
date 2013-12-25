from flask import Blueprint, render_template


booksbp = Blueprint('books',
                    __name__,
                    template_folder='templates',
                    static_folder='static')


@booksbp.route('/')
def home():
    return render_template('singlepage.html')

