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
		autoform: {
			type: 'hidden',
			label: false,
		},
	},

	location: {
		type: String,
		optional: true,
		autoform: {
			type: 'map',
			geolocation: true,
			searchBox: true,
			autolocate: true,
		},
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

Entities.attachSchema(Entities.schema);
Entities.friendlySlugs('english_title');

export default Entities;
