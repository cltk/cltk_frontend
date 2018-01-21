import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

import PrimaryImage from './PrimaryImage';
import ThumbnailImages from './ThumbnailImages';

import './ItemImageViewer.css';


class ItemImageViewer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			activeImage: null,
		};

		autoBind(this);
	}


	setActiveFile(file) {
		this.setState({
			activeImage: file,
		});
	}

	render() {
		const { files, itemMiradorLink } = this.props;
		let activeImage = this.state.activeImage;

		if (!activeImage) {
			activeImage = files[0];
		}

		return (
			<div className="itemImageViewer">
				<PrimaryImage
					image={activeImage}
					itemMiradorLink={itemMiradorLink}
				/>
				<ThumbnailImages
					files={files}
					activeImage={activeImage}
					setActiveFile={this.setActiveFile}
				/>
			</div>
		);
	}
}

ItemImageViewer.propTypes = {
	title: PropTypes.string,
	files: PropTypes.array,
};

ItemImageViewer.defaultProps = {
	title: '',
	files: [],
};

export default ItemImageViewer;
