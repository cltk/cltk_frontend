/*
 * Replace these in the future as they will publish our entire collections.
 */

Meteor.publish('attachments', function() {
  return Attachments.find();
});
