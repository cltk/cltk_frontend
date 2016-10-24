import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { uploadAvatar } from '../avatar_client_utils.js';

class AvatarEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			avatarUrl: props.defaultAvatarUrl,
		};

		this.preventDefault = this.preventDefault.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
		this.handleSelectFile = this.handleSelectFile.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			avatarUrl: nextProps.avatar.url ? nextProps.avatar.url : nextProps.defaultAvatarUrl,
		});
	}

	preventDefault(event) {
		event.preventDefault();
	}

	handleDrop(event) {
		event.preventDefault();
		uploadAvatar(event.dataTransfer.files[0], { type: 'user' });
	}

	handleSelectFile() {
		UploadFS.selectFile(data => uploadAvatar(data, { type: 'user' }));
	}

	render() {
		return (
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
		);
	}
}

AvatarEditor.propTypes = {
	defaultAvatarUrl: React.PropTypes.string.isRequired,
	avatar: React.PropTypes.object,
	avatarLoading: React.PropTypes.bool,
};

AvatarEditor.defaultProps = {
	defaultAvatarUrl: '',
	avatar: {},
	avatarLoading: false,
};

export default createContainer((props) => {
	const myAvatarHandle = Meteor.subscribe('users.myAvatar');

	return {
		defaultAvatarUrl: props.defaultAvatarUrl,
		avatar: Meteor.user().avatar,
		avatarLoading: !myAvatarHandle.ready(),
	};
}, AvatarEditor);