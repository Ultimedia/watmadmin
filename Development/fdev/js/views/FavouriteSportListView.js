appData.views.FavouriteSportListView = Backbone.View.extend({

    initialize: function () {

    }, 

    render: function() { 

    	this.model.attributes.path = appData.settings.sportsPath;



    	// model to template
    	this.$el.html(this.template(this.model.toJSON()));

    	$('a',this.$el).css({
    		'background-image': 'url(' + appData.settings.sportsPath + this.model.attributes.icon + ')',
    		"background-repeat": 'no-repeat'
    	});
        return this; 
    }

});


