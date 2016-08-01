var onAfterAction;

this.subs = new SubsManager();

/*
 * Perform functions necessary on route load
 *
 */
function onRouteLoad( context ){
  // If Meteor is on the client and a window exists
  if (Meteor.isClient && typeof window !== "undefined" ){

    // Initialize headroom
    setTimeout(function(){
      var elem = document.querySelector('header');
      var headroom = new Headroom(elem);
      headroom.init();

    }, 300);

    // Append .background-image-holder <img>'s as CSS backgrounds
    setTimeout(function(){
      $('.background-image-holder').each(function() {
          var imgSrc = $(this).children('img').attr('src');
          $(this).css('background', 'url("' + imgSrc + '")');
          $(this).children('img').hide();
          $(this).css('background-position', 'initial');
          $(this).addClass('fadeIn');
      });

      // Fade in background images
      setTimeout(function() {
          $('.background-image-holder').each(function() {
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
        smoothScrolling: false
      };
      return skrollr.init(options).refresh();
    }

  }
}

// Add onRouteLoad to FlowRouter.triggers.enter callbacks
FlowRouter.triggers.enter([onRouteLoad]);
/*
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


Router.plugin('ensureSignedIn', {
  except: ['home', 'atSignIn', 'atSignUp', 'atForgotPassword', 'atSignOut']
});
*/