/*
Template.readingLayout.onRendered(function() {
  ReactDOM.render(<Reading />, document.getElementById("reading"));
  ReactDOM.render(<AnnotateWidget />, document.getElementById("annotate-widget"));
  ReactDOM.render(<CommentaryPanel />, document.getElementById("commentary-panel"));
  ReactDOM.render(<DefinitionsPanel />, document.getElementById("definitions-panel"));

});

Template.headerReading.events = {
  "click .meta-toggle": function(e) {
    var $target = $(e.target);

    if (!$target.hasClass("meta-toggle")) {
      $target = $target.parents(".meta-toggle");

    }

    if ($target.hasClass("checked")) {
      $target.removeClass("checked");
      if ($target.data().type === "definitions") {
        $(".definitions-panel").removeClass("slide-visible");
        $("#reading").removeClass("with-definitions-shown");
        $(".definitions").scrollLock(false);

      } else if ($target.data().type === "commentary") {
        $(".commentary-panel").removeClass("commentary-visible");

        if(!$(".commentary-panel").hasClass("translations-visible")){
          $(".commentary-panel").removeClass("slide-visible");
          $("#reading").removeClass("with-commentary-shown");
          $(".comments").scrollLock(false);

        }

      } else if ($target.data().type === "translations") {
        $(".commentary-panel").removeClass("translations-visible");

        if(!$(".commentary-panel").hasClass("commentary-visible")){
          $(".commentary-panel").removeClass("slide-visible");
          $("#reading").removeClass("with-commentary-shown");
          $(".translations").scrollLock(false);

        }

      }

    } else {
      $target.addClass("checked");
      if ($target.data().type === "definitions") {
        $(".definitions-panel").addClass("slide-visible");
        $("#reading").addClass("with-definitions-shown");
        $(".definitions").scrollLock(true);

      } else if ($target.data().type === "commentary") {
        $(".commentary-panel").addClass("slide-visible");
        $(".commentary-panel").addClass("commentary-visible");
        $("#reading").addClass("with-commentary-shown");
        $(".comments").scrollLock(true);

      } else if ($target.data().type === "translations") {
        $(".commentary-panel").addClass("slide-visible");
        $(".commentary-panel").addClass("translations-visible");
        $("#reading").addClass("with-commentary-shown");
        $(".translations").scrollLock(true);

      }

    }


  },
  "click .close-definitions-panel": function(e) {
    return $(".definitions-panel").removeClass("slide-visible");

  },
  "click .close-commentary-panel": function(e) {
    return $(".commentary-panel").removeClass("slide-visible");

  }
};
*/
