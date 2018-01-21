import React from 'react';
import S3Upload from 'react-s3-uploader/s3upload';
import CircularProgressbar from 'react-circular-progressbar';
import { Field } from 'redux-form';
import FontAwesome from 'react-fontawesome';
import { SortableHandle } from 'react-sortable-hoc';



export default class ImagesInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleProgress = this.handleProgress.bind(this);
		this.handleFinish = this.handleFinish.bind(this);
		this.handleError = this.handleError.bind(this);
		this.deleteImage = this.deleteImage.bind(this);
		this.imageIndex = this.props.imageIndex;
		this.imageType = this.props.image.type;
		this.imageName = this.props.image.name;
		this.state = {
			progress: 0,
			files: [this.props.image]
		};
	}

	componentWillMount() {
		if (!this.props.image.path && process.env.REACT_APP_BUCKET_URL) {
			this._id = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
			this.uploadFile();
		}
	}

	handleProgress(percentage) {
		this.setState({progress: percentage});
	}

	inputComponent(props) {
		return <TextInput {...props} />;
	}

	handleFinish(event) {
		const image = {
			name: this.imageName,
			type: this.imageType,
			path: `${process.env.REACT_APP_BUCKET_URL}/${event.filename}`,
			thumbPath: `http://iiif.cltk.org/${event.filename}/full/90,/0/default.jpg`,
			_id: this._id
		};
		this.props.updateImageCb(this.imageIndex, image);
	}

	handleError(error) {
		this.props.showError(error);
	}

	uploadFile() {
		this.myUploader = new S3Upload({
			onProgress: this.handleProgress,
			onFinishS3Put: this.handleFinish,
			fileElement: this.state,
			signingUrl: '/s3/sign',
			server: process.env.REACT_APP_SERVER,
			onError: this.handleError,
			uploadRequestHeaders: {'x-amz-acl': 'public-read'},
			contentDisposition: 'auto',
			scrubFilename: (filename) => {
				const secureFilename = filename.replace(/[^\w\d_\-\.]+/ig, ''); // eslint-disable-line
				return `${this._id}-${secureFilename}`;
			},
			signingUrlMethod: 'GET',
			signingUrlWithCredentials: true
		});
	}

	deleteImage() {
		this.props.deleteImage(this.imageIndex);
	}

	render() {
		const DragHandle = SortableHandle(() => <div className="moveButton"><FontAwesome name="bars" /></div>); // This can be any component you want
		const disableInput = !this.props.image.path;
		if (!process.env.REACT_APP_BUCKET_URL) {
			this.deleteImage();
			this.handleError('REACT_APP_BUCKET_URL is not set, upload cancelled');
			return null;
		}
		return (
			<div>

				<div className="row fileInput">
					<div className="row">
						<div className="col-lg-2">
							<DragHandle />
						</div>
						<div className="col-lg-10">
							<div className="deleteButton">
								<a href="#deleteImage" onClick={this.deleteImage}>
									<FontAwesome name="times" />
								</a>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-2 progressBox">
							{this.props.image.path ? <img src={this.props.image.thumbPath} alt="thumbnail" /> :
							<CircularProgressbar percentage={this.state.progress} />}
						</div>
						<div className="col-lg-10">
							<div>
								<Field
									name={`images[${this.props.imageIndex}].label`}
									component={this.inputComponent}
									type="text"
									placeholder="Image label..."
									value={this.props.image.label}
									disabled={disableInput}
									onClick={this.test}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);

	}
}
