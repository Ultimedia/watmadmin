appData.views.ActivityDetailView = Backbone.View.extend({

    initialize: function () {
      console.log('----- In the initialize of ActivityDetailView -----');
      appData.views.ActivityDetailView.model = this.model;
      

        Backbone.on('networkFoundEvent', this.networkFoundHandler);
        Backbone.on('networkLostEvent', this.networkLostHandler);
    }, 

    // phonegap device online
    networkFoundHandler: function(){

    },

    // phonegap device back online
    networkLostHandler: function(){
    },

    render: function() { 
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentPageHTML = this.$el;

      this.currentActivityPage = '#praktischContent';
      
      // add the default page
      var defaultView = new appData.views.ActivityInfoView({model : appData.views.ActivityDetailView.model});
      $('#activityContent', appData.settings.currentPageHTML).empty().append(defaultView.render().$el);

      // user is admin? (show edit options)
      if(appData.models.userModel.get("user_id") == this.model.get("user_id")){
        $('#editPanel', appData.settings.currentPageHTML).removeClass('hide');
      }

      this.addMap();

      return this; 
    }, 

    shareButtonHandler: function(){
        //appData.services.phpService.updateChallenge(3, 40);
    },

    addMap: function(){
        appData.settings.mapAdded = true;
        
        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(14, 10),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        }
        var map = new google.maps.Map($('#activityMap',appData.settings.currentPageHTML)[0], mapOptions);
        
        var coordinates;
        if(this.model.attributes.coordinates){
            coordinates =  this.model.attributes.coordinates.split(',');

          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(coordinates[0], coordinates[1]),
            map:  map,
            title: 'Huidige locatie',
            icon: appData.settings.iconPath + "map-icon@x2.png"
          });

          // resize and relocate map
          google.maps.event.addListenerOnce(map, 'idle', function() {
            google.maps.event.trigger(map, 'resize');
            map.setCenter(new google.maps.LatLng(coordinates[0], coordinates[1]), 13);
          });
        }
    },

    events: {
      "click #activityDetailTabs .cl-btn": "activeDetailTabsHandler",
      "click #navigateButton": "navigateClickHandler",
      "click #backButton": "backHandler",
      "click #shareButton": "sharePopopverClickHandler",
      "click #popover-close": "sharePopopverClickHandler",
      "click #updateButton": "updateButtonClickHandler"
    },

    updateButtonClickHandler: function(){
      window.location.hash = "#update/" + appData.views.ActivityDetailView.model.attributes.activity_id;
    },

    sharePopopverClickHandler: function(e){
        $('#popover', appData.settings.currentPageHTML).toggleClass('hide');
    },

    backHandler: function(){
      window.history.back();
    },

    navigateClickHandler: function(){
      appData.router.navigate('navigater', true);
    },

    activeDetailTabsHandler: function(evt) { 
        // tab on activity detail
        $('#activityDetailTabs .cl-btn').removeClass('active');
        $(evt.target, appData.settings.currentPageHTML).addClass('active');

        var selectedPage = $(evt.target, appData.settings.currentPageHTML).attr('data');
        var view;

        switch(selectedPage){
          case "#praktischContent":
            view = new appData.views.ActivityInfoView({model : appData.views.ActivityDetailView.model});
          break;

          case "#mediaContent":
            view = new appData.views.ActivityMediaView({model : appData.views.ActivityDetailView.model});
          break;

          case "#messagesContent":
            view = new appData.views.ActivityMessagesView({model : appData.views.ActivityDetailView.model});
          break;
        }

        
        $('#activityContent', appData.settings.currentPageHTML).empty().append(view.render().$el);
        this.currentActivityPage = selectedPage;
    }

});

