this.Config = {
  name: 'Classics Archive',
  title: function() {
    return "Classics Archive";
  },
  subtitle: function() {
    return "Classics Archive";
  },
  logo: function() {
    return '<b>' + this.name + '</b>';
  },
  footer: function() {
    return this.name + ' - Copyright ' + new Date().getFullYear();
  },
  emails: {
    from: 'no-reply@' + Meteor.absoluteUrl(),
    contact: 'contact' + Meteor.absoluteUrl()
  },
  username: false,
  defaultLanguage: 'en',
  dateFormat: 'D/M/YYYY',
  privacyUrl: 'http:/cla.dev/terms',
  termsUrl: 'http:/cla.dev/terms',
  legal: {
    address: '',
    name: 'Classics Archive',
    url: 'http://archive.cltk.org'
  },
  about: 'http://archive.cltk.org/about',
  blog: 'http://cltk.org',
  socialMedia: {
    github: {
      url: 'http://github.com/cltk/cltk_frontend',
      icon: 'github'
    }
  },
  homeRoute: '/',
  publicRoutes: ['home'],
  dashboardRoute: '/dashboard'
};
