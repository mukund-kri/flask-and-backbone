var app = app || {};

var BookRouter = Backbone.Router.extend({
    routes: {
	'': 'home',
	'detail/:book_id': 'detail',
	'edit/:book_id': 'edit',
	'add': 'add',
	'*path': 'home'
    },
    home: function() {
	new app.BooksListController({
	    collection: new app.BooksCollection()
	});
    },
    detail: function(book_id) {
	new app.BookDetailController({ model: new app.Book({id: book_id})});
    },
    edit: function(book_id) {
	new app.BookEditController({
	    model: new app.Book({ id: book_id })
	});
    },
    add: function() {
	new app.BookAddController();
    }
    
});

app.router = new BookRouter();

Backbone.history.start();
