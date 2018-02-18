import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import S3Upload from 'react-s3-uploader/s3upload';
import autoBind from 'react-autobind';
import shortid from 'shortid';

import FileDetails from './FileDetails';


import './FileThumbnail.css';


const DragHandle = SortableHandle(() => (
	<div className="fileThumbnailMoveButton">
		<i className="mdi mdi-bars" />
	</div>
));


export default class FileThumbnail extends React.Component {
	constructor(props) {
		super(props);

		autoBind(this);
	}

	componentWillMount() {
		if (
			process.env.REACT_APP_BUCKET_URL
			&& this.props.file
			&& !this.props.file.path
		) {
			this._id = shortid.generate();
			this.uploadFile();
		}
	}

	uploadFile() {
		const files = [this.props.file];
		new S3Upload({
			onProgress: this.handleProgress,
			onFinishS3Put: this.handleFinish,
			fileElement: { files },
			signingUrl: '/s3/sign',
			server: process.env.REACT_APP_SERVER,
			onError: this.handleError,
			uploadRequestHeaders: {'x-amz-acl': 'public-read'},
			contentDisposition: 'auto',
			s3path: '',
			scrubFilename: (filename) => {
        const secureFilename = filename.replace(/[^\w\d_\-\.]+/ig, ''); // eslint-disable-line
				return `${this._id}-${secureFilename}`;
			},
			signingUrlMethod: 'GET',
			signingUrlWithCredentials: true
		});
	}

	handleProgress(percentage) {
		this.setState({
			progress: percentage,
		});
	}

	handleFinish(event) {
		const file = {
			name: event.filename,
			title: this.props.file.name,
			type: this.props.file.type,
			path: `${process.env.REACT_APP_BUCKET_URL}/${event.filename}`,
			thumbPath: `http://iiif.orphe.us/${event.filename}/full/90,/0/default.jpg`,
			_id: this._id
		};
		this.props.updateFileCb(this.props.fileIndex, file);
	}

	render() {

		const { file } = this.props;
		const fileType = file.type || '';
		const isImage = fileType.slice(0, fileType.indexOf('/')) === 'image';

		const thumbnail = isImage ? (
			<img
				alt={file.title}
				src={`//iiif.orphe.us/${file.name}/square/160,/0/default.jpg`}
				onClick={this.toggleTitleInput}
			/>
		)
		: (
			<div className="fileIcon">
				<i className="mdi mdi-file" />
			</div>
		);

    // add more conditions if needed

		return (
			<div className="fileThumbnail">
				<DragHandle />
				<div className="fileDetailsButtons">
					<button
						className="fileDetailsDeleteFile"
						onClick={() => {
							this.props.removeFile(this.props.fileIndex);
						}}
					>
						<i className="mdi mdi-close" />
					</button>
				</div>
				<div className="fileThumbnailImage">
					{file.path ?
						thumbnail
	          :
						<div className="fileIcon fileUploadingIcon">
							<i className="mdi mdi-dots-horizontal" />
						</div>
	        }
				</div>
				<FileDetails
					file={file}
				/>
			</div>
		);
	}
}
