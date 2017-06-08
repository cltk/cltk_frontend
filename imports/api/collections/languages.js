import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Languages = new Meteor.Collection('languages');

Languages.schema = new SimpleSchema({
	title: {
		type: String,
		max: 60,
	},

	slug: {
		type: String,
		max: 200,
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

Languages.attachSchema(Languages.schema);
Languages.friendlySlugs('title');

export default Languages;
