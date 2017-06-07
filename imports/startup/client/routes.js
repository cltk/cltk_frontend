import React from 'react';
import { mount } from 'react-mounter';

import HomeLayout from '/imports/ui/layouts/HomeLayout';
import MasterLayout from '/imports/ui/layouts/MasterLayout';
import Utils from '/imports/lib/utils';

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
	name: 'Home',
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

/**
 * User routes
 */

/*
 * Route groups with permissions
 */
const loggedInGroup = FlowRouter.group({
	triggersEnter: [AccountsTemplates.ensureSignedIn],
});

loggedInGroup.route('/profile', {
	action() {
		ReactLayout.render(UserLayout);
	},
});
loggedInGroup.route('/account', {
	action() {
		// TODO: Fix the blazeLayout render for account
		// BlazeLayout.render('masterLayout', { main: 'account' });
	},
});

loggedInGroup.route('/setUserName', {
	action() {
	// Do nothing
	},
});
loggedInGroup.route('/sign-out', {
	triggersEnter: [
		() => {
			AccountsTemplates.logout();
		},
	],
	action: () => {
		// Do nothing
	},
});

// this.subs = new SubsManager();

/*
* Perform functions necessary on route load
*
*/
function onRouteLoad() {
	let headroom;

	// If Meteor is on the client and a window exists
	if (Meteor.isClient && typeof window !== 'undefined') {
		// Initialize headroom
		setTimeout(() => {
			const elem = document.querySelector('header');
			if (elem) {
				headroom = new Headroom(elem);
				headroom.init();
			}
		}, 300);

		// Append .background-image-holder <img>'s as CSS backgrounds
		setTimeout(() => {
			$('.background-image-holder').each(function appendImg() {
				const imgSrc = $(this).children('img').attr('src');
				$(this).css('background', `url("${imgSrc}")`);
				$(this).children('img').hide();
				$(this).css('background-position', 'initial');
				$(this).addClass('fadeIn');
			});

			// Fade in background images
			setTimeout(() => {
				$('.background-image-holder').each(function fadeImg() {
					$(this).removeClass('blur');
				});
			}, 500);
		}, 500);

		/*
		 * If isn't mobile, init skrollr
		 */
		if (!Utils.isMobile) {
			options = {
				forceHeight: false,
				smoothScrolling: false,
			};

			skrollr.init(options).refresh();
		}
	}
}

// Add onRouteLoad to FlowRouter.triggers.enter callbacks
FlowRouter.triggers.enter([onRouteLoad]);
