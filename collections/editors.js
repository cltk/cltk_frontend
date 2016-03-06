this.Editors = new Meteor.Collection('editors');

Schemas.Editors = new SimpleSchema({
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

Editors.attachSchema(Schemas.Editors);
