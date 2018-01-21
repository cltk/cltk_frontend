import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import FlatButton from 'material-ui/FlatButton';

class ReadingMedia extends React.Component {

	getDefaultProps() {
		return {
			mediaId: '',
		};
	}


	render() {
		const mediaItem = this.props.mediaItem;

		let image = {
			caption: '"Folio 45V". <em>The Vergilius Vaticanus</em>. Vatican, Biblioteca Apostolica, Cod. Vat. lat. 3225). Rome, Italy. Ca 400 AD.',
		};
		let imageUrl = '/images/aeneid-demo-image-2.png';

		/*
		if (mediaItem) {
			imageUrl = mediaItem.url();
		}
		*/

		return (
			<div className="embedded-media">
				<div className="media-outer">
					<img alt="thumbnail" src={imageUrl} />
					<FlatButton
						className="show-in-viewer-button"
						label="Image Viewer"
						icon={<i className="mdi mdi-magnify" />}
					/>
				</div>
				<div className="media-description">
					<span className="media-caption">
						{image.caption}
					</span>

				</div>

			</div>
		);
	}
}

ReadingMedia.propTypes = {
	mediaId: PropTypes.string,
};

const ReadingMediaContainer = createContainer(() => {
	const mediaSubscription = Meteor.subscribe('attachments', this.props.mediaId);
	let attachment = null;
	if (mediaSubscription.ready()) {
		attachment = Attachments.findOne({ _id: this.props.mediaId });
	}

	return {
		mediaItem: attachment,
	};
}, ReadingMedia);


export default ReadingMediaContainer;
