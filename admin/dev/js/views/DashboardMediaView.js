appData.views.DashboardMediaView = Backbone.View.extend({
    tagName: 'tr',

    initialize: function () {

    },

    render: function() {

    	console.log(this.model);
    	// model to template
    	this.$el.html(this.template({media: this.model.toJSON(), imagePath: appData.settings.imagePath}));
        return this;
    }

});

