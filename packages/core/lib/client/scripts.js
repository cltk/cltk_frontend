(function($){

var mr_firstSectionHeight,
    mr_nav,
    mr_navOuterHeight,
    mr_navScrolled = false,
    mr_navFixed = false,
    mr_outOfSight = false,
    mr_floatingProjectSections,
    mr_scrollTop = 0;

$(document).ready(function() {
  "use strict";

  // Smooth scroll to inner links

  $('.inner-link').each(function(){
      var href = $(this).attr('href');
      if(href.charAt(0) !== "#"){
          $(this).removeClass('inner-link');
      }
  });

	if($('.inner-link').length){
		$('.inner-link').smoothScroll({
			offset: -55,
			speed: 800
		});
  }

  // Update scroll variable for scrolling functions

  addEventListener('scroll', function() {
      mr_scrollTop = window.pageYOffset;
  }, false);

  // Append .background-image-holder <img>'s as CSS backgrounds

  $('.background-image-holder').each(function() {
      var imgSrc = $(this).children('img').attr('src');
      $(this).css('background', 'url("' + imgSrc + '")');
      $(this).children('img').hide();
      $(this).css('background-position', 'initial');
  });


  // Mobile Menu

  $('.mobile-toggle').click(function() {
      $('.nav-bar').toggleClass('nav-open');
      $(this).toggleClass('active');
  });

  $('.menu li').click(function(e) {
      if (!e) e = window.event;
      e.stopPropagation();
      if ($(this).find('ul').length) {
          $(this).toggleClass('toggle-sub');
      } else {
          $(this).parents('.toggle-sub').removeClass('toggle-sub');
      }
  });

  $('.module.widget-handle').click(function() {
      $(this).toggleClass('toggle-widget-handle');
  });

  $('.search-widget-handle .search-form input').click(function(e){
      if (!e) e = window.event;
      e.stopPropagation();
  });

  // Local Videos

  $('section').closest('body').find('.local-video-container .play-button').click(function() {
      $(this).siblings('.background-image-holder').removeClass('fadeIn');
      $(this).siblings('.background-image-holder').css('z-index', -1);
      $(this).css('opacity', 0);
      $(this).siblings('video').get(0).play();
  });

  // Youtube Videos

  $('section').closest('body').find('.player').each(function() {
      var section = $(this).closest('section');
      section.find('.container').addClass('fadeOut');
      var src = $(this).attr('data-video-id');
      var startat = $(this).attr('data-start-at');
      $(this).attr('data-property', "{videoURL:'http://youtu.be/" + src + "',containment:'self',autoPlay:true, mute:true, startAt:" + startat + ", opacity:1, showControls:false}");
  });


  // Disable parallax on mobile

  if ((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
      $('section').removeClass('parallax');
  }


});

$(window).load(function() {
    "use strict";


    mr_firstSectionHeight = $('.main-container section:nth-of-type(1)').outerHeight(true);


});


})(jQuery);
