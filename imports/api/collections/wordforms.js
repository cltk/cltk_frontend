import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Wordforms = new Meteor.Collection('wordforms');

Wordforms.schema = new SimpleSchema({
	word: {
		type: String,
		max: 60,
	},

	definitions: {
		type: String,
	},
	texts: {
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

Wordforms.attachSchema(Wordforms.schema);

export default Wordforms;
