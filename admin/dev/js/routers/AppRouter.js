appData.routers.AppRouter = Backbone.Router.extend({

    routes: {
        "":                 "home",
        "edit/:id":         "edit",
        "users":            "users",
        "loading":          "loading",
        "challenges":       "challenges",
        "new-challenge":    "newchallenge",
        "sports":           "sports",
        "new-sport":        "newsport",
        "media":            "media",
        "locations":        "locations"
    },

    initialize: function () {
        appData.slider = new PageSlider($('#container'));

        this.routesHit = 0;

        //keep count of number of routes handled by your application
        Backbone.history.on('route', function() { this.routesHit++; }, this);
    },

    home: function () {
        if(appData.settings.dataLoaded){
            $('#container').empty().append(new appData.views.HomeView().render().$el);
        }else{
            window.location.hash = "loading";
        }
    },

    challenges: function(){
         if(appData.settings.dataLoaded){
            $('#container').empty().append(new appData.views.ChallengesView().render().$el);
        }else{
            window.location.hash = "loading";
        }       
    },

    newchallenge: function(){
         if(appData.settings.dataLoaded){
            $('#container').empty().append(new appData.views.NewChallengeView().render().$el);
        }else{
            window.location.hash = "loading";
        }       
    },

    locations: function(){
         if(appData.settings.dataLoaded){
            $('#container').empty().append(new appData.views.LocationsView().render().$el);
        }else{
            window.location.hash = "loading";
        }       
    },

    edit: function (id) {


        if(appData.settings.dataLoaded){
            var selectedActivityModel = appData.collections.activities.where({activity_id: id}); 
            selectedActivityModel = selectedActivityModel[0];
            $('#container').empty().append(new appData.views.EditView({model: selectedActivityModel}).render().$el);
        }else{
            window.location.hash = "loading";
        }
    },

    users: function(){
        if(appData.settings.dataLoaded){
            $('#container').empty().append(new appData.views.UsersView().render().$el);
        }else{
            window.location.hash = "loading";
        }
    },

    sports: function(){
        if(appData.settings.dataLoaded){
            $('#container').empty().append(new appData.views.SportsView().render().$el);
        }else{
            window.location.hash = "loading";
        }
    },

    newsport: function(){
        if(appData.settings.dataLoaded){
            $('#container').empty().append(new appData.views.NewSportView().render().$el);
        }else{
            window.location.hash = "loading";
        }
    },

    media: function(){
        if(appData.settings.dataLoaded){
            $('#container').empty().append(new appData.views.MediaView().render().$el);
        }else{
            window.location.hash = "loading";
        }
    },

    loading: function(){
        $('#container').empty().append(new appData.views.LoadingView().render().$el);
    }
});



