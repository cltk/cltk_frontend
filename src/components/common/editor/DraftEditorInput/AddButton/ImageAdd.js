import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import UploadImages from './UploadImage';

export default class ImageAdd extends Component {
  // Start the popover closed
	state = {
		url: '',
		open: false,
	};

  // When the popover is open and users click anywhere on the page,
  // the popover should close
	componentDidMount() {
		document.addEventListener('click', this.closePopover);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.closePopover);
	}

  // Note: make sure whenever a click happens within the popover it is not closed
	onPopoverClick = () => {
		this.preventNextClose = true;
	}
	uploadedUrl(url) {
		const { editorState, onChange } = this.props;
		onChange(this.props.modifier(editorState, url));
	}
	openPopover = () => {
		if (!this.state.open) {
			this.preventNextClose = true;
			this.setState({
				open: true,
			});
		}
	};

	closePopover = () => {
		if (!this.preventNextClose && this.state.open) {
			this.setState({
				open: false,
			});
		}

		this.preventNextClose = false;
	};

	addVideo = () => {
		const { editorState, onChange } = this.props;
		onChange(this.props.modifier(editorState, this.state.url));
	};

	changeUrl = (evt) => {
		this.setState({ url: evt.target.value });
	};

	render() {
		const popoverClassName = this.state.open ?
      'draftAddImagePopover' :
      'draftAddVideoClosedPopover';
		return (
			<div>
				<RaisedButton className="draft-add-video-button" onMouseUp={this.openPopover}>{this.props.label}</RaisedButton>
				<div className={popoverClassName} onClick={this.onPopoverClick}>
					<div className="draft-image-from-url">
						<input
							type="text"
							placeholder="Paste the image url …"
							onChange={this.changeUrl}
							value={this.state.url}
						/>
						<RaisedButton className="draft-add-video-confirm-button" onClick={this.addVideo}>Add</RaisedButton>
					</div>
					<span>or</span>
					<UploadImages uploadedUrl={this.uploadedUrl.bind(this)} />
				</div>
			</div>
		);
	}
}
