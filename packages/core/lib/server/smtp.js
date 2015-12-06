Meteor.startup(function(){
	process.env.MAIL_URL = 'smtp://@smtp.webfaction.com:465/'
});



Meteor.methods({
	sendEmail: function (text) {
		check([text], [String]);

		this.unblock();

		Email.send({
			to: 'admin@cltk.org',
			from: 'no-reply@cltk.org',
			subject: 'Form Submission',
			text: text
		});
	}
});
