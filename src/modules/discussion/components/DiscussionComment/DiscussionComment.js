import React from 'react';
import PropTypes from 'prop-types';


const DiscussionComment = ({ user, updatedAt, content }) => (
	<div className="discussionComment">
		<div className="discussionTitleContainer">
			<span className="discussionTitle">Discussion</span>
		</div>
		<div className="discussionMeta">
			<span className="discussionAuthor">{user.name}</span>
			<span className="discussionDate">{updatedAt}</span>
		</div>
		<div className="discussionContentContainer">
			<p className="discussionContent">
				{content}
			</p>
		</div>
		<div className="discussionReplyButtonContainer">
			<span className="discussionReplyButton">Reply</span>
		</div>
	</div>
);

DiscussionComment.propTypes = {
	user: PropTypes.object,
	updatedAt: PropTypes.number,
	content: PropTypes.object,
};

export default DiscussionComment;
