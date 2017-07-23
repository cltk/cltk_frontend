import React from 'react';
import ContentClear from 'material-ui/svg-icons/content/clear';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class LoginDialog extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			open: this.props.initialOpen,
		};
	}

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	}

	handleClose() {
		this.setState({
			open: false,
		});
		if (typeof this.props.handleLoginDialogClose === 'function') {
			this.props.handleLoginDialogClose();
		}
	}

	render() {
		const styles = {
			closeButton: {
				width: 'auto',
				float: 'right',
				top: -10,
			},
			dialogTitle: {
				width: 'auto',
				float: 'left',
			},
		};
		return (

			<Dialog
				modal
				open={this.state.open}
				titleStyle={styles.dialogTitle}
				autoScrollBodyContent
			>
				<IconButton
					tooltip="Close" style={styles.closeButton}
					onClick={this.handleClose}
				>
					<ContentClear />
				</IconButton>
				<div className="row">
					<div className="col s12 m8 push-m2 push-l3 l6 z-depth-1">
					</div>
				</div>
			</Dialog>
		);
	}
}


LoginDialog.propTypes = {
	initialOpen: PropTypes.bool.isRequired,
	handleLoginDialogClose: PropTypes.func.isRequired,
};

LoginDialog.childContextTypes = {
	muiTheme: PropTypes.object.isRequired,
};

export default LoginDialog;
