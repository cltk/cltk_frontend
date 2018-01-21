import React from 'react';
import PropTypes from 'prop-types';
import hello from 'hellojs';

import OAuthButtons from '../OAuthButtons';
import PWDLoginForm from '../PWDLoginForm';
import './Login.css';

hello.init({
	facebook: process.env.REACT_APP_FACBOOK_CLIENT_ID,
	twitter: process.env.REACT_APP_TWITTER_CLIENT_ID,
	google: process.env.REACT_APP_GOOGLE_CLIENT_ID
}, {
	// redirect_uri: '/',
	oauth_proxy: `${process.env.REACT_APP_SERVER}/oauthproxy`,
});



class Login extends React.Component {

	static propTypes = {
		onRegisterClick: PropTypes.func.isRequired,
		login: PropTypes.func.isRequired,
	}

	render() {
		const { login, onRegisterClick } = this.props;

		return (
			<div className="at-form">
				<h3>
					Sign In or
					<button
						id="at-signUp"
						className="at-link at-signup"
						onClick={onRegisterClick}
					>
						Create an Account
					</button>
					.
				</h3>
				<div className="at-signup-link" />

				<OAuthButtons
					login={login}
				/>

				<div className="at-sep">
					<strong>OR</strong>
				</div>

				<PWDLoginForm
					login={login}
				/>

				<div className="at-resend-verification-email-link at-wrap">
					<p>
						Verification email lost? <a href="/send-again" id="at-resend-verification-email" className="at-link at-resend-verification-email">Send again.</a>
					</p>
				</div>
			</div>
		);
	}
}

export default Login;
