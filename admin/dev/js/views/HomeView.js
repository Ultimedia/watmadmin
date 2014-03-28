appData.views.HomeView = Backbone.View.extend({
    initialize: function () {
        Backbone.on('getActivitiesHandler', this.getActivitiesHandler);
        appData.services.phpService.getActivities();

        Backbone.on('getActivitiesArchiveHandler', this.getActivitiesArchiveHandler);
        appData.services.phpService.getAcitvitiesArchive();
    },

      
    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;

      // initialise modal
      $('#remove-modal').modal();


      return this;
    },

    getActivitiesHandler: function(){
      Backbone.off('loadComplete');

      // show activities
      $('#activity-table tbody').empty();
      appData.collections.activities.each(function(activity) {
        console.log(activity)

        var aView = new appData.views.DashboardActivityView({model : activity});

        $('#activity-table tbody', appData.settings.currentPageHTML).append(aView.render().$el);
      });

      // trigger remove modal events
      $('#remove-modal').on('show.bs.modal', function (e) {

        console.log(e);

      });
    },

    getActivitiesArchiveHandler: function(){
      console.log(appData.collections)

      $('#activity-archive-table tbody').empty();
      appData.collections.activitiesArchive.each(function(activity) {
        var aView = new appData.views.DashboardActivityView({model : activity});

        $('#activity-archive-table tbody', appData.settings.currentPageHTML).append(aView.render().$el);
      });

      // trigger remove modal events
      $('#remove-modal').on('show.bs.modal', function (e) {
      });
    }
});
