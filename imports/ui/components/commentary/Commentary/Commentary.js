import React from 'react';
import PropTypes from 'prop-types';

class Commentary extends React.Component {

	getInitialState() {
		return {
			showMore: false,
		};
	}

	toggleShowMore() {
		this.setState({
			showMore: !this.state.showMore,
		});
	}

	render() {
		const { showMore } = this.state;
		const commentClassName = `meta-item panel-item commentary-comment ${
			(showMore ? 'expanded' : '')}`;

		return (
			<div className={commentClassName} data-num={this.props.comment.index}>
				<div className="show-more-toggle" onClick={this.toggleShowMore}>
					<i className="mdi mdi-plus paper-shadow" />
					<i className="mdi mdi-minus paper-shadow" />

				</div>
				<div className="comment-meta">
					<span className="comment-ref">
						{this.props.comment.ref}&nbsp;
					</span>
					<span className="comment-authors">{this.props.comment.author}</span>
					<span className="comment-date">{this.props.comment.year}</span>
				</div>

				<p
					className="comment-content"
					dangerouslySetInnerHTML={{ __html: this.props.comment.content }}
				/>
			</div>
		);
	}
}

Commentary.propTypes = {
	comment: React.PropTypes.object.isRequired,
};

export default Commentary;
