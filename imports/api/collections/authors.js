import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Authors = new Meteor.Collection('authors');

Authors.schema = new SimpleSchema({
	english_name: {
		type: String,
		optional: true,
	},
	original_name: {
		type: String,
		optional: true,
	},

	slug: {
		type: String,
		max: 200,
		optional: true,
	},

	authorLanguages: {
		type: [String],
		max: 60,
	},

/*
corpus: {
type: String,
max: 60
},*/

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

Authors.attachSchema(Authors.schema);
Authors.friendlySlugs('english_title');

export default Authors;
