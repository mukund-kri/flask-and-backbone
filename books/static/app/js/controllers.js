var app = app || {};


// Handle each book element on the book listing
app.BookEleController = Backbone.View.extend({
    tagName: 'li',
    tagClass: 'book-element',
    template: _.template( $('#book-ele-tmpl').html() ),

    events: {
	'click .title': 'goToDetails',
	'click .finished': 'finished',
	'click .edit': 'edit'
    },
    render: function() {
	this.$el.html( this.template({ book: this.model }) );
	return this;
    },

    // Event handlers ------------------------------------------------
    finished: function() {
	alert("Save to db");
    },
    edit: function() {
	alert("edit form will come here");
    }
});

app.BooksListController = Backbone.View.extend({
    el: '#main-view',
    template: _.template( $('#book-listing-tmpl').html() ),

    initialize: function() {
	self = this;
	this.collection.fetch({
	    success: function () {
		self.render();
	    }
	}); 
	this.render();
    },

    render: function() {
	this.$el.html( this.template() );
	_.each( this.collection.toJSON(), 
		function( model ) {
		    var ctrl = new app.BookEleController({model: model});
		    this.$("ul").append(ctrl.render().el);
		},
	      this);
    }
    
});

app.BookDetailController = Backbone.View.extend({
    el: '#main-view',
    template: _.template( $('#book-detail-tmpl').html() ),
    
    initialize: function() {
	self = this;
	this.model.fetch({
	    success: function() {
		self.render();
	    },
	    error: function(data) {
		console.log(data, this);
	    }
	});
    },

    render: function () {
	this.$el.html( this.template({ book: this.model.toJSON() }) );
	return this;
    }
});
