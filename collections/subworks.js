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

Subworks.attachSchema(Schemas.Subworks);
