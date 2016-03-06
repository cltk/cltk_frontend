Comments.helpers({
  docTitle: function() {
    var ref;
    return (ref = Posts.findOne(this.doc)) != null ? ref.title : void 0;
  },
  author: function() {
    var ref, ref1, ref2, user;
    user = Meteor.users.findOne(this.owner);
    if (((user != null ? (ref = user.profile) != null ? ref.firstName : void 0 : void 0) != null) && (user != null ? (ref1 = user.profile) != null ? ref1.lastName : void 0 : void 0)) {
      return user.profile.firstName + ' ' + user.profile.lastName;
    } else {
      return user != null ? (ref2 = user.emails) != null ? ref2[0].address : void 0 : void 0;
    }
  }
});
