appData.views.FriendView = Backbone.View.extend({

    initialize: function () {
      appData.views.FriendView.model = this.model;

      // is this a friend?
      if(appData.models.userModel.attributes.myFriends.where({"user_id": this.model.attributes.user_id}).length > 0){
        this.model.attributes.myFriend = true;
      }else if(appData.views.FriendView.model.attributes.user_id == appData.models.userModel.attributes.user_id){
        this.model.attributes.myFriend = true;
      }else{
        this.model.attributes.myFriend = false;
      }
      Backbone.on('networkFoundEvent', this.networkFoundHandler);
      Backbone.on('networkLostEvent', this.networkLostHandler);


    }, 

    // phonegap device offline
    networkFoundHandler: function(){

    },

    // phonegap device back online
    networkLostHandler: function(){

    },

    render: function() { 
      this.$el.html(this.template({imagePath: appData.settings.imagePath, user: this.model.toJSON()}));
      appData.settings.currentPageHTML = this.$el;

      Backbone.on('userMediaHandler', this.userMediaRecievedHandler);
      appData.services.phpService.getUserMedia(this.model.attributes.user_id);

      return this; 
    }, 

    userMediaRecievedHandler: function(media){
      console.log(media);
      Backbone.off('userMediaHandler');

      var mediaList = [];

      // generate media tiles
      media.each(function(mediaModel) {

          mediaModel.attributes.userModel = appData.views.FriendView.model.attributes;
          mediaModel.attributes.imagePath = appData.settings.imagePath;

          mediaList.push(new appData.views.ActivityMediaViewer({
            model : mediaModel
          }));
      });

      $('#mediaContainer', appData.settings.currentPageHTML).empty();
      _(mediaList).each(function(dv) {
          $('#mediaContainer', appData.settings.currentPageHTML).append(dv.render().$el);
      });
    },

    events: {
      "click #backButton": "backHandler",
      "click #addFriendButton": "addFriendHandler"
    },

    addFriendHandler: function(){
      Backbone.on('addedFriendHandler', this.addedAsFriendHandler);
      appData.services.phpService.addFriend(appData.views.FriendView.model.attributes.user_id, appData.models.userModel.attributes.user_id);
    },

    backHandler: function(){
      window.history.back();
    },

    addedAsFriendHandler: function(){
      Backbone.off('addedFriendHandler');
      $('#addFriendButton', appData.settings.currentPageHTML).remove();
    }
});

