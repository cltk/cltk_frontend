import React from 'react';
import BlazeToReact from 'meteor/gwendall:blaze-to-react';
import PropTypes from 'prop-types';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class ModalSignup extends React.Component {

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	}

	render() {
		const lowered = this.props.lowered;

		return (
			<div
				className={`cltk-modal-signup cltk-modal cltk-login-signup
					${((lowered) ? ' lowered' : '')}`}
			>
				<div
					className="close-modal paper-shadow"
					onClick={this.props.closeModal}
				>
					<i className="mdi mdi-close" />
				</div>
				<div className="modal-inner">
					{!this.props.isTest ?
						<BlazeToReact blazeTemplate="atForm" state="signUp" />
					: ''}
				</div>
			</div>
		);
	}
}

ModalSignup.propTypes = {
	lowered: PropTypes.bool,
	closeModal: PropTypes.func,
	isTest: PropTypes.bool,
};

ModalSignup.childContextTypes = {
	muiTheme: PropTypes.object.isRequired,
};

export default ModalSignup;
