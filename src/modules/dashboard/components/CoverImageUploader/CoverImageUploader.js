import React from 'react';
import Dropzone from 'react-dropzone';
import S3Upload from 'react-s3-uploader/s3upload';
import autoBind from 'react-autobind';

import makeId from '../../../../lib/makeId';

import './CoverImageUploader.css';

export default class CoverImageUploader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			image: this.props.image,
			uploading: false
		};
		autoBind(this);
	}

	handleError(error) {
		console.error('error LOG', error);
	}

	componentWillMount() {
		if (!this.props.image && process.env.REACT_APP_BUCKET_URL) {
			this._id = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
		}
	}

	handleFinish(event) {
		this.setState({
			uploading: false,
		});

		const image = {
			name: event.filename,
			path: `${process.env.REACT_APP_BUCKET_URL}/${event.filename}`,
			thumbPath: `http://iiif.cltk.org/${event.filename}/full/90,/0/default.jpg`,
			_id: this._id
		};

		this.props.changeValue(image);
	}

	handleProgress(event) {
		console.error('event LOG', event);
	}

	uploadFile(acceptedFile) {
		const fileToUpload = {
			files: [acceptedFile[0]]
		};
		if (fileToUpload.files.length) {
			this.setState({uploading: true});

			const uploader = new S3Upload({
				onFinishS3Put: this.handleFinish,
				onProgress: this.handleProgress,
				fileElement: fileToUpload,
				signingUrl: '/s3/sign',
				s3path: 'images/',
				server: process.env.REACT_APP_SERVER,
				onError: this.handleError,
				uploadRequestHeaders: { 'x-amz-acl': 'public-read' },
				contentDisposition: 'auto',
				scrubFilename: (filename) => {
          const secureFilename = filename.replace(/[^\w\d_\-\.]+/ig, ''); // eslint-disable-line
					return `${makeId()}-${secureFilename}`;
				},
				signingUrlMethod: 'GET',
				signingUrlWithCredentials: true,
			});

			// TODO: fix uploader
			uploader.upload();
		}
	}

	render() {
		const { image } = this.props;
		const styles = {
			backgroundColor: '#fff',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
		};


		if (image) {
			styles.backgroundImage = `url(${image.path})`;
		}


		return (
			<div className="coverImageUploader">
				<Dropzone
					className="backgroundImage"
					accept="image/*"
					onDrop={this.uploadFile}
					style={styles}
				>
					{!image ?
						<div className="coverImageLabel">
							<label>
								{
									this.state.uploading ?
										'Uploading...'
									:
										'Drag and drop a cover image or click to select file'
								}
							</label>
						</div>
					: ''}
				</Dropzone>
			</div>
		);
	}
}
