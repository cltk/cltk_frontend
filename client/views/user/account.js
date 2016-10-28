AutoForm.hooks({
	updatePassword: {
		onSubmit(insertDoc) {
			if (insertDoc.new !== insertDoc.confirm) {
				sAlert.error('Passwords do not match');
				return false;
			}
			Accounts.changePassword(insertDoc.old, insertDoc.new, e => {
				$('.btn-primary').attr('disabled', null);
				if (e) {
					return sAlert.error(e.message);
				}
				return sAlert.success('Password Updated');
			});
			return false;
		},
	},
});

Template.account.events({
	'click .js-delete-account': () => Meteor.call('deleteAccount', Meteor.userId()),
});

Template.setUserName.helpers({
	user() {
		return Meteor.user();
	},
});
