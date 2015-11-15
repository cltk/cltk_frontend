@Texts = new Meteor.Collection('texts');

Schemas.Texts = new SimpleSchema

	n:
		type: Number
		min: 0

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

	work:
		type: String
		regEx: SimpleSchema.RegEx.Id
		autoform:
			options: ->
				_.map Meteor.works.find().fetch(), (work)->
					label: work.title
					value: work._id

	subwork:
		type: String
		regEx: SimpleSchema.RegEx.Id
		autoform:
			options: ->
				_.map Meteor.subworks.find().fetch(), (subwork)->
					label: subwork.title
					value: subwork._id

	content:
		type: String
		autoform:
			rows: 5


Subworks.attachSchema(Schemas.Subworks)
