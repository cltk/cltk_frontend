
Router.map ->
  @route "works",
    path: "/works"

  @route "workDetail",
    path: "/works/histories"
    layoutTemplate: "pageLayout"

  @route "readingFiction",
    path: "/works/histories/1"
    layoutTemplate: "readingLayout"

  @route "readingPoetry",
    path: "/works/aeneid/1"
    layoutTemplate: "readingLayout"
