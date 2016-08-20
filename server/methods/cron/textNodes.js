Meteor.method("cron_text", function () {

		//var textNodes = TextNodes.find().fetch();

		console.log(" -- Cron run complete: TextNodes")

		return 1;

	}, {
	  url: "cron/text",
	  getArgsFromRequest: function (request) {
			// Do validation here if necessary for pagination

	    return [];
	  }
});
