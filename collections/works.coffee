@Works = new Meteor.Collection('works');

Schemas.Works = new SimpleSchema
	title:
		type:String
		max: 60

	slug:
		type:String
		max: 60

	createdAt:
		type: Date
		autoValue: ->
			if this.isInsert
				new Date()

	updatedAt:
		type:Date
		optional:true
		autoValue: ->
			if this.isUpdate
				new Date()

	authors:
		type: String
		regEx: SimpleSchema.RegEx.Id
		autoform:
			options: ->
				_.map Meteor.authors.find().fetch(), (author)->
					label: author.title
					value: author._id

	editors:
		type: String
		regEx: SimpleSchema.RegEx.Id
		autoform:
			options: ->
				_.map Meteor.authors.find().fetch(), (author)->
					label: author.title
					value: author._id

Works.attachSchema(Schemas.Works)
