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
    action: function(params, queryParams) {
        ReactLayout.render(UserLayout);
    }
});
FlowRouter.route('/account', {
    action: function(params) {
        BlazeLayout.render('masterLayout', {main:'account'});
    }
});

FlowRouter.route('/setUserName', {
    triggersEnter: [function(context, redirect) {
       if (!Config.username || (Meteor.userId() && Meteor.user().username)) {
        redirect('/profile');
      }
    }],
    action: function(params) {
      // Do nothing
    },
});
FlowRouter.route('/sign-out', {
    triggersEnter: [function(context, redirect) {
      AccountsTemplates.logout();
      redirect('/');
    }],
    action: function(params) {
      // Do nothing
    },
});
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
