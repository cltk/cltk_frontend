Router.map(function() {
  this.route("home", {
    path: "/",
    layoutTemplate: "homeLayout"
  });
  this.route("dashboard", {
    path: "/dashboard",
    waitOn: function() {
      return [subs.subscribe('works'), subs.subscribe('texts'), subs.subscribe('authors')];
    }
  });
  this.route("search", {
    path: "/search",
    waitOn: function() {
      return [subs.subscribe('works')];
    },
    layoutTemplate: "homeLayout"
  });
  this.route("about", {
    path: "/about",
    layoutTemplate: "homeLayout"
  });
  this.route("browse", {
    path: "/browse",
    waitOn: function() {
      return [subs.subscribe('works')];
    },
    layoutTemplate: "homeLayout"
  });
  return this.route("terms", {
    path: "/terms",
    layoutTemplate: "homeLayout"
  });
});
