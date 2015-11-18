Package.describe({
  name: 'archimedes:core',
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
        'node_modules/angular-material/angular-material.css',
        'node_modules/angular-aria/angular-aria.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-material/angular-material.js',
        'lib/client/smooth-scroll.min.js',
        'lib/client/parallax.js',
        'lib/client/headroom.min.js',
        'lib/client/scripts.js'
      ], 'client');


});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('archimedes:core');
  api.addFiles('core-tests.js');
});
