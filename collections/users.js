Schemas.UserProfile = new SimpleSchema({
	picture: {
		type: String,
		optional: true,
		label: 'Profile picture',
		autoform: {
			afFieldInput: {
				type: 'fileUpload',
				collection: 'ProfilePictures',
			},
		},
	},
	firstName: {
		type: String,
		optional: true,
	},
	lastName: {
		type: String,
		optional: true,
	},
	birthday: {
		type: Date,
		optional: true,
	},
	bio: {
		type: String,
		optional: true,
		autoform: {
			rows: 4,
		},
	},
	country: {
		type: String,
		label: 'Nationality',
		optional: true,
	},
	twitter: {
		type: String,
		label: 'Twitter',
		optional: true,
	},
	google: {
		type: String,
		label: 'Google Plus',
		optional: true,
	},
	facebook: {
		type: String,
		label: 'Facebook',
		optional: true,
	},
});

Schemas.User = new SimpleSchema({
	username: {
		type: String,
		regEx: /^[a-z0-9A-Z_]{3,15}$/,
		optional: true,
	},
	emails: {
		type: [Object],
		optional: true,
	},
	'emails.$.address': {
		type: String,
		regEx: SimpleSchema.RegEx.Email,
	},
	'emails.$.verified': {
		type: Boolean,
	},
	profile: {
		type: Schemas.UserProfile,
		optional: true,
	},
	services: {
		type: Object,
		optional: true,
		blackbox: true,
	},
	roles: {
		type: [String],
		blackbox: true,
		optional: true,
	},
	bookmarks: {
		type: [String],
		optional: true,
	},
	avatar: {
		type: Object,
		optional: true,
	},
	'avatar._id': {
		type: String,
	},
	'avatar.type': {
		type: String,
	},
	'avatar.url': {
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

Meteor.users.attachSchema(Schemas.User);
this.Users = Meteor.users;
this.StarterSchemas = Schemas;
