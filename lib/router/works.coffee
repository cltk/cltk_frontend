
Router.map ->
  @route "works",
    path: "/works"

  @route "workDetail",
    path: "/works/georgics"

  @route "reading",
    path: "/works/georgics/1"
    layoutTemplate: "readingLayout"
