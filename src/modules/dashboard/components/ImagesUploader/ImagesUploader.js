import React from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import './ImagesUploader.css';

export default class ImagesUploader extends React.Component {
	constructor(props) {
		super(props);
		this.handleDrop = this.handleDrop.bind(this);
	}

	handleDrop(acceptedFiles, rejectedFiles) {
		acceptedFiles.forEach((file) => {
			this.props.addImage(file);
		});
	}

	render() {
		return (
			<div>
				<Dropzone className="dropzone" accept="image/*" onDrop={this.handleDrop}>
					<div className="text">Drop files here</div>
				</Dropzone>
			</div>
		);
	}
}
ImagesUploader.propTypes = {
	addImage: PropTypes.func.isRequired
};
