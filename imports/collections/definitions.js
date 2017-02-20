const Definitions = new Meteor.Collection('definitions');

Definitions.schema = new SimpleSchema({
	headword: {
		type: String,
		max: 60,
	},
	pos: {
		type: String,
	},
	definition: {
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

Definitions.attachSchema(Definitions.schema);

export default Definitions;
