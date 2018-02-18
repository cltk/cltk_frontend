import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

import './ReadingMedia.css';

class ReadingMedia extends React.Component {

	render() {
		let image = {
			caption: '"Folio 45V". <em>The Vergilius Vaticanus</em>. Vatican, Biblioteca Apostolica, Cod. Vat. lat. 3225). Rome, Italy. Ca 400 AD.',
		};
		let imageUrl = '/images/aeneid-demo-image-2.png';

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

export default ReadingMedia;
