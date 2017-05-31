import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Avatars } from '../avatar_collections.js';
import { checkAvatarPermissions } from './avatar_stores.js';

function deleteUserAvatar(userId, avatar) {
	Meteor.users.update(
		{ _id: userId, 'avatar._id': avatar._id },
		{ $unset: { avatar: 1 } }
	);
	return Avatars.remove({ _id: avatar._id });
}

function deleteCommenterAvatar(userId, avatar) {
	Commenters.update(
		{ _id: avatar.commenterId },
		{ $unset: { avatar: 1 } }
	);

	return Avatars.remove({ _id: avatar._id });
}

const deleteAvatar = new ValidatedMethod({
	name: 'avatar.delete',

	validate: new SimpleSchema({
		avatarId: { type: String },
	}).validator(),

	run({ avatarId }) {
		if (!this.userId) {
			throw new Meteor.Error('403', 'Access denied');
		}

		const avatar = Avatars.findOne({ _id: avatarId });
		if (!avatar) {
			throw new Meteor.Error('not-found', `Avatar ${avatarId} not found.`);
		}

		if (!checkAvatarPermissions(this.userId, avatar)) {
			throw new Meteor.Error('403', 'Access denied');
		}

		if (avatar.contextType === 'user') {
			return deleteUserAvatar(this.userId, avatar);
		} else if (avatar.contextType === 'commenter') {
			return deleteCommenterAvatar(this.userId, avatar);
		}
		throw new Meteor.Error('invalid-type', `Unknow avatar type ${avatar.contextType}.`);
	},
});

export default deleteAvatar;
