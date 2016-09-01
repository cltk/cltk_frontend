/*
Router.map(function() {
this.route("profile", {
path: "/profile"
});
this.route("account", {
path: "/account"
});
this.route("setUserName", {
path: "/setUserName",
onBeforeAction: function() {
if (!Config.username || (Meteor.userId() && Meteor.user().username)) {
this.redirect('/profile');
}
return this.next();
}
});
return this.route('signOut', {
path: '/sign-out',
onBeforeAction: function() {
Meteor.logout(function() {});
this.redirect('/');
return this.next();
}
});
});
*/
FlowRouter.route('/profile', {
	action() {
		ReactLayout.render(UserLayout);
	},
});
FlowRouter.route('/account', {
	action() {
		BlazeLayout.render('masterLayout', { main: 'account' });
	},
});

FlowRouter.route('/setUserName', {
	triggersEnter: [function checkLogin(context, redirect) {
		if (!Config.username || (Meteor.userId() && Meteor.user().username)) {
			redirect('/profile');
		}
	}],
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
