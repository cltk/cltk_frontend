import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

const mountedAttacks = new Set();

function sendSnack(msg) {
	if (mountedAttacks.size > 1) {
		console.warn('Too many SnackAttacks.', mountedAttacks);
	} else if (mountedAttacks.size === 0) {
		console.warn('Tried to send snack, but no SnackAttacks.', msg);
	}

	for (const sa of mountedAttacks) {
		sa.showSnack(msg);
	}
}

class SnackAttack extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			message: '',
			actionLabel: null,
			actionCallback: null,
		};

		this.handleRequestClose = this.handleRequestClose.bind(this);
	}

	componentDidMount() {
		mountedAttacks.add(this);
	}

	componentWillUnmount() {
		mountedAttacks.delete(this);
	}

	showSnack(message, actionLabel = null, actionCallback = null) {
		this.setState({
			open: true,
			message,
			actionLabel,
			actionCallback,
		});
	}

	handleRequestClose() {
		this.setState({ open: false });
	}

	render() {
		return (
			<Snackbar
				className="snackAttack"
				autoHideDuration={this.props.autoHideDuration}
				open={this.state.open}
				message={this.state.message}
				onRequestClose={this.handleRequestClose}
				action={this.state.actionLabel}
				onActionTouchTap={this.state.actionCallback}
			/>
		);
	}
}

SnackAttack.propTypes = {
	autoHideDuration: PropTypes.number,
};

SnackAttack.defaultProps = {
	autoHideDuration: 4000,
};

export default SnackAttack;
