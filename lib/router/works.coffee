
Router.map ->
  @route "works",
    path: "/works"

  @route "workDetail",
    path: "/works/histories"
    layoutTemplate: "pageLayout"

  @route "reading",
    path: "/works/histories/1"
    layoutTemplate: "readingLayout"
