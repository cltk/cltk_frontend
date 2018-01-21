import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import './ItemTitle.css';


const ItemTitle = ({ _id, title, editLink, handleRemove }) => (
	<div className="itemTitleOuter">
		<h1 className="itemTitle">{title}</h1>
		{editLink ?
			<Link
				to={editLink}
				className="itemTitleLink itemTitleLinkEdit"
			>
				Edit
			</Link>
		: ''}
		{handleRemove ?
			<button
				className="itemTitleLink itemTitleLinkRemove"
				onClick={handleRemove.bind(this, _id)}
			>
				Remove
			</button>
		: ''}
	</div>
);

ItemTitle.propTypes = {
	title: PropTypes.string,
	showEditLink: PropTypes.bool,
};

ItemTitle.defaultProps = {
	title: '',
	showEditLink: false,
};


export default ItemTitle;
