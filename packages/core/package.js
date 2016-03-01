Package.describe({
  name: 'archimedigital:core',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {

  var both = ['client','server'];

  api.versionsFrom('1.1.0.3');

  api.use('iron:router', both);
  api.use('iron:layout', both);

  api.addFiles([
        'routes.js'
      ], both);

  api.addFiles([
        'settings.js'
      ], 'server');

  api.addFiles([
        'lib/client/smooth-scroll.min.js',
        'lib/client/parallax.js',
        'lib/client/headroom.min.js',
        'lib/client/scripts.js'
      ], 'client');


});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('archimedigital:core');
  api.addFiles('core-tests.js');
});
