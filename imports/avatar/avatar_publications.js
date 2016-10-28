import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Avatars } from '/imports/avatar/avatar_collections.js';

const PublicAvatarFields = {
	name:1,
	size:1,
	type:1,
	userId:1,
	url:1,
	commenterId:1,
};
const PublicUserAvatarFields = {
	'avatar.name': 1,
	'avatar.size': 1,
	'avatar.type': 1,
	'avatar.url': 1,
};

Meteor.publish('users.myAvatar', function() {
	if (this.userId) {
		return Meteor.users.find(
			{ _id:this.userId },
			PublicUserAvatarFields,
		);
	} else {
		this.ready();
	}
});

Meteor.publish('avatars', function(ids) {
	check(ids, [String]);

	return Avatars.find({ _id: { $in: ids } }, PublicAvatarFields);
});

Meteor.publish('avatars.commenter', function(ids) {
	check(ids, [String]);

	return Avatars.find({ commenterId: { $in: ids } }, PublicAvatarFields);
});

Meteor.publish('avatars.commenter.all', function() {
	return Avatars.find({ commenterId: { $exists:true } });
});
