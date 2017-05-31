import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


const Entities = new Meteor.Collection('entities');

Entities.schema = new SimpleSchema({
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

	location: {
		type: String,
		optional: true,
	},

	createdAt: {
		type: Date,
		optional: true,
	},
	updatedAt: {
		type: Date,
		optional: true,
	},

});

Entities.attachSchema(Entities.schema);
Entities.friendlySlugs('english_title');

export default Entities;
