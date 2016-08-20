Meteor.method("cron_authors", function () {

		var Authors = Authors.find().fetch();

		console.log(" -- Cron run complete: Authors")

		return 1;

	}, {
	  url: "cron/authors",
	  getArgsFromRequest: function (request) {
			// Do validation here if necessary for pagination

	    return [];
	  }
});
