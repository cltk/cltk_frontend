const RelatedPassages = new Meteor.Collection('relatedPassages');

RelatedPassages.schema = new SimpleSchema({
	textNodeA: {
		type: String,
	},

	textNodeB: {
		type: String,
	},

	threshold: {
		type: Number,
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

RelatedPassages.attachSchema(RelatedPassages.schema);

export default RelatedPassages;
