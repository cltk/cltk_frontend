Template.registerHelper('Config', function() {
  return Config;
});

Template.registerHelper('NCSchemas', function() {
  return NCSchemas;
});

Template.registerHelper('socialMedia', function() {
  return _.map(Config.socialMedia, function(obj) {
    return obj;
  });
});

Template.registerHelper('Utils', function() {
  return Utils;
});

Template.registerHelper('currentRoute', function() {
  if (Router && Router.current && Router.current()) {
    return Router.current();
  }
});

Template.registerHelper('isRouteReady', function() {
  return Router && Router.current && Router.current() && Router.current()._waitlist._notReadyCount === 0;
});

Template.registerHelper('joinArray', function(array) {
  return array.join(', ');
});

Template.registerHelper('isNoun', function(pos) {
  return pos === "noun";
});

Template.registerHelper('isPronoun', function(pos) {
  return pos === "pronoun";
});

Template.registerHelper('isAdjective', function(pos) {
  return pos === "adjective";
});

Template.registerHelper('isVerb', function(pos) {
  return pos === "verb";
});

Template.registerHelper('isParticiple', function(pos) {
  return pos === "participle";
});

Template.registerHelper('isOtherPOS', function(pos) {
  return ["noun", "pronoun", "adjective", "verb", "participle"].indexOf(pos) < 0;
});

Template.registerHelper('niceName', function(userId) {
  return Meteor.users.findOne(userId).profile.firstName;
});
