appData.views.LoadingView = Backbone.View.extend({
    initialize: function () {

      Backbone.on('getSportsHandler', this.loadedDataHandler)
      appData.services.phpService.getSports();

      Backbone.on('getUsersHandler', this.loadedDataHandler)
      appData.services.phpService.getUsers();    

      Backbone.on('getChallengesHandler', this.loadedDataHandler)
      appData.services.phpService.getChallenges();    
    },

    loadedDataHandler:function(payload){

      switch(payload){
        case "users":  
          Backbone.off('getUsersHandler'); 
          appData.settings.usersLoaded = true; 
        break;
        case "sports":  
          Backbone.off('getSportsHandler'); 
          appData.settings.sportsLoaded = true;
        break;
        case "challenges":
          Backbone.off('getChallengesHandler');
          appData.settings.challengesLoaded = true;
        break;
      }

      if(appData.settings.usersLoaded  && appData.settings.sportsLoaded  && appData.settings.challengesLoaded){
        appData.settings.dataLoaded = true;

        // send the user back once the loading has completed
        window.history.back();
      }
  },  

    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;
      return this;
    }

});
