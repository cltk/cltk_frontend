this.Corpora = new Meteor.Collection('corpora');

Schemas.Corpora = new SimpleSchema({
  title: {
    type: String,
    max: 60
  },
  slug: {
    type: String,
    max: 60
  },
  /*
   * Remove language in the future when we learn more about optimizing
   * the sync with the text server
   */
  language: {
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

Corpora.attachSchema(Schemas.Corpora);
