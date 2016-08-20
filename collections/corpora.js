this.Corpora = new Meteor.Collection('corpora');

Schemas.Corpora = new SimpleSchema({
  title: {
    type: String,
    max: 60
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

  language: {
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

Corpora.attachSchema(Schemas.Corpora);
Corpora.friendlySlugs('title');
