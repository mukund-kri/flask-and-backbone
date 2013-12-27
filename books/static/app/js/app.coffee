class BookRouter extends Backbone.Router
  routes:
    '': 'home'
    'detail/:book_id': 'detail',
    'add/:book_id': 'add',
    'edit/:book_id': 'edit'
    '*path': 'home'
  home: ->
    new BookListView
      collection: new BooksCollection
  detail: (book_id) ->
    new BookDetailView
      model: new Book {id: book_id}

router = new BookRouter
Backbone.history.start()

        
