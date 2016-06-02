this.Definitions = new Meteor.Collection('definitions');

Schemas.Definitions = new SimpleSchema({
  headword: {
    type: String,
    max: 60
  },
  pos: {
    type: String,
    max: 60
  },
  definition: {
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

Definitions.attachSchema(Schemas.Definitions);
