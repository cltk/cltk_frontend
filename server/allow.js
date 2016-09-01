ProfilePictures.allow({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	download() {
		return true;
	},
});

Attachments.allow({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	download() {
		return true;
	},
});

Meteor.users.allow({
	update() {
		if (userId === doc._id && !doc.username && fieldNames.length === 1 &&
		fieldNames[0] === 'username') {
			return true;
		}
		return false;
	},
});
