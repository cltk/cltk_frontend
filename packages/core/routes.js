var OnBeforeActions;
OnBeforeActions = {
    loginRequired: function(pause) {

      if (!Meteor.userId()) {

        this.render('login');
        return pause();
      }else {

        if (Meteor.isClient && typeof window !== "undefined" ){

        	window.__ad__ = window.__ad__ || {};
        	var Ad = window.__ad__
        	;

          $('.grid.primary').removeClass("fadeIn");
          Ad.Util.scroll_to_top();
          Ad.Util.show_header_text();

        }

        this.next();

      }

    }
};

// Restrict routes to authenticated users
/*
Router.onBeforeAction( OnBeforeActions.loginRequired ,{
  only:['create','videos']

});
*/

Router.onBeforeAction(function( ){
  if (Meteor.isClient && typeof window !== "undefined" ){

  	window.__ad__ = window.__ad__ || {};
  	var Ad = window.__ad__
  	;

    if ( Meteor.userId() ){
      Session.set('userId', Meteor.userId());


    }

    $('.grid.primary').removeClass("fadeIn");
    Ad.Util.scroll_to_top();
    Ad.Util.show_header_text();
  }

  this.next();

});

Router.onAfterAction(function( req, res, next ){

  if (Meteor.isClient && typeof window !== "undefined" ){

  	window.__ad__ = window.__ad__ || {};
  	var Ad = window.__ad__
  	;


    $('.grid.primary').addClass("fadeIn");
    setTimeout(function(){
      $('.grid.primary').removeClass("fadeIn");
    }, 500);

    // Append .background-image-holder <img>'s as CSS backgrounds
    setTimeout(function(){

      $('.background-image-holder').each(function() {
          var imgSrc = $(this).children('img').attr('src');
          $(this).css('background', 'url("' + imgSrc + '")');
          $(this).children('img').hide();
          $(this).css('background-position', 'initial');
      });

      // Fade in background images

      setTimeout(function() {
          $('.background-image-holder').each(function() {
              $(this).addClass('fadeIn');
          });
      }, 200);

    }, 1000)



    Tracker.afterFlush(function(){

      var isAppInitialized = angular.element(document).scope();

      if (angular.isUndefined(isAppInitialized)) {
        angular.bootstrap(document, ['app']);

      }


    });

  }

});
