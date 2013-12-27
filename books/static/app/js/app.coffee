class BookRouter extends Backbone.Router
  routes:
    '': 'home'
    'detail/:book_id': 'detail',
    'add': 'add',
    'edit/:book_id': 'edit'
    '*path': 'home'
  home: ->
    new BookListView
      collection: new BooksCollection
  detail: (book_id) ->
    new BookDetailView
      model: new Book {id: book_id}
  edit: (book_id) ->
    new BookEditView
      model: new Book {id: book_id}
  add: ->
    new BookAddView
  

router = new BookRouter
Backbone.history.start()

        
