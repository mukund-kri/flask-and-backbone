var app = app || {};

var BookRouter = Backbone.Router.extend({
    routes: {
	'': 'home',
	'*path': 'home'
    },
    home: function() {
	new app.BooksListController({
	    collection: new app.BooksCollection()
	});
    }
});

new BookRouter();

Backbone.history.start();
