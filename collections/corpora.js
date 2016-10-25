this.Corpora = new Meteor.Collection('corpora');

Schemas.Corpora = new SimpleSchema({
	title: {
		type: String,
		max: 60,
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

	corpusLanguage: {
		type: String,
		max: 60,
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

Corpora.attachSchema(Schemas.Corpora);
Corpora.friendlySlugs('title');
