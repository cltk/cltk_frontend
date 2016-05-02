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
  blog: 'http://archive.cltk.org',
  about: 'http://archive.cltk.org',
  username: false,
  homeRoute: '/dashboard',
  socialMedia: [['http://github.com/cltk', 'github']]
};

Avatar.options = {
  customImageProperty: 'profile.picture'
};

Meteor.startup(function() {
  if (Meteor.isClient) {
    return TAPi18n.setLanguage('en');
  }
});
