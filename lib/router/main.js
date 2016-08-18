import React from 'react';
import {mount} from 'react-mounter';



/*
 * For the moment add subscriptions here; in future iterations, make them route
 * specific as necessary
 */

 FlowRouter.subscriptions = function(){
   this.register('works', Meteor.subscribe('works'));
   this.register('texts', Meteor.subscribe('texts'));
   this.register('authors', Meteor.subscribe('authors'));
 };


/*
 * Routes for application
 */


FlowRouter.route('/works/:author/:work', {
	action: function(params, queryParams){
		mount(ReadingLayout);
	}
});

FlowRouter.route('/', {
	action: function(params, queryParams){
		mount(HomeLayout);
	}

});

FlowRouter.route('/about', {
	action: function(params) {
		ReactLayout.render(MasterLayout, {content:<AboutPage />});
	}
});

FlowRouter.route('/browse', {
	action: function(params) {
		ReactLayout.render(MasterLayout, {content:<BrowsePage />});
	}
});

FlowRouter.route('/search', {
	action: function(params) {
		ReactLayout.render(MasterLayout, {content:<SearchPage />});
	}
});

FlowRouter.route('/terms', {
	action: function(params) {
		ReactLayout.render(MasterLayout, {content:<TermsPage />});
	}
});
