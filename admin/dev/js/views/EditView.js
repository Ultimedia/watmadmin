appData.views.EditView = Backbone.View.extend({
    tagName: 'div',


    initialize: function () {
    
    },

    render: function() {
    	this.$el.html(this.template({activity: this.model.toJSON()}));
    	appData.settings.currentPageHTML = this.$el;

      return this;
    }
});
