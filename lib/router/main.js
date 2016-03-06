Router.map(function() {
  this.route("home", {
    path: "/",
    layoutTemplate: "homeLayout"
  });
  this.route("dashboard", {
    path: "/dashboard",
    waitOn: function() {
      return [subs.subscribe('posts'), subs.subscribe('comments'), subs.subscribe('attachments')];
    },
    data: function() {
      return {
        posts: Posts.find({}, {
          sort: {
            createdAt: -1
          }
        }).fetch()
      };
    }
  });
  this.route("search", {
    path: "/search",
    layoutTemplate: "homeLayout"
  });
  this.route("about", {
    path: "/about",
    layoutTemplate: "homeLayout"
  });
  this.route("browse", {
    path: "/browse",
    layoutTemplate: "homeLayout"
  });
  return this.route("terms", {
    path: "/terms",
    layoutTemplate: "homeLayout"
  });
});
