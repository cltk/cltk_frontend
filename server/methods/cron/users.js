Meteor.method("cron_users", function () {

		//var users = users.find().fetch();

		console.log(" -- Cron run complete: users")

		return 1;

	}, {
	  url: "cron/users",
	  getArgsFromRequest: function (request) {
			// Do validation here if necessary for pagination

	    return [];
	  }
});
