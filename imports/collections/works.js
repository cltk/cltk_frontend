const Works = new Meteor.Collection('works');

Works.schema = new SimpleSchema({
	english_title: {
		type: String,
		optional: true,
	},
	original_title: {
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

	workLanguage: {
		type: String,
		max: 60,
	},

	corpus: {
		type: String,
		max: 60,
	},

	date: {
		type: String,
		label: 'Flexible date field (whatever should be used for display)',
		optional: true,
	},
	dateStart: {
		type: Date,
		label: 'Start date (for search tools)',
		optional: true,
	},
	dateEnd: {
		type: Date,
		label: 'End date (for search tools)',
		optional: true,
	},
	authors: {
		type: [String],
		regEx: SimpleSchema.RegEx.Id,
		optional: true,
		autoform: {
			options() {
				return _.map(Authors.find().fetch(), author => ({
					label: author.english_name,
					value: author._id,
				}));
			},
		},
	},

	edition: {
		type: String,
		optional: true,
	},

	editors: {
		type: [String],
		regEx: SimpleSchema.RegEx.Id,
		optional: true,
		autoform: {
			options() {
				return _.map(Editors.find().fetch(), editor => ({
					label: editor.english_name,
					value: editor._id,
				}));
			},
		},
	},

	structure: {
		type: String,
		optional: true,
	},
	form: {
		type: String,
		optional: true,
	},

	coverImage: {
		type: String,
		optional: true,
		label: 'Cover Image',
		autoform: {
			type: 'ufs',
			collection: 'images',
			store: 'ImageStore',
			publication: 'images',
			thumbnails: 'thumbnails',
		},
	},


	countComments: {
		type: Number,
		optional: true,
	},
	countTranslations: {
		type: Number,
		optional: true,
	},
	countEntities: {
		type: Number,
		optional: true,
	},
	countAnnotations: {
		type: Number,
		optional: true,
	},

	rangeN1: {
		type: Object,
		optional: true,
	},
	'rangeN1.low': {
		type: Number,
		optional: true,
	},
	'rangeN1.high': {
		type: Number,
		optional: true,
	},
	rangeN2: {
		type: Object,
		optional: true,
	},
	'rangeN2.low': {
		type: Number,
		optional: true,
	},
	'rangeN2.high': {
		type: Number,
		optional: true,
	},
	rangeN3: {
		type: Object,
		optional: true,
	},
	'rangeN3.low': {
		type: Number,
		optional: true,
	},
	'rangeN3.high': {
		type: Number,
		optional: true,
	},
	rangeN4: {
		type: Object,
		optional: true,
	},
	'rangeN4.low': {
		type: Number,
		optional: true,
	},
	'rangeN4.high': {
		type: Number,
		optional: true,
	},
	rangeN5: {
		type: Object,
		optional: true,
	},
	'rangeN5.low': {
		type: Number,
		optional: true,
	},
	'rangeN5.high': {
		type: Number,
		optional: true,
	},

	tags: {
		type: [String],
		optional: true,
	},

	featureOnHomepage: {
		type: Boolean,
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

Works.attachSchema(Works.schema);
Works.friendlySlugs('original_title');


export default Works;
