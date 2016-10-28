AccountsTemplates.configure({
	defaultLayoutType: 'blaze-to-react',
	defaultLayout: MainLayout,
	defaultContentRegion: 'content',
	confirmPassword: false,
	enablePasswordChange: true,
	forbidClientAccountCreation: true,
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
	onLogoutHook() {
		return console.log('logout');
	},
	onSubmitHook() {
		return console.log('submitting form');
	},
});
