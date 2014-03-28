appData.views.NewSportView = Backbone.View.extend({
    initialize: function () {

    },

      
    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;

      // initialise modal
      $('#remove-modal').modal();

      return this;
    }
});
