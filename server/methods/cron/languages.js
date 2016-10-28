Meteor.method('cron_languages', () => {
	// const languages = Languages.find().fetch();

	console.log(' -- Cron run complete: Languages');

	return 1;
}, {
	url: 'cron/languages',
	getArgsFromRequest() {
		// Do validation here if necessary for pagination

		return [];
	},
});
