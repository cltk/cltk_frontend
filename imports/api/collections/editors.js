import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Editors = new Meteor.Collection('editors');

Editors.schema = new SimpleSchema({
	english_name: {
		type: String,
		max: 60,
	},
	original_name: {
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

Editors.attachSchema(Editors.schema);
Editors.friendlySlugs('english_name');

export default Editors;
