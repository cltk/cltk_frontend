Meteor.method("cron_languages", function () {

		var languages = Languages.find().fetch();

		console.log(" -- Cron run complete: Languages")

		return 1;

	}, {
	  url: "cron/languages",
	  getArgsFromRequest: function (request) {
			// Do validation here if necessary for pagination

	    return [];
	  }
});
