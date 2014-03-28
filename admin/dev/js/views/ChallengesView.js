appData.views.ChallengesView = Backbone.View.extend({
    initialize: function () {
        Backbone.on('getChallengesHandler', this.getChallengesHandler);
        appData.services.phpService.getChallenges();
    },

      
    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;

      return this;
    },

    getChallengesHandler: function(){
      Backbone.off('getChallengesHandler');

      console.log(appData.collections);

      $('#challenges-table tbody').empty();
      appData.collections.challenges.each(function(user) {
        var aView = new appData.views.DashboardChallengesView({model : user});

        $('#challenges-table tbody', appData.settings.currentPageHTML).append(aView.render().$el);
      });
    }
});
