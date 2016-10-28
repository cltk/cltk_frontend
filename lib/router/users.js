loggedInGroup = FlowRouter.group({
	triggersEnter: [
		(context, redirect) => {
			if (Meteor.loggingIn() || Meteor.userId()) {
				route = FlowRouter.current();
			} else {
				redirect('/sign-in');
			}
		},
	],
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
FlowRouter.route('/sign-out', {
	triggersEnter: [function logout(context, redirect) {
		AccountsTemplates.logout();
		redirect('/');
	}],
	action() {
	// Do nothing
	},
});
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
// AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
