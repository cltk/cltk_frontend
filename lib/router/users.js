import React from 'react';
import { mount } from 'react-mounter';

/*
 * Route groups with permissions
 */
loggedInGroup = FlowRouter.group({
	triggersEnter: [AccountsTemplates.ensureSignedIn],
});

loggedInGroup.route('/profile', {
	action() {
		ReactLayout.render(UserLayout);
	},
});
loggedInGroup.route('/account', {
	action() {
		BlazeLayout.render('masterLayout', { main: 'account' });
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

AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn', {
	redirect: '/profile',
});
// AccountsTemplates.configureRoute('signUp', {
// 	redirect: '/profile',
// });
AccountsTemplates.configureRoute('verifyEmail');
