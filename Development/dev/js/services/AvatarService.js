/**
* Updating a users avatar according to app usage
*/
appData.services.AvatarService = Backbone.Model.extend({

	initialize: function() {

	},

	addScore: function(paramter){
		var arr = [];
		var multiplier;

		switch(paramter){
			case "create":
				multiplier = 2.5;
			break;

			case "join":
				multiplier = 1.4;
			break;

			case "media":
				multiplier = 1.3
			break;

			case "chat":
				multiplier = 1.1;
			break;

			case "challenge":
				multiplier = 1.2;
			break;

			case "friend":
				multiplier = 1.3;
			break;
		}

		// score generator
		while(arr.length < 3){
		  var randomnumber=Math.ceil((Math.random()*3)*multiplier)
		  var found=false;
		  for(var i=0;i<arr.length;i++){
		    if(arr[i]==randomnumber){found=true;break}
		  }
		  if(!found)arr[arr.length]=randomnumber;
		}

		appData.models.userModel.attributes.equipment_score = parseInt(appData.models.userModel.attributes.equipment_score) + arr[0];
		appData.models.userModel.attributes.stamina_score = parseInt(appData.models.userModel.attributes.stamina_score) + arr[1];
		appData.models.userModel.attributes.strength_score = parseInt(appData.models.userModel.attributes.strength_score) + arr[2];
	
		// update avatar on the database
		Backbone.on('updateAvatarCompleteHandler', this.avatarCompleteHandler);
		appData.services.phpService.updateAvatar();
	},

	avatarCompleteHandler: function(){
		Backbone.off('updateAvatarCompleteHandler');
	},

	levelUp: function(){

		Backbone.trigger('levelUp');
	}

});
