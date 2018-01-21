import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';


import './MenuSubItem.css';

const MenuSubItem = ({ to, onClick, children, last }) => (
	<Link
		className={`
			menuSubItem
			${last ? 'menuSubItemLast' : ''}
			`}
		to={to}
		onClick={onClick}
	>
		<span>
			{children}
		</span>
	</Link>
);

MenuSubItem.propTypes = {
	to: PropTypes.string,
	onClick: PropTypes.func,
};

export default MenuSubItem;
