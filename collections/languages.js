this.Languages = new Meteor.Collection('languages');

Schemas.Languages = new SimpleSchema({
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

Languages.attachSchema(Schemas.Languages);
Languages.friendlySlugs('title');
