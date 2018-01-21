import React from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// lib
import muiTheme from '../../../../lib/muiTheme';

class ModalChangePwd extends React.Component {
	getChildContext() {
		return { muiTheme: getMuiTheme(muiTheme) };
	}

	componentWillMount() {
		document.addEventListener('keydown', this._handleKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this._handleKeyDown);
	}

	_handleKeyDown(event) {

		const { closeModal } = this.props;

		if (event.keyCode === 'ESCAPE_KEY') closeModal();
	}

	render() {
		const lowered = this.props.lowered;

		return (
			<div>
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
						Add change pwd form
					</div>
				</div>
			</div>
		);
	}
}

ModalChangePwd.propTypes = {
	lowered: PropTypes.bool,
	closeModal: PropTypes.func,
};

ModalChangePwd.childContextTypes = {
	muiTheme: PropTypes.object.isRequired,
};


export default ModalChangePwd;
