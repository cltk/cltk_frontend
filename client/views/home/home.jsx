Template.home.onRendered(function() {
  var options, w, winHeight, winWidth;
  w = new WOW().init();
  winWidth = $(window).width();
  winHeight = $(window).height();

  $("#intro").css({
    width: winWidth,
    height: winHeight
  });

  $(window).resize(function() {
    return $("#intro").css({
      width: $(window).width(),
      height: $(window).height()
    });
  });

  if (!Utils.isMobile) {
    options = {
      forceHeight: false,
      smoothScrolling: false
    };
    return skrollr.init(options).refresh();
  }


});


Template.home.destroyed = function() {
  return $('body').attr('style', '');
};

Template.home.events = {
  "focus .header-search": function(e) {
    $("section#intro").addClass("header-search-enabled");
    $("section#intro").removeClass("fullscreen");
    $(".header-container").removeClass("v-align-transform");
    $("section#intro").css("height", "auto");
    $("section#beliefs").hide();
    $("section#about").hide();
    $("section#features").hide();
    $("section#get-started").hide();
    $("section#build").hide();
    $("section#intro .learn-more-button").fadeOut();
    $("section#intro h1").fadeOut();
    $("section#intro h6").fadeOut();
    $(".header-search-results").fadeIn();
    return $(".home-layout").removeClass("home-layout").addClass("master-layout");
  }
};
