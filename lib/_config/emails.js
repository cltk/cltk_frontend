let options;

if (Meteor.isServer) {
	options = {
		siteName: Config.name,
	};
	if (Config.socialMedia) {
		_.each(Config.socialMedia, (value, key) => {
			options[key] = value.url;
			return value.url;
		});
	}
	if (Config.legal) {
		options.companyAddress = Config.legal.address;
		options.companyName = Config.legal.name;
		options.companyUrl = Config.legal.url;
	}
	PrettyEmail.options = options;
}
