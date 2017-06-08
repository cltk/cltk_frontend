import Annotations from '/imports/api/collections/annotations';

Meteor.methods({
	'annotations.insert': function annotationInsert(annotationCandidate) {
		// Make sure the user is logged in before inserting
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		console.log(annotationCandidate);
		check(annotationCandidate, {
			textNode: String,
			content: String,
		});

		const annotation = annotationCandidate;

		annotation.user = this.userId;
		annotation.status = 'approved';
		annotation.isPrivate = false;
		annotation.votes = 1;
		annotation.voters = [this.userId];
		annotation.reported = 0;
		annotation.usersReported = [];

		try {
			Annotations.insert(annotation);
		} catch (err) {
			console.log(err);
		}
	},
	'annotations.remove': function annotationRemove(annotationId) {
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
	'annotations.update': function annotationUpdate(annotationId, annotationData) {
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
