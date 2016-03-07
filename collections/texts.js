this.Texts = new Meteor.Collection('texts');

Schemas.Texts = new SimpleSchema({
  n: {
    type: Number,
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
    type: Number,
    max: 60
  },
  book: {
    type: Number,
    max: 60
  },
  chapter: {
    type: Number,
    max: 60,
    optional : true
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
  }
});

Texts.attachSchema(Schemas.Texts);
