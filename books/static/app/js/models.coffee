class Book extends Backbone.Model
  urlRoot: '/books/api/'
  defaults:
    finished: false


class BooksCollection extends Backbone.Collection
  model: Book
  url: '/books/api/'

