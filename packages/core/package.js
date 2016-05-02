Package.describe({
  name: 'archimedigital:core',
  version: '0.1.1',
  summary: 'Core funcitonality across Meteor projects.',
  git: '',
  documentation: 'README.md'

});

Package.onUse(function(api) {

  var both = ['client','server'];

  api.versionsFrom('1.1.0.3');

  api.addFiles([
        //'both/routes.js'
      ], both);

  api.addFiles([
        'client/smooth-scroll.min.js',
        'client/parallax.js',
        'client/headroom.min.js',
      ], 'client');


});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('archimedigital:core');
  api.addFiles('core-tests.js');
});
