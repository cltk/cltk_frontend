import React from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

import './FileUploader.css';


export default class FileUploader extends React.Component {
	constructor(props) {
		super(props);

		this.handleDrop = this.handleDrop.bind(this);

		this.state = {
			uploading: false,
		};
	}

	handleDrop(acceptedFiles, rejectedFiles) {
		acceptedFiles.forEach((file) => {
			this.props.addFile(file);
		});
	}

	render() {
		return (
			<div className="fileUploader">
				<Dropzone
					className="fileDropzone"
					accept="image/*, application/pdf"
					onDrop={this.handleDrop}
				>
					<div className="fileUploaderLabel">
						<label>
							{
								this.state.uploading ?
									'Uploading...'
								:
									'Drag and drop files or click to select'
							}
						</label>
					</div>
				</Dropzone>
			</div>
		);
	}
}
FileUploader.propTypes = {
	addFile: PropTypes.func.isRequired
};
