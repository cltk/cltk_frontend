import Config from '/imports/lib/config/config';
import MainLayout from '/imports/ui/layouts/BaseLayout';

AccountsTemplates.configure({
	defaultLayout: 'MainLayout',
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
});

AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn', {
	redirect: '/profile',
});
// AccountsTemplates.configureRoute('signUp', {
// 	redirect: '/profile',
// });
AccountsTemplates.configureRoute('verifyEmail');
