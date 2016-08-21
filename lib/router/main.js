import React from 'react';
import {mount} from 'react-mounter';



/*
 * For the moment add subscriptions here; in future iterations, make them route
 * specific as necessary
 */

 FlowRouter.subscriptions = function(){
   this.register('works', Meteor.subscribe('works'));
   this.register('authors', Meteor.subscribe('authors'));
 };


/*
 * Routes for application
 */


FlowRouter.route('/works/:id/:work', {
	action: function(params, queryParams){
		mount(ReadingLayout, {params: params, queryParams: queryParams});
	}
});

FlowRouter.route('/', {
	action: function(params, queryParams){
		mount(HomeLayout);
	}

});

FlowRouter.route('/about', {
	action: function(params) {
		mount(MasterLayout, {content:<AboutPage />});
	}
});

FlowRouter.route('/browse', {
	action: function(params) {
		mount(MasterLayout, {content:<BrowseView />});
	}
});

FlowRouter.route('/search', {
	action: function(params) {
		mount(MasterLayout, {content:<SearchView />});
	}
});

FlowRouter.route('/terms', {
	action: function(params) {
		mount(MasterLayout, {content:<TermsPage />});
	}
});
