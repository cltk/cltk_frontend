Meteor.methods({
	'annotation.insert': function annotationInsert(annotation) {
		// Make sure the user is logged in before inserting
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		check(annotation, Object);
		check(annotation.user, String);
		check(annotation.textNodes, [String]);
		check(annotation.isPrivate, Boolean);
		check(annotation.content, String);
		check(annotation.author, String);
		check(annotation.work, String);
		try {
			Annotation.insert(annotation);
		} catch (err) {
			console.log(err);
		}
	},
	'annotation.remove': function annotationRemove(annotationId) {
		// Make sure the user is permitted to remove
		const annotation = Annotation.findOne(annotationId);
		if (this.userId !== annotation.user) {
			throw new Meteor.Error('not-authorized');
		}
		check(annotationId, String);
		try {
			Annotation.remove(annotationId);
		} catch (err) {
			console.log(err);
		}
	},
	'annotation.update': function annotationUpdate(annotationId, annotationData) {
		// Make sure the user is permitted to update
		const annotation = Annotation.findOne(annotationId);
		if (this.userId !== annotation.user) {
			throw new Meteor.Error('not-authorized');
		}
		check(annotationId, String);
		check(annotationData, Object);
		check(annotationData.isPrivate, Boolean);
		check(annotationData.content, String);
		try {
			Annotation.update(annotationId, { $set: annotationData });
		} catch (err) {
			console.log(err);
		}
	},
});
