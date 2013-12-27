class BookEleView extends Backbone.View
  tagName: 'li'
  tagClass: 'a-book'
  template: _.template( ($ "#book-ele-tmpl").html() )
  render: ->
    @$el.html @template
      book: @model.toJSON()
    @

  events:
    'click .title': 'detail'
  detail: ->
    book_url = "/detail/#{ @model.toJSON()._id.$oid }"
    router.navigate book_url, {trigger: true}


class BookListView extends Backbone.View
  el: "#main-view",
  template: _.template( ($ "#book-listing-tmpl").html() )

  initialize: =>
    @collection.fetch
      success: =>
        @render()

  render: =>
    @$el.html @template()
    for model in @collection.models
      bookEle = new BookEleView { model: model }
      (@$ "ul").append bookEle.render().el


class BookDetailView extends Backbone.View
  el: "#main-view"
  template: _.template ($ "#book-detail-tmpl").html()
  initialize: =>
    @model.fetch
      success: =>
        @render()
  render: =>
    @$el.html (@template { book: @model.toJSON() })
