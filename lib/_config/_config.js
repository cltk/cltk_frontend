this.Config = {
	name: 'Classics Archive',
	title() {
		return 'Classics Archive';
	},
	subtitle() {
		return 'Classics Archive';
	},
	logo() {
		return `<b>${this.name}</b>`;
	},
	footer() {
		return `${this.name} - Copyright ${new Date().getFullYear()}`;
	},
	emails: {
		from: `no-reply@${Meteor.absoluteUrl()}`,
		contact: `contact${Meteor.absoluteUrl()}`,
	},
	username: false,
	defaultLanguage: 'en',
	dateFormat: 'D/M/YYYY',
	privacyUrl: 'http:/cla.dev/terms',
	termsUrl: 'http:/cla.dev/terms',
	legal: {
		address: '',
		name: 'Classics Archive',
		url: 'http://archive.cltk.org',
	},
	about: 'http://archive.cltk.org/about',
	blog: 'http://cltk.org',
	socialMedia: {
		github: {
			url: 'http://github.com/cltk/cltk_frontend',
			icon: 'github',
		},
	},
	homeRoute: '/',
	publicRoutes: ['home'],
	dashboardRoute: '/dashboard',
};
