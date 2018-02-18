import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


import './AnnotationsList.css';


class AnnotationsList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			sortMethod: 'votes',
		};

		autoBind(this);
	}

	addDiscussionComment() {
		$(this.newCommentForm).find('textarea').val('');
	}

	sortMethodSelect(value) {
		this.setState({
			sortMethod: value,
		})
	}

	render() {
		const { annotations } = this.props;

		let discussionWrapClass = 'discussion-wrap';

		if (this.state.discussionVisible) {
			discussionWrapClass += ' discussion-visible';
		}

		let textareaPlaceholder = '';
		if (currentUser) {
			textareaPlaceholder = 'Enter your comment here . . .';
		} else {
			textareaPlaceholder = 'Please login to enter a comment.';
		}

		const sortSelectedLabelStyle = {
			color: '#FFFFFF',
		};

		return (
			<div className={discussionWrapClass}>
				<div className="discussion-thread">
					<div className="add-comment-wrap paper-shadow ">
						<form
							ref={(component) => { this.newCommentForm = component; }}
							className="new-comment-form"
							name="new-comment-form"
						>
							<div className="add-comment-row-1">
								<div className="profile-picture paper-shadow">
									<img
										src={currentUser && currentUser.avatar ?
											currentUser.avatar.url : '/images/default_user.jpg'}
										alt="User"
									/>
								</div>
								<textarea
									className="new-comment-text"
									name="newCommentText"
									placeholder={textareaPlaceholder}
								/>
							</div>
							<div className="add-comment-row-2 add-comment-row">
								<div className="error-message">
									<span className="error-message-text">Please enter your text to submit.</span>
								</div>
								{ currentUser ?
									<RaisedButton
										label="Submit"
										className="submit-comment-button paper-shadow"
										onClick={this.addDiscussionComment}
									/>
									:
									<div
										className="new-comment-login"
									>
										<FlatButton
											label="Join"
											className="join-link"
											href="/sign-up"
										/>
										<FlatButton
											label="Login"
											className="login-link"
											href="/sign-in"
										/>
									</div>
								}
							</div>
						</form>
					</div>
					<div
						className="sort-by-wrap"
					>
						{/*
						 <span className="sort-by-label">Sort by:</span>
						 <RaisedButton
							 label="Top"
							 className="sort-by-option selected-sort sort-by-top"
							 onClick={this.toggleSort}>
						 </RaisedButton>
						 <RaisedButton
							 label="Newest"
							 className="sort-by-option sort-by-new"
							 onClick={this.toggleSort}>
						 </RaisedButton>
						 */}
					</div>
					{annotations && annotations.length === 0 ?
						<div className="no-results-wrap">
							<span className="no-results-text">No annotations.</span>
						</div>
						: ''
					}
					<div className="sort-method-select">
						<FlatButton
							label="Top votes"
							labelStyle={this.state.sortMethod === 'votes' ? sortSelectedLabelStyle : {}}
							backgroundColor={this.state.sortMethod === 'votes' ? '#795548' : ''}
							onClick={this.sortMethodSelect.bind(null, 'votes')}
						/>
						<FlatButton
							label="Recent"
							labelStyle={this.state.sortMethod === 'recent' ? sortSelectedLabelStyle : {}}
							backgroundColor={this.state.sortMethod === 'recent' ? '#795548' : ''}
							onClick={this.sortMethodSelect.bind(null, 'recent')}
						/>
					</div>
					{annotations && annotations.map((annotation, i) =>
						<AnnotationItem
							key={i}
							className="discussion-comment paper-shadow"
							annotation={annotation}
							currentUser={currentUser}
						/>
					)}
				</div>
			</div>
		);
	}
}


AnnotationsList.propTypes = {
	text: PropTypes.object.isRequired,
};

export default AnnotationsList;
