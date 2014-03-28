appData.views.SportsView = Backbone.View.extend({
    initialize: function () {
        Backbone.on('getSportsHandler', this.getSportsHandler);
        appData.services.phpService.getSports();
    },

      
    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;

      // initialise modal
      $('#remove-modal').modal();

      return this;
    },

    getSportsHandler: function(){

      Backbone.off('getSportsHandler');

      // show activities
      $('#sports-table tbody').empty();
      appData.collections.sports.each(function(sport) {

        var aView = new appData.views.DashboardSportView({model : sport});

        $('#sports-table tbody', appData.settings.currentPageHTML).append(aView.render().$el);
      });

      // trigger remove modal events
      $('#remove-modal').on('show.bs.modal', function (e) {

        console.log(e);

      });
    }
});
