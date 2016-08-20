this.Definitions = new Meteor.Collection('definitions');

Schemas.Definitions = new SimpleSchema({
  headword: {
    type: String,
    max: 60
  },
  pos: {
    type: String
  },
  definition: {
    type: String
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

Definitions.attachSchema(Schemas.Definitions);
