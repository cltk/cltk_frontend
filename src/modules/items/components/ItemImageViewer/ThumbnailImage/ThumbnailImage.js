import React from 'react';

import './ThumbnailImage.css';


const ThumbnailImage = ({ file, isActiveImage, setActiveFile }) => {

	if (!file) {
		return null;
	}

	const src = `//iiif.cltk.org/${file.name}/square/60,/0/default.jpg`;


	return (
		<img
			className={`
				thumbnailImage
				${isActiveImage ?
					'isActiveImage'
				:
					''
				}
			`}
			alt={file.title}
			src={src}
			onClick={setActiveFile.bind(this, file)}
		/>
	);
}

export default ThumbnailImage;
