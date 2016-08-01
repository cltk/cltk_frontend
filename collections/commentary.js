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
  ref: {
    type: String,
    max: 60
  },
  content: {
    type: String
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    }
  }

});

Commentary.attachSchema(Schemas.Commentary);
