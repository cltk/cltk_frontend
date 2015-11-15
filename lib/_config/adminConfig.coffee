@AdminConfig =
	name: Config.name
	collections:

		Authors:
			color: 'blue'
			icon: 'pencil'
			tableColumns: [
				{ label: 'Title', name: 'title' }
			]

		Editors:
			color: 'blue'
			icon: 'pencil'
			tableColumns: [
				{ label: 'Title', name: 'title' }
			]

		Works:
			color: 'blue'
			icon: 'pencil'
			extraFields: ['authors', 'editors']
			tableColumns: [
				{ label: 'Title', name: 'title' }
			]

		Subworks:
			color: 'blue'
			icon: 'pencil'
			tableColumns: [
				{ label: 'Title', name: 'title' }
				{ label: 'N', name: 'n' }
			]

		Texts:
			color: 'blue'
			icon: 'pencil'
			tableColumns: [
				{ label: 'N', name: 'n' }
			]

		Posts:
			color: 'red'
			icon: 'pencil'
			extraFields: ['owner']
			tableColumns: [
				{ label: 'Title', name: 'title' }
				{ label: 'User', name: 'author()', template: 'adminUserCell' }
			]

		Comments:
			color: 'green'
			icon: 'comments'
			extraFields: ['doc', 'owner']
			tableColumns: [
				{ label: 'Content', name: 'content' }
				{ label: 'Post', name: 'docTitle()', template: 'adminPostCell' }
				{ label: 'User', name: 'author()', template: 'adminUserCell' }
			]
			children: [
				{
					find: (comment) ->
						Posts.find comment.doc, limit: 1
				}
				{
					find: (comment) ->
						Meteor.users.find comment.owner, limit: 1
				}
			]

	dashboard:
		homeUrl: '/dashboard'

	autoForm:
		omitFields: ['createdAt', 'updatedAt']
