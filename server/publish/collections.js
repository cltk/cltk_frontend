/*
 * Replace these in the future as they will publish our entire collections.
 */

if (Meteor.isServer){
  Meteor.publish('works', function() {
    return Works.find();
  });

  Meteor.publish('texts', function() {
    return Texts.find({}, {limit:10});
  });

  Meteor.publish('attachments', function() {
    return Attachments.find();
  });

}
