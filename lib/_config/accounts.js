AccountsTemplates.configure({
  defaultLayout: 'masterLayout',
  defaultLayoutRegions: {},
  defaultContentRegion: 'main',
  confirmPassword: false,
  enablePasswordChange: true,
  forbidClientAccountCreation: false,
  overrideLoginErrors: true,
  sendVerificationEmail: false,
  lowercaseUsername: false,
  showAddRemoveServices: true,
  showForgotPasswordLink: true,
  showLabels: true,
  showPlaceholders: true,
  showResendVerificationEmailLink: false,
  continuousValidation: false,
  negativeFeedback: false,
  negativeValidation: true,
  positiveValidation: false,
  positiveFeedback: true,
  showValidating: true,
  privacyUrl: Config.privacyUrl || null,
  termsUrl: Config.termsUrl || null,
  homeRoutePath: '/profile' || null,
  onLogoutHook: function() {
    return console.log('logout');
  },
  onSubmitHook: function() {
    return console.log('submitting form');
  }
});
