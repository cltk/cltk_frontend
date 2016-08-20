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
  author: {
    type: String,
    max: 60
  },
  work: {
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

Annotation.attachSchema(Schemas.Annotation);
