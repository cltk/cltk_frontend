import { check } from 'meteor/check';

export class AvatarUploader {
	constructor({
		data,
		context,
		onCreate,
		onStart,
		onError,
		onAbort,
		onComplete,
		onProgress,
		onStop,
	}) {
		const file = {
			name: data.name,
			size: data.size,
			type: data.type,
			contextType: context.type,
		};
		if (context.type !== 'user') {
			throw new Error(`invalid context type ${context.type}`);
		}

		const uploaderParams = {
			store: 'avatars',
			adaptive: true,
			capacity: 0.8, // 80%
			chunkSize: 8 * 1024, // 8k
			maxChunkSize: 128 * 1024, // 128k
			maxTries: 3,
			data,
			file,
		};

		if (onCreate) {
			uploaderParams.onCreate = onCreate;
		}
		if (onStart) {
			uploaderParams.onStart = onStart;
		}
		if (onError) {
			uploaderParams.onError = onError;
		}
		if (onAbort) {
			uploaderParams.onAbort = onAbort;
		}
		if (onComplete) {
			uploaderParams.onComplete = onComplete;
		}
		if (onProgress) {
			uploaderParams.onProgress = onProgress;
		}
		if (onStop) {
			uploaderParams.onStop = onStop;
		}

		this.uploader = new UploadFS.Uploader(uploaderParams);

		this.start = this.uploader.start;
	}
}

export function uploadAvatar(data, context) {
	const uploader = new AvatarUploader({ data, context });

	uploader.start();
}
