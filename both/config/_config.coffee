@Config =
	name: 'Classical Languages Archive'
	title: ->
			TAPi18n.__ 'configTitle'
	subtitle: ->
			TAPi18n.__ 'configSubtitle'
	logo: ->
		'<b>' + @name + '</b>'
	footer: ->
		@name + ' - Copyright ' + new Date().getFullYear()
	emails:
		from: 'noreply@' + Meteor.absoluteUrl()
	blog: 'http://cla.archimedes.digital'
	about: 'http://cla.archimedes.digital'
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
