var app = app || {};


// Handle each book element on the book listing
app.BookEleController = Backbone.View.extend({
    tagName: 'li',
    tagClass: 'book-element',
    template: _.template( $('#book-ele-tmpl').html() ),

    events: {
	'click .title': 'goToDetails',
	'click .finished': 'finished',
	'click .edit': 'edit',
	'click .del': 'del'
    },
    render: function() {
	this.$el.html( this.template({ book: this.model.toJSON() }) );
	return this;
    },

    // Event handlers ------------------------------------------------
    finished: function() {
	alert("Save to db");
    },
    edit: function() {
	id = this.model.toJSON()._id.$oid;
	app.router.navigate("/edit/" + id, {trigger: true});
    },
    del: function() {
	this.model.id = this.model.toJSON()._id.$oid;
	this.model.destroy({
	    success: function (data) {
		console.log(data, "success");
	    }
	});
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
	_.each( this.collection.models, 
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
		console.log();
	    }
	});
    },

    render: function () {
	this.$el.html( this.template({ book: this.model.toJSON() }) );
	return this;
    }
});

app.BookEditController = Backbone.View.extend({
    el: '#main-view',
    template: _.template( $('#book-edit-tmpl').html() ),
    
    events: {
	'submit form': 'save'
    },
    initialize: function() {
	self = this;
	this.model.fetch({
	    success: function(data) {
		self.render();
	    },
	    error: function(data) {
		console.log(data);
	    }
	});
    },
    render: function() {
	this.$el.html( this.template({ book: this.model.toJSON() }) );
	this.$('form').submit(function(e){ e.preventDefault(); });
	return this;
    },

    save: function () {
	console.log("IN save");
	this.model.set({ 
	    title: this.$('input[name=title]').val(),
	    description: this.$('textarea').val() 
	});
	this.model.save();
	app.router.navigate("/", {trigger: true})
    }
});

app.BookAddController = Backbone.View.extend({
    el: '#main-view',
    template: _.template( $('#book-add-tmpl').html() ),
    
    events: {
	'submit form': 'save'
    },
    initialize: function() {
	this.model = new app.Book();
	this.render();
    },
    render: function() {
	this.$el.html( this.template() );
	this.$('form').submit(function(e){ e.preventDefault(); });
	return this;
    },

    save: function () {
	this.model.save({ 
	    title: this.$('input[name=title]').val(),
	    description: this.$('textarea').val() 
	});
	app.router.navigate("/", {trigger: true})
    }
});
