Meteor.publishComposite('user', () => ({
	find() {
		return Meteor.users.find({
			_id: this.userId,
		});
	},
	children: [
		{
			find(user) {
				const ref = user.profile;
				const _id = ((ref) != null ? ref.picture : undefined) || null;
				return ProfilePictures.find({
					_id,
				});
			},
		},
	],
}));
