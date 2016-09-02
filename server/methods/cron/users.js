Meteor.method('cron_users', () => {
	// var users = users.find().fetch();

	console.log(' -- Cron run complete: users');

	return 1;
}, {
	url: 'cron/users',
	getArgsFromRequest() {
		// Do validation here if necessary for pagination

		return [];
	},
});
