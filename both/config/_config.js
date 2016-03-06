this.Config = {
  name: 'Classics Archive',
  title: function() {
    return TAPi18n.__('Classics Archive');
  },
  subtitle: function() {
    return TAPi18n.__('Classics Archive');
  },
  logo: function() {
    return '<b>' + this.name + '</b>';
  },
  footer: function() {
    return this.name + ' - Copyright ' + new Date().getFullYear();
  },
  emails: {
    from: 'noreply@' + Meteor.absoluteUrl()
  },
  blog: 'http://cla.dev',
  about: 'http://cla.dev',
  username: false,
  homeRoute: '/dashboard',
  socialMedia: [['http://facebook.com/cla', 'facebook'], ['http://twitter.com/cla', 'twitter'], ['http://github.com/cla', 'github']]
};

Avatar.options = {
  customImageProperty: 'profile.picture'
};

Meteor.startup(function() {
  if (Meteor.isClient) {
    return TAPi18n.setLanguage('en');
  }
});
