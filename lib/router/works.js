Router.map(function() {
  this.route("works", {
    path: "/works",
    waitOn: function() {
      return [subs.subscribe('works')];
    },
  });
  this.route("reading", {
    path: "/works/:slug/1",
    waitOn: function() {
      return [subs.subscribe('works'), subs.subscribe('texts')];
    },
    layoutTemplate: "readingLayout"
  });
});
