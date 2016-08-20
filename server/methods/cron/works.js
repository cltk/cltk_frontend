Meteor.method("cron_works", function () {

		var works = Works.find().fetch();

		console.log(" -- Cron run complete: Works")





		return 1;

	}, {
	  url: "cron/works",
	  getArgsFromRequest: function (request) {
			// Do validation here if necessary for pagination

	    return [];
	  }
});
