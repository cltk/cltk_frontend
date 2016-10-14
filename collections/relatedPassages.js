this.RelatedPassages = new Meteor.Collection('relatedPassages');

Schemas.RelatedPassages = new SimpleSchema({
	user: {
		type: String,
	},
	textNodeA: {
		type: String,
	},
	textNodeB: {
		type: String,
	},


	createdAt: {
		type: Date,
		optional: true,
		autoValue() {
			if (this.isInsert) {
				return new Date();
			}
			return null;
		},
		autoform: {
			type: 'hidden',
			label: false,
		},
	},
	updatedAt: {
		type: Date,
		optional: true,
		autoValue() {
			if (this.isUpdate) {
				return new Date();
			}
			return null;
		},
		autoform: {
			type: 'hidden',
			label: false,
		},
	},
});

RelatedPassages.attachSchema(Schemas.RelatesPassages);
