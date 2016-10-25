import { Mongo } from 'meteor/mongo';

export const Avatars = new Mongo.Collection('avatars');

// TODO: collection permissions
// TODO: schema ???

Avatars.allow({
	insert: (userId, avatar) => {
		return false;
	},
	remove: (userId, avatar) => {
		return true;
	},
	update: (userId, avatar, fields, mod) => {

	},
});

