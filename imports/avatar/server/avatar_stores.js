import gm from 'gm';
import { Avatars } from '../avatar_collections.js';

export function checkAvatarPermissions(userId, avatar) {
	if (!userId) {
		return false;
	}
	return userId === avatar.userId;
}

function finishUserAvatarUpload(avatar) {
	const user = Meteor.user();
	const oldAvatarId = 'avatar' in user && '_id' in user.avatar ? user.avatar._id : null;

	Meteor.users.update(
		{ _id: user._id },
		{
			$set: {
				avatar: {
					_id: avatar._id,
					type: avatar.type,
					url: avatar.url,
				},
			},
		},
		{ multi: false },
		(avatarUpdateErr) => {
			if (avatarUpdateErr) {
				console.error('could not update user ', user._id, ' with avatar ', avatar._id,
					'; error:', avatarUpdateErr
				);
			} else if (oldAvatarId) {
			}
		}
	);
}
