Meteor.method('cron_authors', () => {
	// const Authors = Authors.find().fetch();

	console.log(' -- Cron run complete: Authors');

	return 1;
}, {
	url: 'cron/authors',
	getArgsFromRequest() {
		// Do validation here if necessary for pagination

		return [];
	},
});
