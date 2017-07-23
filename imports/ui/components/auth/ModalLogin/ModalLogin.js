import React from 'react';
import PropTypes from 'prop-types';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Meteor } from 'meteor/meteor';

class ModalLogin extends React.Component {

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	}

	render() {
		const lowered = this.props.lowered;

		return (
			<div>
				{!Meteor.userId() ?
					<div
						className={`cltk-modal-login
						cltk-modal cltk-login-signup ${((lowered) ? ' lowered' : '')}`}
					>
						<div
							className="close-modal paper-shadow"
							onClick={this.props.closeModal}
						>
							<i className="mdi mdi-close" />
						</div>
						<div className="modal-inner">
						</div>
					</div>
					: ''
				}
			</div>
		);
	}
}

ModalLogin.propTypes = {
	lowered: PropTypes.bool,
	closeModal: PropTypes.func,
	isTest: PropTypes.bool,
};

ModalLogin.childContextTypes = {
	muiTheme: PropTypes.object.isRequired,
};


export default ModalLogin;
