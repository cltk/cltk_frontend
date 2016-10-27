this.Texts = new Meteor.Collection('texts');

Schemas.Texts = new SimpleSchema({
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
	textLanguage: {
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
	edition: {
		type: String,
		max: 60,
	},

	text: {
		type: String,
		autoform: {
			rows: 5,
		},
	},
	html: {
		type: String,
		autoform: {
			rows: 5,
		},
	},
	comments: {
		type: [String],
		optional: true,
	},

	entities: {
		type: [String],
		regEx: SimpleSchema.RegEx.Id,
		optional: true,
		autoform: {
			options() {
				return _.map(Entities.find().fetch(), entity => ({
					label: entity.english_name,
					value: entity._id,
				}));
			},
		},
	},

	mediaItems: {
		type: [String],
		optional: true,
		autoform: {
			afFieldInput: {
				type: 'fileUpload',
				collection: 'Attachments',
			},
		},
	},

	annotations: {
		type: [String],
		regEx: SimpleSchema.RegEx.Id,
		optional: true,
	},

	relatedPassages: {
		type: [Object],
		optional: true,
	},

	'relatedPassages.$.workId': {
		type: String,
		optional: true,
	},

	'relatedPassages.$.englishTitle': {
		type: String,
		optional: true,
	},

	'relatedPassages.$.edition': {
		type: String,
		optional: true,
	},

	'relatedPassages.$.location': {
		type: String,
		optional: true,
	},

	'relatedPassages.$.textNodes': {
		type: [Object],
		optional: true,
	},

	'relatedPassages.$.textNodes.$.text': {
		type: [Object],
		optional: true,
	},

	'relatedPassages.$.textNodes.$.n': {
		type: [Object],
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

Texts.attachSchema(Schemas.Texts);
