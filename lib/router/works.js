Router.map(function() {
  this.route("works", {
    path: "/works"
  });
  this.route("workDetail", {
    path: "/works/histories",
    layoutTemplate: "pageLayout"
  });
  this.route("readingBookChapterSection", {
    path: "/works/histories/1",
    layoutTemplate: "readingLayout"
  });
  return this.route("readingBookLine", {
    path: "/works/aeneid/1",
    layoutTemplate: "readingLayout"
  });
});
