var OnBeforeActions;
OnBeforeActions = {
    loginRequired: function(pause) {

      if (!Meteor.userId()) {

        this.render('login');
        return pause();
      }else {

        this.next();

      }

    }
};


Router.onBeforeAction(function( ){
  if (Meteor.isClient && typeof window !== "undefined" ){

    if ( Meteor.userId() ){
      Session.set('userId', Meteor.userId());


    }

  }

  this.next();

});

Router.onAfterAction(function( req, res, next ){

  if (Meteor.isClient && typeof window !== "undefined" ){

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

    }, 500)




  }

});
