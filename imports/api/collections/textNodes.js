import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const TextNodes = new Meteor.Collection('texts');

TextNodes.schema = new SimpleSchema({
	index: {
		type: Number,
		min: 0,
	},
	location: {
		type: [Number],
	},
	textLanguage: {
		type: String,
		max: 60,
	},
	corpus: {
		type: String,
		max: 60,
	},
	author: {
		type: String,
		max: 60,
	},
	work: {
		type: String,
		max: 60,
	},
	edition: {
		type: String,
		max: 60,
		optional: true,
	},

	speakerName: {
		type: String,
		max: 60,
		optional: true,
	},

	text: {
		type: String,
	},
	html: {
		type: String,
	},
	comments: {
		type: [String],
		optional: true,
	},

	entities: {
		type: [String],
		optional: true,
	},

	mediaItems: {
		type: [String],
		optional: true,
	},

	annotations: {
		type: [String],
		optional: true,
	},

	relatedPassages: {
		type: [String],
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
	},

});

TextNodes.attachSchema(TextNodes.schema);

export default TextNodes;
