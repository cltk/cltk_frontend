import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Cookies from 'js-cookie';

// components:
import Utils from '/imports/lib/utils';
import OAuthButtons from '/imports/ui/components/auth/OAuthButtons';
import PWDSignupForm from '/imports/ui/components/auth/PWDSignupForm';

class ModalSignup extends React.Component {
	static propTypes = {
		lowered: React.PropTypes.bool,
		closeModal: React.PropTypes.func,
	};

	static defaultProps = {
		lowered: false,
	};

	constructor(props) {
		super(props);

		this.state = {
			errorMsg: '',
			errorSocial: '',
		};

		// methids
		this._handleKeyDown = this._handleKeyDown.bind(this);
		this.handleSignup = this.handleSignup.bind(this);
		this.handleSignupFacebook = this.handleSignupFacebook.bind(this);
		this.handleSignupGoogle = this.handleSignupGoogle.bind(this);
		this.handleSignupTwitter = this.handleSignupTwitter.bind(this);
	}

	componentWillMount() {
		document.addEventListener('keydown', this._handleKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this._handleKeyDown);
	}

	_handleKeyDown(event) {

		const { closeModal } = this.props;

		if (event.keyCode === ESCAPE_KEY) closeModal();
	}

	handleSignup(email, password, passwordRepeat) {

		if (password !== passwordRepeat) {
			this.setState({
				errorMsg: 'Passwords do not match.',
			});
			throw new Meteor.Error('Passwords do not match');
		}

		const checkPassword = Accounts._hashPassword(password);

		Meteor.call('createAccount', { email, checkPassword }, (err, result) => {
			const path = '/';

			if (!err) {
				Meteor.loginWithToken(result.stampedToken.token, (_err) => {
					if (_err) {
						this.setState({
							errorMsg: 'Invalid email or password',
						});

						return false;
					}

					const domain = Utils.getEnvDomain();

					if (domain) {
						Cookies.set('userId', Meteor.userId(), { domain });
						Cookies.set('loginToken', token, { domain });
					} else {
						Cookies.set('userId', Meteor.userId());
						Cookies.set('loginToken', token);
					}
					this.props.closeModal();
				});
			} else {
				this.setState({
					errorMsg: 'Invalid email or password',
				});
			}
		});
	}

	handleSignupFacebook() {
		Meteor.loginWithFacebook({}, (err) => {
			if (!err) {
				this.props.closeModal();
			} else {
				this.setState({
					errorSocial: `Error with signing in with Facebook: ${err.reason}`,
				});
			}
		});
	}

	handleSignupGoogle() {
		Meteor.loginWithGoogle({}, (err) => {
			if (!err) {
				this.props.closeModal();
			} else {
				this.setState({
					errorSocial: `Error with signing in with Google: ${err.reason}`,
				});
			}
		});
	}

	handleSignupTwitter() {
		Meteor.loginWithTwitter({}, (err) => {
			if (!err) {
				this.props.closeModal();
			} else {
				this.setState({
					errorSocial: `Error with signing in with Twitter: ${err.reason}`,
				});
			}
		});
	}

	render() {
		const { lowered, closeModal } = this.props;
		const { errorMsg, errorSocial } = this.state;

		return (
			<div
				className={`cltk-modal-signup cltk-modal cltk-login-signup
					${((lowered) ? ' lowered' : '')}`}
			>
				<div  // eslint-disable-line jsx-a11y/no-static-element-interactions
					className="close-modal paper-shadow"
					onClick={closeModal}
				>
					<i className="mdi mdi-close" />
				</div>
				<div className="modal-inner">
					<div className="at-form">
						<div className="at-title">
							<h3>Create an Account</h3>
						</div>
						<span className="error-text">
							{errorSocial}
						</span>
						<OAuthButtons
							handleFacebook={this.handleSignupFacebook}
							handleGoogle={this.handleSignupGoogle}
							handleTwitter={this.handleSignupTwitter}
						/>
						<div className="at-sep">
							<strong>OR</strong>
						</div>

						<PWDSignupForm
							handleSignup={this.handleSignup}
							errorMsg={errorMsg}
						/>

						<div className="at-signup-link">
							<div className="at-resend-verification-email-link at-wrap">
								<p>
									By clicking register, you agree to our <a href="/terms" className="at-link at-link--terms at-resend-verification-email">Terms and Privacy Policy.</a>
								</p>
							</div>
							<p>
								Already have an account? <a href="/sign-in" id="at-signUp" className="at-link at-signup">Sign in.</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ModalSignup;
