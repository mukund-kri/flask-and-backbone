var app = app || {};


app.Book = Backbone.Model.extend({});

app.BooksCollection = Backbone.Collection.extend({
    url: '/books/api',
    model: app.Book
});
