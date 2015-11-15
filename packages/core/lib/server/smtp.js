Meteor.startup(function(){
	process.env.MAIL_URL = 'smtp://@smtp.webfaction.com:465/'
});



Meteor.methods({
	sendEmail: function (text) {
		check([text], [String]);

		this.unblock();

		Email.send({
			to: 'lukehollis@gmail.com',
			from: 'no-reply@archimedes.digital',
			subject: 'Form Submission',
			text: text
		});
	}
});
