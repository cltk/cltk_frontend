
Router.map ->
  @route "works",
    path: "/works"

  @route "workDetail",
    path: "/works/histories"
    layoutTemplate: "pageLayout"

  @route "readingBookChapterSection",
    path: "/works/histories/1"
    layoutTemplate: "readingLayout"

  @route "readingBookLine",
    path: "/works/aeneid/1"
    layoutTemplate: "readingLayout"
