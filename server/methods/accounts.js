Meteor.methods({
	'account.update': function updateAccount(field, value) {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		check(field, String);
		check(value, Match.Any);
		const setModifier = { $set: {} };
		setModifier.$set[field] = value;
		let result;
		try {
			result = Meteor.users.update(
				{
					_id: this.userId,

				}, setModifier
			);
		} catch (err) {
			console.log(err);
			return false;
		}
		return result;
	},
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
