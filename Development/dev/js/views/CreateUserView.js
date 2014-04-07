appData.views.CreateUserView = Backbone.View.extend({

	initialize: function () {
        appData.events.createUserEvent.bind("createUserHandler", this.createUserHandler);
        appData.events.createUserErrorEvent.bind("createUserErrorHandler", this.createUserErrorHandler);
        appData.events.locationHomeEvent.bind('locationErrorHandler', this.locationErrorHandler);
        appData.views.CreateUserView.selectedGender = 0;
        appData.views.CreateUserView.locationErrorHandler = this.locationErrorHandler;
        appData.views.CreateUserView.locationSuccesHandler = this.locationSuccesHandler;
    }, 

    render: function() { 
        this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;
    	this.setValidator();

    	if(this.model){
    		$('#passwordInput', appData.settings.currentPageHTML).val(this.model.attributes.password);
    		$('#emailInput', appData.settings.currentPageHTML).val(this.model.attributes.email);
    	}

        $('.radio-list input[type="radio"]', appData.settings.currentPageHTML).change(function() {

            // Remove all checked
            $(this).parents('.radio-list').find('label').removeClass('checked');
            $(this).parent().addClass('checked');

            var selectedData = $(this).attr('id');
                selectedData = selectedData.split('-');
                selectedData = selectedData[1];

                appData.views.CreateUserView.selectedGender = selectedData;
        });
        
        return this; 
    }, 

    events: {
        "click #createUserButton": "createUserButtonHandler",
        "change #ageSlider": "ageSliderHandler"
    },

    ageSliderHandler: function(){
        $('#range', appData.settings.currentPageHTML).removeClass('hide').text($('#ageSlider', appData.settings.currentPageHTML).val() + " jaar");
    },

    createUserButtonHandler: function(){
        $("#createUserForm",appData.settings.currentPageHTML).submit();
    },

    createUserHandler: function(){
        appData.router.navigate('dashboard', true);
    },

    createUserErrorHandler: function(){
        alert('cannot create user');
    },

	setValidator: function(){
        $("#createUserForm",appData.settings.currentPageHTML).validate({

            rules: {
                password: {
                    minlength:4
                },
                age: {
                  required: true,
                  range: [12, 60]
                }
            },

            messages: {
                genderradios: "Kies een optie"
            },

            errorPlacement: function(error, element) {

                if(element.attr("name") == "genderradios" ){
                    error.insertAfter("#genderSelect");
                }else{
                    error.insertAfter(element);
                }
            },

    		submitHandler: function(form) {
    			// CreateUser form logic
				var name = $('#nameInput', appData.settings.currentPageHTML).val();
				var password = $('#passwordInput', appData.settings.currentPageHTML).val();
				var email = $('#emailInput', appData.settings.currentPageHTML).val();
                var gender =  appData.views.CreateUserView.selectedGender;
                var age = $('#ageSlider', appData.settings.currentPageHTML).val();

				appData.models.userModel = new User();
                appData.models.userModel.set('name', name);
				appData.models.userModel.set('email', email);
				appData.models.userModel.set('password', password);
                appData.models.userModel.set('age', age);
                appData.models.userModel.set('gender', gender);

                 if(navigator.geolocation){

                    $('#facebookLoad').removeClass('hide');

                    // First lets get the location
                    Backbone.on('createUserLocationHandler', appData.views.CreateUserView.locationSuccesHandler);
                    appData.services.utilService.getLocationService("create");

                }else{
                    appData.services.phpService.createUser();
                }
		  	}
    	});
    },

    locationSuccesHandler: function(location){
        var myLocation = location.coords.latitude + "," + location.coords.longitude;
        appData.models.userModel.attributes.current_location = myLocation;
        appData.services.phpService.createUser();
    },

    locationErrorHandler: function(){

        Backbone.off('locationError');
        appData.services.phpService.createUser();
    }
});