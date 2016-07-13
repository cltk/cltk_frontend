this.Annotation = new Meteor.Collection('annotation');

Schemas.Annotation = new SimpleSchema({
  user: {
    type: String,
  },
  textNodes: {
    type: [String],
  },
  content: {
    type: String,
  },
  isPrivate: {
    type: Boolean,
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

Annotation.attachSchema(Schemas.Annotation);
