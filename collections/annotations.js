this.Annotations = new Meteor.Collection('annotations');

Schemas.Annotations = new SimpleSchema({
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
		type: [Schemas.User],
		optional: true,
	},
	reported: {
		type: Number,
		optional: true,
	},
	usersReported: {
		type: [Schemas.User],
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

Annotations.attachSchema(Schemas.Annotations);
