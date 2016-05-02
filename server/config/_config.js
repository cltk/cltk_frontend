this.Config = {
  name: 'Classical Languages Archive',
  title: function() {
    return TAPi18n.__('configTitle');
  },
  subtitle: function() {
    return TAPi18n.__('configSubtitle');
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
    name: 'Classical Languages Archive',
    url: 'http://cla.dev'
  },
  about: 'http:/cla.dev/about',
  blog: 'http://cla.dev/blog',
  socialMedia: {
    facebook: {
      url: 'http://facebook.com/',
      icon: 'facebook'
    },
    twitter: {
      url: 'http://twitter.com/@classicsarchive',
      icon: 'twitter'
    },
    github: {
      url: 'http://github.com/cltk/cltk_frontend',
      icon: 'github'
    },
    info: {
      url: 'http://cla.dev/about',
      icon: 'link'
    }
  },
  homeRoute: '/',
  publicRoutes: ['home', 'works', 'workDetail', 'readingBookChapterSection', 'readingBookLine', 'about', 'search', 'browse', 'terms'],
  dashboardRoute: '/dashboard'
};
