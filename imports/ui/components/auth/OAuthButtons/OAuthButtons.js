import React from 'react';

const OAuthButtons = ({ handleFacebook, handleGoogle, handleTwitter }) => (
	<div className="at-oauth">
		{handleFacebook &&
			<button
				className="btn at-social-btn"
				id="at-facebook"
				name="facebook"
				onClick={handleFacebook}
			>
				<i className="fa fa-facebook" /> Sign in with Facebook
			</button>}

		{handleGoogle &&
			<button
				className="btn at-social-btn"
				id="at-google"
				name="google"
				onClick={handleGoogle}
			>
				<i className="fa fa-google" /> Sign in with Google
			</button>}

		{handleTwitter &&
			<button
				className="btn at-social-btn"
				id="at-twitter"
				name="twitter"
				onClick={handleTwitter}
			>
				<i className="fa fa-twitter" /> Sign in with Twitter
			</button>}
	</div>
);
OAuthButtons.propTypes = {
	handleFacebook: React.PropTypes.func,
	handleGoogle: React.PropTypes.func,
	handleTwitter: React.PropTypes.func,
};
OAuthButtons.defaultProps = {
	handleFacebook: null,
	handleGoogle: null,
	handleTwitter: null,
};

export default OAuthButtons;
