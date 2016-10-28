import {check } from 'meteor/check';

export function uploadAvatar(data, context) {
	const file = {
		name: data.name,
		size: data.size,
		type: data.type,
		contextType: context.type,
	};

	if (context.type === 'commenter') {
		check(context.commenterId, String);
		file.commenterId = context.commenterId;
	} else if (context.type !== 'user') {
		throw new Error(`invalid context type ${context.type}`);
	}

	const uploader = new UploadFS.Uploader({
		store: 'avatars',
		adaptive: true,
		capacity: 0.8, // 80%
		chunkSize: 8 * 1024, // 8k
		maxChunkSize: 128 * 1024, // 128k
		maxTries: 3,
		data,
		file,

		onCreate: function (avatar) {
			console.log(avatar.name, ' has been created');
		},
		onStart: function (avatar) {
			console.log(avatar.name, ' started');
		},
		onError: function (err) {
			console.error(err);
		},
		onAbort: function (avatar) {
			console.log(avatar.name, ' upload has been aborted');
		},
		onComplete: function (avatar) {
			console.log(avatar.name, ' has been uploaded');
		},
		onProgress: function (avatar, progress) {
			console.log(avatar.name, ' ', (progress*100), '% uploaded');
		},
		onStop: function (avatar) {
			console.log(avatar.name, ' stopped');
		},
	});

	uploader.start();
}