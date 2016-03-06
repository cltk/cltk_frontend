var onAfterAction;

this.subs = new SubsManager();

Router.configure({
  layoutTemplate: "masterLayout",
  loadingTemplate: "loading",
  notFoundTemplate: "notFound",
  routeControllerNameConverter: "camelCase",
  onBeforeAction: function() {
    if (Config.username && Meteor.userId() && !Meteor.user().username) {
      this.redirect('/setUserName');
    }
    return this.next();
  }
});

Router.waitOn(function() {
  return subs.subscribe('user');
});

onAfterAction = function() {
  var $bd;
  if (Meteor.isClient) {
    window.scrollTo(0, 0);
    $bd = $('.modal-backdrop');
    $bd.removeClass('in');
    return setTimeout(function() {
      return $bd.remove();
    }, 300);
  }
};

Router.onAfterAction(onAfterAction);

Router.plugin('ensureSignedIn', {
  except: ['home', 'atSignIn', 'atSignUp', 'atForgotPassword', 'atSignOut', 'works', 'workDetail', 'readingBookChapterSection', 'readingBookLine', 'about', 'search', 'browse', 'terms']
});
