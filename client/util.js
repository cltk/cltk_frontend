if (Meteor.isClient) {

( function( $ ) {
	'use strict';

	window.__ad__ = window.__ad__ || {};
	var Ad = window.__ad__;

	Ad.Util = {

		check_mobile : function () {
			// Not reliable / futureproof -- Integrate this check with responsive css in the future
			return /iPhone|iPod|iPad|Android|BlackBerry/.test( navigator.userAgent );
		},


		scroll_to_top : function(){

			$("html,body").animate({
				scrollTop : $('body').offset().top
			}, 500);

		},

		scroll_to_elem : function( selector ){

			$("html,body").animate({
				scrollTop : $( selector ).offset().top
			}, 500);

		},

		show_header_text : function(){
      setTimeout( function(){
          $("header").fadeIn();
			}, 300);

      setTimeout( function(){
          $(".block#head h1").addClass("step-visible");
          $(".block#head hr").addClass("step-visible");
          $(".block#head p").addClass("step-visible");
          $(".block#head .direct-down").addClass("step-visible");
          $(".block#head .head-block-button").addClass("step-visible");
        }, 800);

		},

		init_headroom : function(){

      // construct an instance of Headroom, passing the element
      var headroom  = new Headroom( document.getElementById("header") );
      // initialise
      headroom.init();

    }

	};



	// truncate string on word boundary
	String.prototype.trunc = String.prototype.trunc ||
	  function(n){
		  return this.length>n ? this.substr(0,n-1)+' &hellip;' : this;
	  };

	// capitalize a string
	String.prototype.capitalize = function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	}


// End self calling jQuery
})( jQuery );

// End Meteor.isClient
}
