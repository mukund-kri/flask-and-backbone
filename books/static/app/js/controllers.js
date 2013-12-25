var app = app || {};


app.BooksListController = Backbone.View.extend({
    el: '#main-view',
    template: _.template( $('#book-listing').html() ),

    initialize: function() {
	/*
	self = this;
	this.collection.fetch({
	    success: function () {
		self.render();
	    }
	}); */
	this.render();
    },

    render: function() {
	this.$el.html( this.template({
	    books: this.collection.toJSON() 
	}));
    }
    
});
