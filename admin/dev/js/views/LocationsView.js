appData.views.LocationsView = Backbone.View.extend({
    initialize: function () {
		Backbone.on("getLocationsSuccesHandler", this.getLocationsSuccesHandler);
		appData.services.phpService.getLocations();
    },

    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;

      // initialise modal
      $('#remove-modal').modal();

      return this;
    },

    getLocationsSuccesHandler: function(){

    	Backbone.off('getLocationsSuccesHandler');
        
        $('#location-table tbody').empty();
            appData.collections.locations.each(function(location) {
            var aView = new appData.views.DashboardLocationView({model : location});

            $('#location-table tbody', appData.settings.currentPageHTML).append(aView.render().$el);
        });

        // trigger remove modal events
        $('#remove-modal').on('show.bs.modal', function (e) {
        
        });
    }
});
