import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const LinkButtonDialog = ({ open, linkValue, handleClose, handleAddLink, handleRemoveLink, onValueChange }) => {
	const actions = [
		<FlatButton
			label="Cancel"
			primary
			onClick={handleClose}
		/>,
		<FlatButton
			label="Remove link"
			primary
			onClick={handleRemoveLink}
		/>,
		<FlatButton
			label="Add link"
			primary
			onClick={handleAddLink}
		/>,
	];

	return (
		<Dialog
			title="Add link"
			actions={actions}
			open={open}
			onRequestClose={handleClose}
		>
			<TextField
				hintText="URL"
				fullWidth
				defaultValue={linkValue}
				onChange={onValueChange}
			/>
		</Dialog>
	);
};
LinkButtonDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	linkValue: PropTypes.string,
	handleClose: PropTypes.func.isRequired,
	handleAddLink: PropTypes.func.isRequired,
	handleRemoveLink: PropTypes.func.isRequired,
	onValueChange: PropTypes.func.isRequired,
};
LinkButtonDialog.defaultProps = {
	linkValue: '',
};

export default LinkButtonDialog;
