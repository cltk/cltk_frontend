const TextNodes = new Meteor.Collection('texts');

TextNodes.schema = new SimpleSchema({
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
		optional: true,
	},

	speakerName: {
		type: String,
		max: 60,
		optional: true,
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
		type: [String],
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

TextNodes.attachSchema(TextNodes.schema);

export default TextNodes;
