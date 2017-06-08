import Config from './config';

Meteor.startup(() => {
	if (Meteor.isClient) {
		if (Config.defaultLanguage) {
			return TAPi18n.setLanguage(Config.defaultLanguage);
		}
		return TAPi18n.setLanguage('en');
	}
	return null;
});
