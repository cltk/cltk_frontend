import React from 'react';
import PropTypes from 'prop-types';


import Cover from '../../../../components/common/cover/Cover';
import CoverTitle from '../../../../components/common/cover/CoverTitle';
import BackgroundImage from '../../../../components/common/cover/BackgroundImage';
import Bricks from '../../../../components/common/cover/Bricks';

import './PageCover.css';


const PageCover = ({
	title, coverImage, coverLink, coverLinkText, coverBricks, handleRemove
}) => {
	let background = null;

	if (coverBricks) {
		background = (<Bricks />);
	} else {
		background = (
			<BackgroundImage
				src={
					coverImage ?
					`//iiif.orphe.us/${coverImage}/full/1400,/0/default.jpg`
					: null
				}
			/>
		);
	}

	return (
		<Cover
			className="collections-cover"
			background={background}
			bottom
		>
			<CoverTitle
				title={title}
				coverLink={coverLink}
				coverLinkText={coverLinkText}
				handleRemove={handleRemove}
			/>
		</Cover>
	);
}

PageCover.propTypes = {
	title: PropTypes.string.isRequired,
	coverImage: PropTypes.string,
	coverLink: PropTypes.string,
	coverLinkText: PropTypes.string,
};

export default PageCover;
