import gm from 'gm';
import { Avatars } from '../avatar_collections.js';

export function checkAvatarPermissions(userId, avatar) {
	if (!userId) {
		return false;
	}
	return userId === avatar.userId;
}

const AvatarFilter = new UploadFS.Filter({
	minSize: 1,
	maxSize: 1024 * 1000, // 1 MB
	constentTypes: ['image/*'],
	extensions: ['jpg', 'jpeg', 'png', 'gif'],
});

export const AvatarStore = new UploadFS.store.Local({
	collection: Avatars,
	name: 'avatars',
	path: '../../../var/avatars',
	filter: AvatarFilter,
	permissions: new UploadFS.StorePermissions({
		insert: checkAvatarPermissions,
		remove: checkAvatarPermissions,
		update: checkAvatarPermissions,
	}),

	transformWrite(from, to) {
		const p = gm(from);
		p.resize(230, 230)
			.gravity('Center')
			.extent(230, 230)
			.quality(100);
		p.stream().pipe(to);
	},
});

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
				AvatarStore.delete(avatar._id);
			} else if (oldAvatarId) {
				AvatarStore.delete(oldAvatarId, (storeDeleteErr) => {
					if (storeDeleteErr) {
						console.error('could not delete avatar ', user.avatar, ' for user ', user._id,
							'; error:', storeDeleteErr
						);
					}
				});
			}
		}
	);
}

AvatarStore.onFinishUpload = function handleAvatarFinishUpdate(avatar) {
	finishUserAvatarUpload(avatar);
};

AvatarStore.onCopyError = (err, avatarId, avatar) => {
	console.log('Avatar copy error. avatar:', avatar, ' error:', err);
};

AvatarStore.nReadError = (err, avatarId, avatar) => {
	console.log('Avatar read error. avatar:', avatar, ' error', err);
};

AvatarStore.onWriteError = (err, avatarId, avatar) => {
	console.log('Avatar write error. avatar:', avatar, ' error', err);
};
