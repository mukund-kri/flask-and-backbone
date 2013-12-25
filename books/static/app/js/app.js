var app = app || {};

var BookRouter = Backbone.Router.extend({
    routes: {
	'': 'home',
	'detail/:book_id': 'detail',
	'*path': 'home'
    },
    home: function() {
	new app.BooksListController({
	    collection: new app.BooksCollection()
	});
    },

    detail: function(book_id) {
	new app.BookDetailController({ model: new app.Book({id: book_id})});
    }
});

new BookRouter();

Backbone.history.start();
