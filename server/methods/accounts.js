Meteor.methods({
	deleteAccount(userId) {
		check(userId, String);
		if (this.userId === userId) {
			return Meteor.users.remove({
				_id: this.userId,
			});
		}
		return null;
	},
});
