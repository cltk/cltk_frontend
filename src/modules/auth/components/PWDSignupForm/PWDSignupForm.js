import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, SubmissionError } from 'redux-form';

import '../PWDLoginForm/PWDLoginForm.css';

// actions
import { toggleAuthModal, setUser } from '../../actions';


const wrapSubmit = signup => async (values, dispatch) => {
	try {
		const userObj = await signup(values);
		dispatch(setUser(userObj));
		dispatch(toggleAuthModal(false));
		return {};
	} catch (err) {
		if (err.passwordError) {
			throw new SubmissionError({ _error: `Password too weak: ${err.suggestion}` });
		}
		throw new SubmissionError({ _error: 'Registration failed!' });
	}
};

function renderField({ input, label, type, meta }) {
	return (
		<div className="at-input form-group has-feedback">
			<input
				{...input}
				type={type}
				style={{width: '100%'}}
				placeholder={label}
				autoCapitalize="none"
				autoCorrect="off"
				autoComplete="off"
				spellCheck="false"
				required
			/>
			{meta.touched && meta.error && <span className="help-block">{meta.error}</span>}
		</div>
	);
}

const PWDSignupForm = ({ error, handleSubmit, pristine, reset, submitting, signup }) => (
	<div className="at-pwd-form">
		<form onSubmit={handleSubmit(wrapSubmit(signup))}>
			<Field
				name="username"
				label="Email"
				type="email"
				component={renderField}
			/>
			<Field
				name="password"
				label="Password"
				type="password"
				component={renderField}
			/>
			<Field
				name="passwordRepeat"
				label="Password (Again)"
				type="password"
				component={renderField}
			/>
			<span className="error-text">
				{error && <strong>{error}</strong>}
			</span>
			<div className="at-pwd-link">
				<p>
					<a href="/forgot-password" id="at-forgotPwd" className="at-link at-pwd">Forgot your password?</a>
				</p>
			</div>
			<button type="submit" className="at-btn submit btn btn-lg btn-block btn-default" id="at-btn" disabled={submitting}>
				Register
			</button>
		</form>
	</div>
);

PWDSignupForm.propTypes = {
	signup: PropTypes.func.isRequired,
};

const validate = (values) => {
	const errors = {};

	if (values.password !== values.passwordRepeat) {
		errors.passwordRepeat = 'Passwords do not match';
	}

	return errors;
};

export default reduxForm({
	form: 'PWDSignupForm',
	validate,
})(PWDSignupForm);
