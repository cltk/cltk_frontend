@Subworks = new Meteor.Collection('subworks');

Schemas.Subworks = new SimpleSchema
	title:
		type:String
		max: 60

	slug:
		type:String
		max: 60

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


Subworks.attachSchema(Schemas.Subworks)
