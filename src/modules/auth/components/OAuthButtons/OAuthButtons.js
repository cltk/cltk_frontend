import React from 'react';
import PropTypes from 'prop-types';
import hello from 'hellojs';

import './OAuthButtons.css';


class OAuthButtons extends React.Component {

	constructor(props) {
		super(props);

		this.socialTypes = ['facebook', 'google', 'twitter'];

		this.state = {
			disabledButtons: false,
			errorOauth: null,
		};

		this.OAuthButton = this.OAuthButton.bind(this);
	}

	async handleLogin(type) {
		const { login } = this.props;


		this.setState({
			disabledButtons: true,
		});

		try {
			const auth = await hello(type).login();

			if (type === 'twitter') {
				await login({ network: auth.network, oauthToken: auth.authResponse.oauth_token, oauthTokenSecret: auth.authResponse.oauth_token_secret });
			} else {
				await login({ network: auth.network, accessToken: auth.authResponse.access_token });
			}

		} catch (err) {
			this.setState({
				errorOauth: err.message,
				disabledButtons: false,
			});
		}
	}

	_getButtonText(type) {
		const { register } = this.props;
		if (register) return `Sign Up with ${type}`;
		return `Sign In with ${type}`;
	}

	OAuthButton({ type }) {
		const { disabledButtons } = this.state;

		return (
			<button
				className="btn at-social-btn"
				id={`at-${type}`}
				name={type}
				onClick={this.handleLogin.bind(this, type)}
				disabled={disabledButtons}
			>
				<i className={`mdi mdi-${type}`} /> {this._getButtonText(type)}
			</button>);
	}

	render() {

		const { errorOauth } = this.state;

		return (
			<div className="at-oauth">
				{this.socialTypes.map(social => <this.OAuthButton key={social} type={social} />)}
				<span className="error-text">
					{errorOauth}
				</span>
			</div>
		);
	}
}

OAuthButtons.propTypes = {
	login: PropTypes.func.isRequired,
	register: PropTypes.bool,
};

OAuthButtons.defaultProps = {
	register: false,
};

export default OAuthButtons;
