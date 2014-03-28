appData.views.UsersView = Backbone.View.extend({
    initialize: function () {
        Backbone.on('getUsersHandler', this.getUsersHandler);
        appData.services.phpService.getUsers();
    },
      
    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;
      return this;
    },

    getUsersHandler: function(){
        Backbone.off('getUsersHandler');

        // show users
         $('#user-table tbody').empty();
        appData.collections.users.each(function(user) {
        var aView = new appData.views.DashboardUserView({model : user});

        $('#user-table tbody', appData.settings.currentPageHTML).append(aView.render().$el);
      });
    }

});
