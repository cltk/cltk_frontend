import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import './CoverTitle.css';


const CoverTitle = ({ title, coverLink, coverLinkText}) => (
	<div className="coverTitleOuter">
		<h1 className="coverTitle">{title}</h1>
		{coverLink && coverLinkText ?
			<Link
				to={coverLink}
				className="coverLink"
			>
				{coverLinkText}
			</Link>
		: ''}
	</div>
);

CoverTitle.propTypes = {
	title: PropTypes.string,
	coverLink: PropTypes.string,
	coverLinkText: PropTypes.string,
};


export default CoverTitle;
