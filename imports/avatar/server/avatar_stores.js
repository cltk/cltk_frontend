import { Meteor } from 'meteor/meteor';
import { UploadFS } from 'meteor/jalik:ufs';
import { Avatars } from '../avatar_collections.js';

// TODO: avatar permissions
const AvatarPermissions = new UploadFS.StorePermissions({
	insert: (userId, avatar) => {
		// todo: for commenter context check role
		// console.log('AvatarPermissions.insert userId:', userId, ' avatar:', avatar);
		return true;
	},
	remove: (userId, avatar) => {
		// console.log('AvatarPermissions.remove userId:', userId, ' avatar:', avatar);
		return true;
	},
	update: (userId, avatar) => {
		// console.log('AvatarPermissions.update userId:', userId, ' avatar:', avatar);
		return true;
	},
});

const AvatarFilter = new UploadFS.Filter({
	minSize: 1,
	maxSize: 1024 * 1000, // 1 MB
	constentTypes: [ 'image/*' ],
	extensions: [ 'jpg', 'jpeg' , 'png', 'gif' ],
});

export const AvatarStore = new UploadFS.store.Local({
	collection: Avatars,
	name: 'avatars',
	path: 'uploads/avatars',
	filter: AvatarFilter,
	permissions: AvatarPermissions,
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
		{ multi: false, },
		function handleUserAvatarUpdateComplete(avatarUpdateErr) {
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

function finishCommenterAvatarUpload(avatar) {
	const c = Commenters.findOne({_id: avatar.commenterId}, { fields: { _id:1, avatar:1 }});
	const oldAvatarId = 'avatar' in c && c.avatar ? c.avatar : null;

	Commenters.update(
		{ _id: avatar.commenterId },
		{
			$set: {
				avatar: avatar._id,
			}
		},
		{ multi: false },
		function handleCommenterAvatarUpdateComplete(avatarUpdateErr) {
			if (avatarUpdateErr) {
				console.error('could not update commenter ', avatar.commenterId, ' with avatar ', avatar._id,
					'; error:', avatarUpdateErr
				);
				AvatarStore.delete(avatar._id);
			} else if (oldAvatarId) {
				AvatarStore.delete(oldAvatarId, (storeDeleteErr) => {
					if (storeDeleteErr) {
						console.error('could not delete avatar ', oldAvatarId, ' for commenter ', avatar.commenterId,
							'; error:', storeDeleteErr
						);
					}
				});
			}
		}
	);
}

AvatarStore.onFinishUpload = function handleAvatarFinishUpdate(avatar) {
	if (avatar.contextType === 'user')
		finishUserAvatarUpload(avatar);
	else if (avatar.contextType === 'commenter')
		finishCommenterAvatarUpload(avatar);
};

// TODO:
AvatarStore.onCopyError = (err, avatarId, avatar) => {
};

AvatarStore.nReadError = (err, avatarId, avatar) => {
};

AvatarStore.onWriteError = (err, avatarId, avatar) => {
};
