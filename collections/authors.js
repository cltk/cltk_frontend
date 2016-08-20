this.Authors = new Meteor.Collection('authors');

Schemas.Authors = new SimpleSchema({
  english_name: {
    type: String,
    max: 60,
    optional: true,
  },
  original_name: {
    type: String,
    max: 60,
    optional: true,
  },

	slug: {
    type: String,
    max: 200,
    optional: true,
    autoform: {
      type: "hidden",
      label: false
    }
  },

  languages: {
    type: [String],
    max: 60
  },
  corpus: {
    type: String,
    max: 60
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

Authors.attachSchema(Schemas.Authors);
Authors.friendlySlugs('english_title');
