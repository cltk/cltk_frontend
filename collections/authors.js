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
  english_name: {
    type: String,
    max: 60
  },
  original_name: {
    type: String,
    max: 60
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

Authors.attachSchema(Schemas.Authors);
