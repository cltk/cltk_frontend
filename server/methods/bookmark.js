
Meteor.methods({
	'bookmark.insert': function bookmarkInsert(textNodeId) {
		// Make sure the user is logged in before inserting
		check(textNodeId, String);
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
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
		check(textNodeId, String);
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
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
