import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Translations = new Meteor.Collection('translations');

Translations.schema = new SimpleSchema({
	n_1: {
		type: Number,
		min: 0,
	},
	n_2: {
		type: Number,
		optional: true,
		min: 0,
	},
	n_3: {
		type: Number,
		optional: true,
		min: 0,
	},
	n_4: {
		type: Number,
		optional: true,
		min: 0,
	},
	n_5: {
		type: Number,
		optional: true,
		min: 0,
	},
	translationLanguage: {
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
	translator: {
		type: String,
		max: 160,
	},
	text: {
		type: String,
	},
	html: {
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

Translations.attachSchema(Translations.schema);
export default Translations;
