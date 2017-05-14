import React from 'react';
import { mount } from 'react-mounter';

/*
* For the moment add subscriptions here; in future iterations, make them route
* specific as necessary
*/

FlowRouter.subscriptions = function subscriptions() {
	this.register('authors', Meteor.subscribe('authors'));
	this.register('worksCount', Meteor.subscribe('worksCount'));
	this.register('authorsCount', Meteor.subscribe('authorsCount'));
};

/*
* Routes for application
*/
FlowRouter.route('/works/:id/:work', {
	action(params, queryParams) {
		mount(ReadingLayout, { params, queryParams });
	},
});

FlowRouter.route('/', {
	action() {
		mount(HomeLayout);
	},

});

FlowRouter.route('/about', {
	action() {
		mount(MasterLayout, { content: <AboutPage /> });
	},
});

FlowRouter.route('/browse', {
	action() {
		mount(MasterLayout, { content: <BrowseView /> });
	},
});

FlowRouter.route('/terms', {
	action() {
		mount(MasterLayout, { content: <TermsPage /> });
	},
});
