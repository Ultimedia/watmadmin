appData.views.ProfileAvatarView = Backbone.View.extend({

    initialize: function () {
    	Backbone.on('updateAvatarCompleteHandler', this.updateAvatarCompleteHandler)
    },
    
    render: function() { 

    	this.$el.html(this.template(appData.models.userModel.toJSON()));
        appData.settings.currentModuleHTML = this.$el;
        return this; 
    },

    events:{
    	"click #updateAvatar": "updateAvatarHandler"
    },

    updateAvatarHandler: function(){
    	appData.services.phpService.updateAvatar();
    },

    updateAvatarCompleteHandler: function(){

    }
});