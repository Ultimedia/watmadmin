appData.views.HomeView = Backbone.View.extend({
    initialize: function () {
      appData.settings.getActivitiesHandler = this.getActivitiesHandler;
    },

    loadedDataHandler: function(payload){
        switch(payload){
          case "users":  
            Backbone.off('getUsersHandler'); 
            appData.settings.usersLoaded = true; 
          break;
          case "sports":  
            Backbone.off('getSportsHandler'); 
            appData.settings.sportsLoaded = true;
          break;
        }

        if(appData.settings.usersLoaded  && appData.settings.sportsLoaded){
          Backbone.off('getSportsHandler');
          Backbone.off('getUsersHandler');

          Backbone.on('getActivitiesHandler', appData.settings.getActivitiesHandler);
          appData.services.phpService.getActivities();
        }
    },
      
    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;

      var sportsLoaded, usersLoaded, challengesLoaded = false;

      Backbone.on('getSportsHandler', this.loadedDataHandler)
      appData.services.phpService.getSports();

      Backbone.on('getUsersHandler', this.loadedDataHandler)
      appData.services.phpService.getUsers();

      return this;
    },

    getActivitiesHandler: function(){
      Backbone.off('getActivitiesHandler');

      // show activities
      appData.collections.activities.each(function(activity) {
        console.log(activity)

        var aView = new appData.views.DashboardActivityView({model : activity});

        $('#activity-table tbody', appData.settings.currentPageHTML).append(aView.render().$el);
      });
  }
});
