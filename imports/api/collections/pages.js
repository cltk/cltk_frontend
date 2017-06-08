import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Pages = new Meteor.Collection('pages');

Pages.schema = new SimpleSchema({
	title: {
		type: String,
	},
	subtitle: {
		type: String,
		optional: true,
	},
	headerImage: {
		type: [String],
		optional: true,
	},
	slug: {
		type: String,
		optional: true,
	},
	byline: {
		type: String,
		optional: true,
	},
	tenantId: {
		type: String,
		optional: true,
	},
	content: {
		type: String,
		optional: true,
	},
});

Pages.attachSchema(Pages.schema);
Pages.friendlySlugs('title');
Pages.attachBehaviour('timestampable');

export default Pages;
