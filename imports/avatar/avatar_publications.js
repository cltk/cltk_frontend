import { Avatars } from '/imports/avatar/avatar_collections.js';

const PublicAvatarFields = {
	name: 1,
	size: 1,
	type: 1,
	userId: 1,
	url: 1,
};
const PublicUserAvatarFields = {
	'avatar.name': 1,
	'avatar.size': 1,
	'avatar.type': 1,
	'avatar.url': 1,
};

Meteor.publish('users.myAvatar', function uploadUserAvatars() {
	if (this.userId) {
		return Meteor.users.find(
			{ _id: this.userId },
			PublicUserAvatarFields,
		);
	}
	return this.ready();
});

Meteor.publish('avatars', (ids) => {
	check(ids, [String]);
	return Avatars.find({ _id: { $in: ids } }, PublicAvatarFields);
});
