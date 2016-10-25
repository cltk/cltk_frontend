import { Meteor } from 'meteor/meteor';
import { Avatars } from './avatar_collections.js';

// TODO: validate method
Meteor.methods({
	deleteAvatar: (filter) => {
		check(filter, Object);
		console.log('method deleteAvatar(', filter, ')');
		// TODO: delete file and avatar from user' doc
		return Avatars.remove(filter);
	},
});
