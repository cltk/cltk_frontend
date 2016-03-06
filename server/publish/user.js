Meteor.publishComposite('user', function() {
  return {
    find: function() {
      return Meteor.users.find({
        _id: this.userId
      });
    },
    children: [
      {
        find: function(user) {
          var _id, ref;
          _id = ((ref = user.profile) != null ? ref.picture : void 0) || null;
          return ProfilePictures.find({
            _id: _id
          });
        }
      }
    ]
  };
});
