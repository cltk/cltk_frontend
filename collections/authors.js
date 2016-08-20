this.Authors = new Meteor.Collection('authors');

Schemas.Authors = new SimpleSchema({
  title: {
    type: String,
    max: 60
  },
  slug: {
    type: String,
    max: 60
  },
  languages: {
    type: [String],
    max: 60
  },
  corpus: {
    type: String,
    max: 60
  },
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
