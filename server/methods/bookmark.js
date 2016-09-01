Meteor.methods({
	'bookmark.insert': function bookmarkInsert(textNodeId) {
		// Make sure the user is logged in before inserting
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		check(textNodeId, String);
		try {
			Meteor.users.update(
				{ _id: this.userId },
				{ $push: { bookmarks: textNodeId } }
			);
		} catch (err) {
			console.log(err);
		}
	},
	'bookmark.remove': function bookmarkRemove(textNodeId) {
		// Make sure the user is logged in before removing
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		check(textNodeId, String);
		try {
			Meteor.users.update(
				{ _id: this.userId },
				{ $pull: { bookmarks: textNodeId } }
			);
		} catch (err) {
			console.log(err);
		}
	},
});
