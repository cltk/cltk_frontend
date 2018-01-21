import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import './Button.css';

const Button = (props) => {

	const { to, onClick, light, transparentLight, dark, primary, accent, outline, classes } = props;
	const _classes = classes || [];

	_classes.push('cltk-button');

	if (primary) {
		_classes.push('cltk-button--primary');
	} else if (accent) {
		_classes.push('cltk-button--accent');
	} else if (light) {
		_classes.push('cltk-button--light');
	} else if (transparentLight) {
		_classes.push('cltk-button--trans-light');
	} else if (dark) {
		_classes.push('cltk-button--dark');
	}

	if (outline) {
		_classes.push('cltk-button--outline');
	}

	return (
		<Link
			to={to}
			onClick={onClick}
			className={_classes.join(' ')}
		>
			{props.children}
		</Link>
	);
};

Button.propTypes = {
	to: PropTypes.string,
	onClick: PropTypes.func,
	light: PropTypes.bool,
	transparentLight: PropTypes.bool,
	primary: PropTypes.bool,
	accent: PropTypes.bool,
	outline: PropTypes.bool,
	children: PropTypes.node,
};

export default Button;
