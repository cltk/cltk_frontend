import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { Slingshot } from 'meteor/edgee:slingshot';
import DropZone from 'react-dropzone';
import { Meteor } from 'meteor/meteor';
import RaisedButton from 'material-ui/RaisedButton';

import { sendSnack } from '/imports/ui/components/shared/SnackAttack';

export default class AvatarEditor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			avatarUrl: Meteor.user() && Meteor.user().profile && Meteor.user().profile.avatarUrl ? Meteor.user().profile.avatarUrl : props.defaultAvatarUrl,
		};

		// binding users
		autoBind(this);
	}

	preventDefault(event) {
		event.preventDefault();
	}

	onDrop(acceptedFiles, rejectedFiles) {
		const context = { type: 'user' };
		const uploader = new Slingshot.Upload('uploads', context);

		if (rejectedFiles && rejectedFiles.length) {
			sendSnack('There was an error uploading your profile picture');
		}

		uploader.send(acceptedFiles[0], (error, downloadUrl) => {
			if (error) {
				// Log service detailed response
				console.error('Error uploading', uploader.xhr.response);
				sendSnack(error);
			} else {
				this.props.uploadedUrl(downloadUrl);
			}
		});
	}

	render() {
		return (
			<DropZone className="draft-editor-dropzone" onDrop={this.onDrop} multiple={false} accept={'image/*'}>
				<RaisedButton className="draft-add-video-confirm-button" onClick={this.addVideo}>Upload image</RaisedButton>                
			</DropZone>
		);
	}
}

AvatarEditor.propTypes = {
	defaultAvatarUrl: PropTypes.string.isRequired
};

AvatarEditor.defaultProps = {
	defaultAvatarUrl: '',
};
