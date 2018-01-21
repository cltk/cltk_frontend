import React from 'react';
import PropTypes from 'prop-types';

import ThumbnailImage from '../ThumbnailImage';

import './ThumbnailImages.css';


const ThumbnailImages = ({ files, activeImage, setActiveFile }) => {
	if (!files) {
		return null;
	}


	return (
		<div className="thumbnailImages">
			{files.map((file, i) => {
				let isActiveImage = false;
				if (file._id === activeImage._id) {
					isActiveImage = true;
				}

				return (
					<ThumbnailImage
						key={file._id}
						file={file}
						isActiveImage={isActiveImage}
						setActiveFile={setActiveFile}
					/>
				);
			})}
		</div>
	);
};

ThumbnailImages.propTypes = {
	files: PropTypes.array,
};

ThumbnailImages.defaultProps = {
	files: [],
};


export default ThumbnailImages;
