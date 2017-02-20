const Annotations = new Meteor.Collection('annotations');

Annotations.schema = new SimpleSchema({
	user: {
		type: String,
	},
	textNode: {
		type: String,
	},
	content: {
		type: String,
	},
	isPrivate: {
		type: Boolean,
	},
	parentId: {
		type: String,
		optional: true,
	},
	status: {
		type: String,
		optional: true,
	},
	votes: {
		type: Number,
		optional: true,
	},
	voters: {
		type: [Meteor.user],
		optional: true,
	},
	reported: {
		type: Number,
		optional: true,
	},
	usersReported: {
		type: [Meteor.user],
		optional: true,
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

Annotations.attachSchema(Annotations.schema);
export default Annotations;
