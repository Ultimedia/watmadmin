appData.routers.AppRouter = Backbone.Router.extend({

    routes: {
        "":                 "home",
        "edit/:id":          "edit" 
    },

    initialize: function () {
        appData.slider = new PageSlider($('#container'));

        this.routesHit = 0;
        
        //keep count of number of routes handled by your application
        Backbone.history.on('route', function() { this.routesHit++; }, this);
    },

    home: function () {
        $('#container').empty().append(new appData.views.HomeView().render().$el);
    },

    edit: function (id) {

      var selectedActivityModel = appData.collections.activities.where({activity_id: id}); 
        selectedActivityModel = selectedActivityModel[0];

        console.log(selectedActivityModel)

        $('#container').empty().append(new appData.views.EditView({model: selectedActivityModel}).render().$el);
    }
});



