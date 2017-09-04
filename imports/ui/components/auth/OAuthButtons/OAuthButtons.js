import React from 'react';

const handleOAuth = provider => {
  window.location = `${Meteor.settings.public.apiURI}/auth/${provider}`
}

const handleFacebook = () => handleOAuth('facebook')
const handleGoogle = () => handleOAuth('google')
const handleTwitter = () => handleOAuth('twitter')

const OAuthButtons = () => (
  <div className="at-oauth">
    <button
      className="btn at-social-btn"
      id="at-facebook"
      name="facebook"
      onClick={handleFacebook}
    >
      <i className="fa fa-facebook" /> Sign in with Facebook
    </button>

    <button
      className="btn at-social-btn"
      id="at-google"
      name="google"
      onClick={handleGoogle}
    >
      <i className="fa fa-google" /> Sign in with Google
    </button>

    <button
      className="btn at-social-btn"
      id="at-twitter"
      name="twitter"
      onClick={handleTwitter}
    >
      <i className="fa fa-twitter" /> Sign in with Twitter
    </button>
  </div>
);

export default OAuthButtons;
