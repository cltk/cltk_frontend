this.Works = new Meteor.Collection('works');

Schemas.Works = new SimpleSchema({
  title: {
    type: String,
    max: 60
  },
  slug: {
    type: String,
    max: 60
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
  editors: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    autoform: {
      options: function() {
        return _.map(Meteor.authors.find().fetch(), function(author) {
          return {
            label: author.title,
            value: author._id
          };
        });
      }
    }
  }
});

Works.attachSchema(Schemas.Works);
