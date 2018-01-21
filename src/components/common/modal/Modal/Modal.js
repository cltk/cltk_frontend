import React from 'react';
import PropTypes from 'prop-types';

import './Modal.css';


const Modal = ({ children, classes, show, closeModal }) => {

	if (show) {
		return (
			<div
				className={`cltkModal ${classes.join(' ')}`}
			>
				<div
					className="closeModal"
					onClick={closeModal}
				>
					<i className="mdi mdi-close" />
				</div>
				<div className="modalInner">
					{children}
				</div>
			</div>
		);
	}
	return null;
};

Modal.propTypes = {
	children: PropTypes.element.isRequired,
	closeModal: PropTypes.func.isRequired,
	classes: PropTypes.arrayOf(PropTypes.string),
	show: PropTypes.bool,
};

Modal.defaultProps = {
	show: false,
	classes: [],
};

export default Modal;
