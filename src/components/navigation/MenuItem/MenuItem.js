import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';


import './MenuItem.css';

const MenuItem = ({ to, onClick, children }) => (
	<Link
		className="menuItem"
		to={to}
		onClick={onClick}
	>
		{children}
	</Link>
);

MenuItem.propTypes = {
	to: PropTypes.string,
	onClick: PropTypes.func,
};

export default MenuItem;
