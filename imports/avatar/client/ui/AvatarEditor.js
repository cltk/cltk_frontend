import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { AvatarUploader } from '/imports/avatar/client/avatar_client_utils.js';
import { sendSnack } from '/imports/ui/components/shared/SnackAttack/SnackAttack';

class AvatarEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			avatarUrl: props.defaultAvatarUrl,
			isDefault: true,
			progress: 0,
			isProgressShown: false,
		};

		this.preventDefault = this.preventDefault.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
		this.handleSelectFile = this.handleSelectFile.bind(this);
		this.handleDeleteAvatar = this.handleDeleteAvatar.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const isDefault = !nextProps.avatar.url;
		this.setState({
			isDefault,
			avatarUrl: isDefault ? nextProps.defaultAvatarUrl : nextProps.avatar.url,
		});
	}

	preventDefault(event) {
		event.preventDefault();
	}

	uploadAvatar(data, context) {
		const self = this;
		const uploader = new AvatarUploader({
			data,
			context,
			onStart() {
				self.setState({
					progress: 0,
					isProgressShown: true,
				});
			},
			onError(err) {
				console.error(err);
				sendSnack(err.reason);
			},
			onComplete() {
				self.setState({
					isProgressShown: false,
				});
				sendSnack('Profile pic has been uploaded');
			},
			onProgress: (progress) => {
				if (progress > 100) {
					self.setState({ progress: 100 });
				} else {
					self.setState({ progress: Math.floor(progress * 100) });
				}
			},
		});

		uploader.start();
	}

	handleDrop(event) {
		event.preventDefault();
		this.uploadAvatar(event.dataTransfer.files[0], { type: 'user' });
	}

	handleSelectFile() {
		UploadFS.selectFile(data => this.uploadAvatar(data, { type: 'user' }));
	}

	handleDeleteAvatar() {
		if (!this.state.isDefault && this.props.avatar._id) {
			Meteor.call('avatar.delete', { avatarId: this.props.avatar._id });
		}
	}

	render() {
		let progressStyle = {
			display: 'none',
		};
		if (this.state.isProgressShown) {
			progressStyle = {
				display: 'block',
			};
		}
		return (
			<div className="user-profile-picture-container">
				<div className="userAvatarDelete" onClick={this.handleDeleteAvatar} >
					<i
						className={`mdi mdi-delete mdi-36px mdi-dark ${(this.state.isDefault ?
							'mdi-inactive userAvatarDeleteInactive'	: 'userAvatarDeleteActive')}`}
					/>
				</div>
				<div className="user-profile-picture">
					<img alt="avatar" src={this.state.avatarUrl} />

					<div
						className="upload-profile-picture"
						onClick={this.handleSelectFile}
						onDragStart={this.preventDefault}
						onDragEnter={this.preventDefault}
						onDragOver={this.preventDefault}
						onDragLeave={this.preventDefault}
						onDrop={this.handleDrop}
					>
						<i className="mdi mdi-image-area" />
						<span className="help-text">
							Select to upload or drag and drop.
						</span>
					</div>
				</div>
				<LinearProgress mode="determinate" value={this.state.progress} style={progressStyle} />
			</div>
		);
	}
}

AvatarEditor.propTypes = {
	defaultAvatarUrl: React.PropTypes.string.isRequired,
	avatar: React.PropTypes.object,
	avatarLoading: React.PropTypes.bool,
	user: React.PropTypes.object,
};

AvatarEditor.defaultProps = {
	defaultAvatarUrl: '',
	avatar: {},
	avatarLoading: false,
};

export default createContainer((props) => {
	const myAvatarHandle = Meteor.subscribe('users.myAvatar');
	let userAvatar = {};
	if (props.user) {
		userAvatar = props.user.avatar || {};
	} else if (Meteor.user()) {
		userAvatar = Meteor.user().avatar || {};
	}

	return {
		defaultAvatarUrl: props.defaultAvatarUrl,
		avatar: userAvatar,
		avatarLoading: !myAvatarHandle.ready(),
	};
}, AvatarEditor);
