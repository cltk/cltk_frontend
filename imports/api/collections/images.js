Thumbnails = new Mongo.Collection('thumbnails');

Images = new Mongo.Collection('images');

ThumbnailStore = new UploadFS.store.Local({
	collection: Thumbnails,
	name: 'thumbnails',
	path: 'ufs/uploads/thumbnails',
	// permissions: defaultPermissions,
	filter: new UploadFS.Filter({
		extensions: ['gif', 'jpg', 'jpeg', 'png'],
	}),
	onRead(fileId, file, req, res) {
		if (file.userId && (file.token !== req.query.token)) {
			res.writeHead(403, { 'Content-Type': 'text/plain' });
			res.end('Forbidden');
			return false;
		}
		return true;
	},
	transformWrite(from, to, fileId, file) {
		// Resize images
		if (file.type.indexOf('image/') === 0) {
			const gm = Npm.require('gm');
			if (gm) {
				gm(from)
					.resize(500, 500)
					.gravity('Center')
					.extent(500, 500)
					.quality(75)
					.stream()
					.pipe(to);
			} else {
				from.pipe(to);
			}
		} else {
			from.pipe(to);
		}
	},
});

ImageStore = new UploadFS.store.Local({
	collection: Images,
	name: 'images',
	path: 'ufs/uploads/images',
	copyTo: [ThumbnailStore],
});
