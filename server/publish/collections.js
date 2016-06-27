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

  Meteor.publish('texts', function() {
    return Texts.find();
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
  Meteor.publish('commentary', function() {
    return Commentary.find();
  });
}
