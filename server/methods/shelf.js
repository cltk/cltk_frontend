Meteor.methods({
	'shelf.insert': function shelfInsert(workId) {
		// Make sure the user is logged in before inserting
		check(workId, String);
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		try {
			Meteor.users.update(
				{ _id: this.userId },
				{ $push: { worksShelf: workId } }
			);
		} catch (err) {
			console.log(err);
		}
	},
	'shelf.remove': function shelfRemove(workId) {
		// Make sure the user is logged in before removing
		check(workId, String);
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		try {
			Meteor.users.update(
				{ _id: this.userId },
				{ $pull: { worksShelf: workId } }
			);
		} catch (err) {
			console.log(err);
		}
	},
});
