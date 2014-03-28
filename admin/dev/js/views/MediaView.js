appData.views.MediaView = Backbone.View.extend({
    initialize: function () {
        Backbone.on('mediaLoadSuccesHandler', this.mediaLoadedHandler);
        appData.services.phpService.getAllMedia();
    },
 
    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;

      return this;
    },

    mediaLoadedHandler: function(){
        Backbone.off('mediaLoadSuccesHandler');
        
        $('#media-table tbody').empty();
            appData.collections.mediaCollection.each(function(media) {
            var aView = new appData.views.DashboardMediaView({model : media});

            $('#media-table tbody', appData.settings.currentPageHTML).append(aView.render().$el);
        });

        // trigger remove modal events
        $('#remove-modal').on('show.bs.modal', function (e) {
        
        });
    }
});
