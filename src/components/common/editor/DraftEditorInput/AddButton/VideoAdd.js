import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class VideoAdd extends Component {
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
	};

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
		const url = this.state.url.replace('watch?v=', 'embed/');
		onChange(this.props.modifier(editorState, { src: url }));
	};

	changeUrl = (evt) => {
		this.setState({ url: evt.target.value });
	};

	render() {
		const popoverClassName = this.state.open ?
      'draftAddVideoPopover' :
      'draftAddVideoClosedPopover';
		return (
			<div>
				<RaisedButton className="draft-add-video-button" onMouseUp={this.openPopover}>{this.props.label}</RaisedButton>
				<div className={popoverClassName} onClick={this.onPopoverClick}>
					<input
						type="text"
						placeholder="Paste the video url …"
						onChange={this.changeUrl}
						value={this.state.url}
					/>
					<RaisedButton className="draft-add-video-confirm-button" onClick={this.addVideo}>Add</RaisedButton>
				</div>
			</div>
		);
	}
}
