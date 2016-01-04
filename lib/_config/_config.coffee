# These values get propagated through the app
# E.g. The 'name' and 'subtitle' are used in seo.coffee

@Config =

	# Basic Details
	name: 'Classical Languages Archive'
	title: ->
			TAPi18n.__ 'configTitle'
	subtitle: ->
			TAPi18n.__ 'configSubtitle'
	logo: ->
		'<b>' + @name + '</b>'
	footer: ->
		@name + ' - Copyright ' + new Date().getFullYear()

	# Emails
	emails:
		from: 'no-reply@' + Meteor.absoluteUrl()
		contact: 'contact' + Meteor.absoluteUrl()

	# Username - if true, users are forced to set a username
	username: false

	# Localisation
	defaultLanguage: 'en'
	dateFormat: 'D/M/YYYY'

	# Meta / Extenrnal content
	privacyUrl: 'http:/cla.dev/terms'
	termsUrl: 'http:/cla.dev/terms'

	# For email footers
	legal:
		address: ''
		name: 'Classical Languages Archive'
		url: 'http://cla.dev'

	about: 'http:/cla.dev/about'
	blog: 'http://cla.dev/blog'

	socialMedia:
		facebook:
			url: 'http://facebook.com/'
			icon: 'facebook'
		twitter:
			url: 'http://twitter.com/@classicsarchive'
			icon: 'twitter'
		github:
			url: 'http://github.com/cltk/cltk_frontend'
			icon: 'github'
		info:
			url: 'http://cla.dev/about'
			icon: 'link'

	#Routes
	homeRoute: '/'
	publicRoutes: [
		'home',
		'works',
		'workDetail',
		'readingBookChapterSection',
		'readingBookLine',
		'about',
		'search',
		'browse',
		'terms'
	]
	dashboardRoute: '/dashboard'
