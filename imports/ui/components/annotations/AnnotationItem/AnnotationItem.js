import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { moment } from 'meteor/momentjs:moment';

class AnnotationItem extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			editMode: false,
			moreOptionsVisible: false,
			shareOptionsVisible: false,
		};

		autoBind(this);
	}

	showEditMode() {
		this.setState({
			editMode: true,
		});
	}

	closeEditMode() {
		this.setState({
			editMode: false,
		});
	}

	updateAnnotation() {
		const content = $(this.updateCommentForm).find('textarea').val();

		Meteor.call('annotation.update', {
			_id: this.props.annotation._id,
			content,
		});

		this.setState({
			editMode: false,
		});
	}

	upvoteAnnotation() {
		if (typeof this.props.currentUser !== 'undefined' || 'null') {
			Meteor.call('annotation.upvote',
				this.props.annotation._id
			);
		}
	}

	reportAnnotation() {
		if (typeof this.props.currentUser !== 'undefined' || 'null') {
			Meteor.call('annotation.report',
				this.props.annotation._id
			);
		}
	}

	toggleMoreOptions() {
		this.setState({
			moreOptionsVisible: !this.state.moreOptionsVisible,
			shareOptionsVisible: false,
		});
	}

	toggleShareOptions() {
		this.setState({
			shareOptionsVisible: !this.state.shareOptionsVisible,
			moreOptionsVisible: false,
		});
	}

	render() {
		const self = this;
		const userIsLoggedIn = Meteor.user();

		const { annotation, user } = this.props;
		annotation.children = [];

		let userLink = '';
		let userUpvoted = false;
		let userReported = false;
		let username = '';

		if (user) {
			if (user.username) {
				userLink = `/users/${user._id}/${user.username}`;
			} else {
				userLink = `/users/${user._id}`;
			}
			if (user.username) {
				username = user.username;
			} else if (
				'emails' in user
				&& user.emails.length
			) {
				username = user.emails[0].address.split('@')[0];
			}
		}

		if (
			this.props.currentUser &&
			annotation.voters &&
			annotation.voters.indexOf(this.props.currentUser._id) >= 0
		) {
			userUpvoted = true;
		}

		if (
			this.props.currentUser &&
			annotation.usersReported &&
			annotation.usersReported.indexOf(this.props.currentUser._id) >= 0
		) {
			userReported = true;
		}

		return (
			<div className="annotation paper-shadow">
				<div className="inner-comment-row">
					<div className="annotationer-profile-picture profile-picture paper-shadow">
						<a href={userLink}>
						{user ?
							<img
								src={user.avatar ?
									user.avatar.url : '/images/default_user.jpg'}
								alt={username}
							/>
						:
							<img
								src='/images/default_user.jpg'
								alt='Default user'
							/>
						}
						</a>
					</div>

					<div className="annotater-meta">
						<a href={userLink}>
							<span className="annotationer-name">
								{username}
							</span>
						</a>
						<span className="annotation-date">
							<span>{annotation.updated ? 'Updated: ' : 'Created: '}</span>
							{moment(annotation.updated ||
								annotation.created).format('D MMMM YYYY')}
						</span>
					</div>

				</div>
				<div className="inner-comment-row">
					<div className="annotation-text">
						{/* <div
						 dangerouslySetInnerHTML={{ __html: annotation.content}}
						 ></div> */}
						{this.state.editMode ?
							<form
								className="update-comment-form clearfix"
								name="update-comment-form"
								ref={(component) => { this.updateCommentForm = component; }}
							>
								<textarea
									className="new-comment-text"
									defaultValue={this.props.annotation.content}
								/>
								<div className="comment-edit-buttons">
									<RaisedButton
										label="Update"
										className="submit-comment-button paper-shadow"
										onClick={this.updateannotation}
									/>
									<FlatButton
										label="Close"
										className="close-form-button"
										onClick={this.closeEditMode}
									/>
								</div>
							</form>
							:
							<div>{annotation.content}</div>
						}

					</div>
				</div>
				<div className="inner-comment-row">
					<FlatButton
						label={annotation.votes}
						onClick={this.upvoteannotation}
						className={`annotation-button vote-up ${(userUpvoted) ? 'upvoted' : ''}`}
						icon={<FontIcon className="mdi mdi-chevron-up" />}
					>
						{!userIsLoggedIn ?
							<span className="md-tooltip">You must be signed in to vote.</span>
							:
							''
						}
					</FlatButton>
					{(
							'currentUser' in self.props
						&& user
						&& self.props.currentUser
						&& self.props.currentUser._id === user._id
					) ?
						<FlatButton
							label="Edit"
							onClick={this.showEditMode}
							className="annotation-button edit"
						/>
					:
						''
					}
					<FlatButton
						label=""
						onClick={this.toggleShareOptions}
						className="annotation-button"
						icon={<FontIcon className="mdi mdi-share" />}
					>
						<span className="md-tooltip">Share</span>
					</FlatButton>

					<FlatButton
						onClick={this.toggleMoreOptions}
						label=""
						className={`annotation-button toggle-more-button ${(this.state.moreOptionsVisible) ? 'toggle-more-button--active' : ''}`}
						icon={<FontIcon className="mdi mdi-dots-horizontal" />}
					>
						<span className="md-tooltip">Show more</span>
					</FlatButton>

					<div className={`more-options ${this.state.moreOptionsVisible ? 'more-options--visible' : ''}`}>
						<FlatButton
							label="Report"
							onClick={this.reportannotation}
							className={`annotation-button report ${(userReported) ? 'reported' : ''}`}
							icon={<FontIcon className="mdi mdi-flag" />}
						>
							{!userIsLoggedIn ?
								<span className="md-tooltip">
									You must be signed in to report a comment.
								</span>
								:
								''
							}
						</FlatButton>
					</div>
					<div className={`more-options share-options ${this.state.shareOptionsVisible ? 'more-options--visible' : ''}`}>
						<FlatButton
							label="Facebook"
							href="#"
							className="annotation-button"
							icon={<FontIcon className="mdi mdi-facebook" />}
						/>
						<FlatButton
							label="Twitter"
							href="#"
							className="annotation-button"
							icon={<FontIcon className="mdi mdi-twitter" />}
						/>
						<FlatButton
							label="Google"
							href="#"
							className="annotation-button"
							icon={<FontIcon className="mdi mdi-google-plus" />}
						/>
						<FlatButton
							label="Mail"
							href="#"
							className="annotation-button"
							icon={<FontIcon className="mdi mdi-email-outline" />}
						/>
					</div>
				</div>


				{/* false ?
					<div className="reply-create-form">
						<div className="add-comment-wrap">
							<form
								className="new-comment-form"
								name="new-comment-form"
							>
								<div className="add-comment-row-1">
									<textarea
										className="new-comment-text"
										placeholder="Enter your reply here . . . "
									/>
									<RaisedButton
										label="Submit"
										type="submit"
										className="submit-comment-button paper-shadow"
									/>
									<RaisedButton
										label="Close Reply"
										className="close-form-button"
										onClick={this.closeReply}
									/>
								</div>
							</form>
						</div>
					</div>
					: '' */}

				<div className="annotation-children">

					{annotation.children.map((annotationChild, j) =>
						<div
							key={j}
							className="annotation annotation-child"
						>
							<div className="inner-comment-row">
								<div className="annotationer-profile-picture profile-picture paper-shadow">
									<img src="/images/default_user.png" alt={username} />
								</div>
								<div className="annotationer-meta">
									<span className="annotationer-name">
										{annotationChild.user.name}
									</span>
									<span className="annotation-date">
										{annotationChild.updated}
									</span>
								</div>
							</div>
							<div className="inner-comment-row">
								<div className="annotation-text">
									<p
										dangerouslySetInnerHTML={{
											__html: annotationChild.content,
										}}
									/>
								</div>
							</div>
							<div className="inner-comment-row">
								<FlatButton
									label={annotation.votes}
									onClick={this.upvoteannotation}
									className="vote-up upvoted"
									icon={<FontIcon className="mdi mdi-chevron-up" />}
								/>
								<FlatButton
									label="Reply"
									onClick={this.showReplyForm}
									className="reply"
								/>
								<FlatButton
									label="Edit"
									onClick={this.editannotation}
									className="edit"
								/>
								<FlatButton
									label="Remove"
									onClick={this.removeannotation}
									className="remove"
								/>
							</div>
							{/* <!-- .annotation-child --> */}
						</div>
					)}
					{/* <!-- .annotation-children --> */}
				</div>
				{/* <!-- .annotation --> */}
			</div>
		);
	}
}

AnnotationItem.propTypes = {
	annotation: PropTypes.object.isRequired,
	user: PropTypes.object,
};

export default createContainer(({ annotation }) => {
	let user;

	if (annotation && annotation.user) {
		user = Meteor.users.findOne({_id: annotation.user})
	}

	return {
		user,
	};
}, AnnotationItem);
