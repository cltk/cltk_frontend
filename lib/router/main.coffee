Router.map ->
  @route "home",
    path: "/"
    layoutTemplate: "homeLayout"

  @route "dashboard",
    path: "/dashboard"
    waitOn: ->
      [
        subs.subscribe 'posts'
        subs.subscribe 'comments'
        subs.subscribe 'attachments'
      ]
    data: ->
      posts: Posts.find({},{sort: {createdAt: -1}}).fetch()

  @route "search",
    path: "/search"
    layoutTemplate: "homeLayout"

  @route "about",
    path: "/about"
    layoutTemplate: "homeLayout"

  @route "browse",
    path: "/browse"
    layoutTemplate: "homeLayout"

  @route "terms",
    path: "/terms"
    layoutTemplate: "homeLayout"
