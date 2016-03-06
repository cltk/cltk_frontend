this.Texts = new Meteor.Collection('texts');

Schemas.Texts = new SimpleSchema({
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
  },
  subwork: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return _.map(Meteor.subworks.find().fetch(), function(subwork) {
          return {
            label: subwork.title,
            value: subwork._id
          };
        });
      }
    }
  },
  content: {
    type: String,
    autoform: {
      rows: 5
    }
  }
});

Subworks.attachSchema(Schemas.Subworks);
