import React from 'react';
import PropTypes from 'prop-types';

import DiscussionComment from '../DiscussionComment';

import './Discussion.css';


const Discussion = ({ comments}) => (
	<div className="discussion">
		{comments.map(comment => (
			<DiscussionComment
				key={comment._id}
				{...comment}
			/>
		))}
	</div>
);

Discussion.propTypes = {
	comments: PropTypes.array,
};

Discussion.defaultProps = {
	comments: [],
};

export default Discussion;
