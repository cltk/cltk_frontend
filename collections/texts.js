this.Texts = new Meteor.Collection('texts');

Schemas.Texts = new SimpleSchema({
  n_1: {
    type: Number,
    min: 0
  },
  n_2: {
    type: Number,
    optional: true,
    min: 0
  },
  n_3: {
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
  },
  comments: {
    type: [String],
    optional: true
  }
});

Texts.attachSchema(Schemas.Texts);
