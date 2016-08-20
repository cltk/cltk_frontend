this.Translations = new Meteor.Collection('translations');

Schemas.Translations = new SimpleSchema({
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
  language: {
    type: String,
    max: 60
  },
  corpus: {
    type: String,
    max: 60
  },
  author: {
    type: String,
    max: 60
  },
  work: {
    type: String,
    max: 60
  },
  translator: {
    type: String,
    max: 160
  },
  text: {
    type: String,
    autoform: {
      rows: 5
    }
  },
  html: {
    type: String,
    autoform: {
      rows: 5
    }
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

Translations.attachSchema(Schemas.Translations);
