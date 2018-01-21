import React from 'react';
import PropTypes from 'prop-types';

import Tag from '../Tag';

import './Tags.css';


const Tags = props => (
	<div className="tags">
		{props.tags.map(tag => (
			<Tag
				key={tag}
				tag={tag}
			/>
		))}
	</div>
);

Tags.propTypes = {
	tags: PropTypes.array,
};

Tags.defaultProps = {
	tags: [],
};


export default Tags;
