import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const UserProfile = new SimpleSchema({
	name: {
		type: String,
		optional: true,
	},

	birthday: {
		type: Date,
		optional: true,
	},

	biography: {
		type: String,
		optional: true,
	},

	publicEmailAddress: {
		type: String,
		optional: true,
	},
	academiaEdu: {
		type: String,
		optional: true,
	},
	twitter: {
		type: String,
		optional: true,
	},
	facebook: {
		type: String,
		optional: true,
	},
	google: {
		type: String,
		optional: true,
	},
	avatarUrl: {
		type: String,
		optional: true,
	},
	location: {
		type: String,
		optional: true,
	},
	country: {
		type: String,
		optional: true,
	},
});

const User = new SimpleSchema({
	_id: {
		type: String,
	},
	username: {
		type: String,
		optional: true,
	},
	isAnnotator: {
		type: Boolean,
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
		type: UserProfile,
		optional: true,
	},
	services: {
		type: Object,
		optional: true,
	},
	'services.password.bcrypt': {
		type: String,
		optional: true,
	},
	'services.resume.loginTokens': {
		type: [Object],
		optional: true,
	},
	'services.email.verificationTokens': {
		type: [Object],
		optional: true,
	},
	roles: {
		type: [String],
		optional: true,
	},
	canEditCommenters: {
		type: [String],
		optional: true,
	},
	bookmarks: {
		type: Array,
		optional: true,
	},
	'bookmarks.$': {
		type: Object,
		optional: true,
	},
	canAnnotateBooks: {
		type: Array,
		optional: true,
	},
	'canAnnotateBooks.$': {
		type: String,
		optional: true,
	},
	authorOfBooks: {
		type: Array,
		optional: true,
	},
	'authorOfBooks.$': {
		type: String,
		optional: true,
	},
	highlightingPreference: {
		type: Boolean,
		optional: true,
	},
	recentPositions: {
		type: Array,
		optional: true,
	},
	'recentPositions.$': {
		type: Object,
		optional: true,
	},
	'recentPositions.$.author': {
		type: String,
		optional: true,
	},
	'recentPositions.$.title': {
		type: String,
		optional: true,
	},
	'recentPositions.$.subtitle': {
		type: String,
		optional: true,
	},
	'recentPositions.$.link': {
		type: Number,
		optional: true,
	},
	'recentPositions.$.activeElem': {
		type: Number,
		optional: true,
	},
	createdAt: {
		type: Date,
		optional: true,
	},
	createdBy: {
		type: String,
		optional: true,
	},
	updatedAt: {
		type: Date,
		optional: true,
	},
	updatedBy: {
		type: String,
		optional: true,
	},
});

Meteor.users.schema = User;
Meteor.users.attachSchema(User);

Meteor.users.attachBehaviour('timestampable', {
	createdAt: 'created',
	createdBy: 'createdBy',
	updatedAt: 'updated',
	updatedBy: 'updatedBy',
});

Meteor.users.allow({
	update: (userId) => {
		if (Meteor.userId() === userId) {
			return true;
		}
		return false;
	},
});
