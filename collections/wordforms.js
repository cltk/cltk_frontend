this.Wordforms = new Meteor.Collection('wordforms');

Schemas.Wordforms = new SimpleSchema({
  word: {
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
  },
  definitions: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  texts: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  }
});

Wordforms.attachSchema(Schemas.Wordforms);
