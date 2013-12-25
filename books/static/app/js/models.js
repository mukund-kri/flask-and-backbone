var app = app || {};


app.Book = Backbone.Model.extend({
    urlRoot: '/books/api/'
});

app.BooksCollection = Backbone.Collection.extend({
    url: '/books/api/',
    model: app.Book
});
