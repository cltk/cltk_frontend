Meteor.methods({
	'annotation.insert': function annotationInsert(annotation) {
		// Make sure the user is logged in before inserting
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		check(annotation, {
			user: String,
			textNodes: [String],
			isPrivate: Boolean,
			content: String,
			author: String,
			work: String,
		});
		try {
			Annotation.insert(annotation);
		} catch (err) {
			console.log(err);
		}
	},
	'annotation.remove': function annotationRemove(annotationId) {
		// Make sure the user is permitted to remove
		check(annotationId, String);
		const annotation = Annotation.findOne(annotationId);
		if (this.userId !== annotation.user) {
			throw new Meteor.Error('not-authorized');
		}
		try {
			Annotation.remove(annotationId);
		} catch (err) {
			console.log(err);
		}
	},
	'annotation.update': function annotationUpdate(annotationId, annotationData) {
		// Make sure the user is permitted to update
		check(annotationId, String);
		check(annotationData, {
			isPrivate: Boolean,
			content: String,
		});
		const annotation = Annotation.findOne(annotationId);
		if (this.userId !== annotation.user) {
			throw new Meteor.Error('not-authorized');
		}
		try {
			Annotation.update(annotationId, { $set: annotationData });
		} catch (err) {
			console.log(err);
		}
	},
});
