Meteor.methods({
  'annotation.insert'(annotation) {
    // Make sure the user is logged in before inserting
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    check(annotation.user, String);
    check(annotation.textNodes, [String]);
    check(annotation.isPrivate, Boolean);
    check(annotation.content, String);
    try {
      Annotation.insert(annotation);
    }
    catch(err){
      console.log(err);
    }
  },
  'annotation.remove'(annotationId) {
    // Make sure the user is permitted to remove
    const annotation = Annotation.findOne(annotationId);
    if (this.userId != annotation.user) {
      throw new Meteor.Error('not-authorized');
    }
    check(annotationId, String);
    try {
      Annotation.remove(annotationId);
    }
    catch(err){
      console.log(err);
    }
  },
  'annotation.update'(annotationId, annotationData) {
    // Make sure the user is permitted to update
    const annotation = Annotation.findOne(annotationId);
    if (this.userId != annotation.user) {
      throw new Meteor.Error('not-authorized');
    }
    check(annotationId, String);
    check(annotationData.isPrivate, Boolean);
    check(annotationData.content, String);
    try {
      Annotation.update(annotationId, { $set: annotationData });
    }
    catch(err){
      console.log(err);
    }
  },
});
