this.Works = new Meteor.Collection('works');

Schemas.Works = new SimpleSchema({
  english_title: {
    type: String,
    max: 60,
    optional: true,
  },
  original_title: {
    type: String,
    max: 60,
    optional: true,
  },
  title: {
    type: String,
    max: 60
  },
  slug: {
    type: String,
    max: 60
  },
  language: {
    type: String,
    max: 60
  },
  corpus: {
    type: String,
    max: 60
  },
  author: {
    type: String,
    max: 60
  },
  structure: {
    type: String,
    optional: true,
    max: 60
  },
  editors: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    autoform: {
      options: function() {
        return _.map(Meteor.authors.find().fetch(), function(author) {
          return {
            label: author.title,
            value: author._id
          };
        });
      }
    }
  },

	createdAt: {
		type: Date,
		optional: true,
		autoValue: function() {
			if (this.isInsert) {
				return new Date;
			}
		},
		autoform: {
			type: "hidden",
			label: false
		}
	},
	updatedAt: {
		type: Date,
		optional: true,
		autoValue: function() {
			if (this.isUpdate) {
				return new Date;
			}
		},
		autoform: {
			type: "hidden",
			label: false
		}
	},

});

Works.attachSchema(Schemas.Works);
