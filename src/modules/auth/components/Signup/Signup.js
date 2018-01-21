import React from 'react';
import PropTypes from 'prop-types';

import OAuthButtons from '../OAuthButtons';
import PWDSignupForm from '../PWDSignupForm';


class Signup extends React.Component {

	static propTypes = {
		onSigninClick: PropTypes.func.isRequired,
		signup: PropTypes.func.isRequired,
	}

	render() {
		const { signup, onSigninClick } = this.props;

		return (
			<div className="at-form">
				<div className="at-title">
					<h3>
						Create an Account or
						<button
							id="at-signUp"
							className="at-link at-signup"
							onClick={onSigninClick}
						>
							Sign in
						</button>
						.
					</h3>
				</div>

				<OAuthButtons
					login={signup}
					register
				/>

				<div className="at-sep">
					<strong>OR</strong>
				</div>

				<PWDSignupForm
					signup={signup}
				/>

				<div className="at-signup-link">
					<div className="at-resend-verification-email-link at-wrap">
						<p>
							By clicking register, you agree to our <a href="/terms" className="at-link at-link--terms at-resend-verification-email">Terms and Privacy Policy.</a>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Signup;
