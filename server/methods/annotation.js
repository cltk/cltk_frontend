Meteor.methods({
  'annotation.insert'(annotation) {
    // Make sure the user is logged in before inserting a task
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
    check(annotationId, String);
    try {
      Annotation.remove(annotationId);
    }
    catch(err){
      console.log(err);
    }
  },
  'annotation.update'(annotationId, annotation) {
    check(annotationId, String);
    check(annotation.isPrivate, Boolean);
    check(annotation.content, String);
    try {
      Annotation.update(annotationId, { $set: annotation });
    }
    catch(err){
      console.log(err);
    }
  },
});