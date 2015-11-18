@Config =
	name: 'Classical Languages Archive'
	title: ->
			TAPi18n.__ 'Classical Languages Archive'
	subtitle: ->
			TAPi18n.__ 'Classical Languages Archive'
	logo: ->
		'<b>' + @name + '</b>'
	footer: ->
		@name + ' - Copyright ' + new Date().getFullYear()
	emails:
		from: 'noreply@' + Meteor.absoluteUrl()
	blog: 'http://cla.dev'
	about: 'http://cla.dev'
	username: false
	homeRoute: '/dashboard'
	socialMedia:
		[
			['http://facebook.com/cla','facebook']
			['http://twitter.com/cla','twitter']
			['http://github.com/cla','github']
		]

Avatar.options =
	customImageProperty: 'profile.picture'

Meteor.startup ->
	if Meteor.isClient
		TAPi18n.setLanguage('en')
