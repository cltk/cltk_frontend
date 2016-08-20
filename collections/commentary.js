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
  n1: {
    type: Number,
    min: 0
  },
  n2: {
    type: Number,
    optional: true,
    min: 0
  },
  n3: {
    type: Number,
    optional: true,
    min: 0
  },
  n4: {
    type: Number,
    optional: true,
    min: 0
  },
  n5: {
    type: Number,
    optional: true,
    min: 0
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
