Meteor.method('cron_text', () => {
// var textNodes = TextNodes.find().fetch();

	console.log(' -- Cron run complete: TextNodes');

	return 1;
}, {
	url: 'cron/text',
	getArgsFromRequest() {
		// Do validation here if necessary for pagination

		return [];
	},
});
