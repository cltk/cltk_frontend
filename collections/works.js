this.Works = new Meteor.Collection('works');

Schemas.Works = new SimpleSchema({
  english_title: {
    type: String,
    max: 60,
    optional: true,
  },
  original_title: {
    type: String,
    max: 60,
    optional: true,
  },
  title: {
    type: String,
    max: 60
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

  language: {
    type: String,
    max: 60
  },
  corpus: {
    type: String,
    max: 60
  },
  authors: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    autoform: {
      options: function() {
        return _.map(Authors.find().fetch(), function(author) {
          return {
            label: author.english_name,
            value: author._id
          };
        });
      }
    }
  },
  editors: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    autoform: {
      options: function() {
        return _.map(Editors.find().fetch(), function(editor) {
          return {
            label: editor.english_name,
            value: editor._id
          };
        });
      }
    }
  },

  structure: {
    type: String,
    optional: true,
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

Works.attachSchema(Schemas.Works);
Works.friendlySlugs('english_title');
