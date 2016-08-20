this.Commentary = new Meteor.Collection('commentary');

Schemas.Commentary = new SimpleSchema({
  author: {
    type: String,
    max: 60
  },
  year: {
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

Commentary.attachSchema(Schemas.Commentary);
