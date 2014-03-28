/**
* Facebook Services
*/
appData.services.FacebookServices = Backbone.Model.extend({

	initialize: function() {

	},

	facebookConnect: function(){
		if(appData.settings.native){
			// connect facebook API for mobile apps
	        try {
	        	FB.init({ 
	        		appId: "595730207182331", 
	        		nativeInterface: CDV.FB 
	        	});

	        	appData.settings.facebookConnect = true;
	        } catch (e) {
	        	alert(e);
	        }
    	}else{
    		try {

	            FB.init({
	                appId: '595730207182331', // App ID
	                status: false // check login status
	            });

			} catch (e) {
				alert(e);
			}
    	}

	},

	facebookUserToSQL: function(){

		$.ajax({
			url:appData.settings.servicePath + appData.settings.facebookUserToSQL,
			type:'POST',
			dataType:'json',
			data: "email="+appData.models.userModel.attributes.email+"&age="+appData.models.userModel.attributes.age+"&gender="+appData.models.userModel.attributes.gender+"&name="+appData.models.userModel.attributes.name+"&facebook_data="+JSON.stringify(appData.models.userModel.attributes.facebook_data)+"&facebook_id="+appData.models.userModel.attributes.facebook_id+"&avatar="+appData.models.userModel.attributes.facebook_avatar+"&current_location="+JSON.stringify(appData.models.userModel.attributes.current_location),
			timeout:60000,
			success:function(data){
				if(data.value === true){
					// store the userID
					appData.settings.userLoggedIn = true;
					appData.models.userModel.set('user_id', data.user_id);
					appData.events.facebookUserToSQLEvent.trigger("facebookUserToSQLSuccesHandler");

				}else{
					appData.events.createUserErrorEvent.trigger("createUserErrorHandler");
				}
			}
		});
	},

	getUserFromFacebookID: function(){

	  	$.ajax({
			url:appData.settings.servicePath + appData.settings.getUserFromFacebookID,
			type:'GET',
			dataType:'json',
			data: "facebook_id="+appData.models.userModel.attributes.facebook_id,
			timeout:60000,
			success:function(data){		

				appData.models.userModel.attributes.strength_score = data.strength_score;
				appData.models.userModel.attributes.stamina_score = data.stamina_score;
				appData.models.userModel.attributes.equipment_score = data.equipment_score;
				appData.models.userModel.attributes.gender = data.gender;
				appData.models.userModel.attributes.age = data.age;

				if(data.avatar !== ""){
					appData.models.userModel.attributes.avatar = data.avatar;
					console.log('replaced avatar');
				}
				appData.events.getUserFromFacebookIDEvent.trigger("facebookGetIDHandler", data);
			}
		});
	},

	facebookLogin: function(){
		FB.login(function(response) {
		   if (response.authResponse) {
		    appData.settings.userLoggedIn = true;
			appData.events.facebookLoginEvent.trigger("facebookLoginHandler");
		   } else {
			alert("Je kan nu niet inloggen met Facebook, probeer het later opnieuw");
		   }
	    },{ scope: "email" });
	},

	getProfileData:function(){
		
		FB.api('/me', {fields:['id','name','email','username','age_range','gender','hometown','link','favorite_athletes','favorite_teams']}, function(response) {

			// store the date in the user profile
			appData.models.userModel.attributes.facebookUser = true;
			appData.models.userModel.attributes.name = response.name;
			appData.models.userModel.attributes.email = response.email;
			
			if(response.age_range.min){
			appData.models.userModel.attributes.age = response.age_range.min;
			}
			
			// out of scope
			//appData.models.userModel.attributes.facebook_data.favorite_athletes = response.favorite_athletes;
			//appData.models.userModel.attributes.facebook_data.favorite_teams = response.favorite_teams;
			//appData.models.userModel.attributes.facebook_data.hometown = response.hometown.name;
			//appData.models.userModel.attributes.facebook_data.username = response.name;
	
			var gender;
			if(response.gender == "male"){
				gender = 1;
			}else{
				gender = 0;
			}
			appData.models.userModel.attributes.gender = gender;
			appData.models.userModel.attributes.facebook_id = response.id;

			FB.api("/me/picture", function(response) {
				appData.models.userModel.attributes.facebook_avatar = response.data.url;
				appData.events.facebookGetProfileDataEvent.trigger("facebookProfileDataHandler");
			});

		});
	},

	getFacebookFriends: function(){
		FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
	    	if (response.error) {
	        	appData.events.facebookGetFriendsErrorEvent.trigger("facebookGetFriendErrorHandler");

	    	} else {

				appData.models.userModel.attributes.friends = new UsersCollection(response.data);

				// succesfully signed in via Facebook
	        	appData.events.facebookGetFriendsEvent.trigger("facebookGetFriendsHandler");
	    	}
		});
	}

});