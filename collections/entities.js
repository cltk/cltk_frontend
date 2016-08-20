this.Entities = new Meteor.Collection('entities');

Schemas.Entities = new SimpleSchema({
  english_name: {
    type: String,
    optional: true,
  },
  original_name: {
    type: String,
    optional: true,
  },
	slug: {
    type: String,
    max: 200,
    optional: true,
    autoform: {
      type: "hidden",
      label: false
    }
  },

	location: {
		type: String,
		optional: true,
		autoform: {
			type: 'map',
			geolocation: true,
			searchBox: true,
			autolocate: true
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

Entities.attachSchema(Schemas.Entities);
Entities.friendlySlugs('english_title');
