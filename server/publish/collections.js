/*
 * Replace these in the future as they will publish our entire collections.
 */

if (Meteor.isServer){

  Meteor.publish('attachments', function() {
    return Attachments.find();
  });

  Meteor.publish('authors', function() {
    return Authors.find();
  });

  Meteor.publish('corpora', function() {
    return Corpora.find();
  });

  Meteor.publish('languages', function() {
    return Languages.find();
  });

  Meteor.publish('textNodes', function(query, skip, limit) {
		if(!skip){
			skip = 0;
		}

		if(!limit){
			limit = 100;
		}

    return Texts.find(query, {skip: skip, limit: limit, sort: { n_1:1, n_2:1, n_3:1, n_4:1, n_5:1 }});

  });

  Meteor.publish('works', function() {
    return Works.find();
  });

  Meteor.publish('definitions', function(definitionIds) {
    return Definitions.find({_id: {$in: definitionIds}});
  });

  Meteor.publish('wordForms', function(textIds) {
    return Wordforms.find({texts: {$in: textIds}});
  });

  Meteor.publish('translations', function(work) {
    return Translations.find({work: work});
  });

  Meteor.publish('commentary', function(work) {
    return Commentary.find({work: work});
  });

  Meteor.publish('annotation', function() {
    if(this.userId) {
       return Annotation.find({
        $or: [
          {isPrivate: false},
          {user: this.userId},
        ],
      });
    }
    else {
      return Annotation.find({isPrivate: false});
    }
  });

  Meteor.publish('bookmark', function() {
    if(this.userId) {
       return Meteor.users.find({_id: this.userId}, {fields: {'bookmarks': 1}});
    }
    else {
      return this.ready();
    }
  });
}
