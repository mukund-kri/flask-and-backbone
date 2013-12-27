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
    'click .edit': 'edit'
    'click .del': 'del'
  detail: ->
    book_url = "/detail/#{ @model.toJSON()._id.$oid }"
    router.navigate book_url, {trigger: true}
  edit: ->
    book_url = "/edit/#{ @model.toJSON()._id.$oid }"
    router.navigate book_url, {trigger: true}
  del: ->
    @model.id = @model.toJSON()._id.$oid
    @model.destroy()


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


class BookEditView extends Backbone.View
  el: "#main-view"
  template: _.template ($ "#book-edit-tmpl").html()
  initialize: =>
    @model.fetch
      success: =>
        @render()
  render: =>
    @$el.html (@template { book: @model.toJSON() })
    (@$ 'form').submit (e) ->
      e.preventDefault()

  events:
    'submit form': 'save'

  save: ->
    @model.set
      title: (@$ "input[name=title]").val()
      description: (@$ "textarea").val()
    @model.save()
    router.navigate '/', { trigger: true }


class BookAddView extends Backbone.View
  el: "#main-view"
  template: _.template ($ "#book-add-tmpl").html()
  initialize: =>
    @render()
  render: =>
    @$el.html @template()
    (@$ 'form').submit (e) ->
      e.preventDefault()

  events:
    'submit form': 'save'

  save: ->
    @model = new Book
    @model.set
      title: (@$ "input[name=title]").val()
      description: (@$ "textarea").val()
    @model.save()
    router.navigate '/', { trigger: true }

