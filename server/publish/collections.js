Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('attachments', function() {
  return Attachments.find();
});
