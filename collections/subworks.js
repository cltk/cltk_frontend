this.Subworks = new Meteor.Collection('subworks');

Schemas.Subworks = new SimpleSchema({
  title: {
    type: String,
    max: 60
  },
  slug: {
    type: String,
    max: 60
  },
  n: {
    type: Number,
    min: 0
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
  work: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return _.map(Meteor.works.find().fetch(), function(work) {
          return {
            label: work.title,
            value: work._id
          };
        });
      }
    }
  }
});

Subworks.attachSchema(Schemas.Subworks);
