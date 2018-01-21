import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import './PrimaryImage.css';

const PrimaryImage = ({ image, itemMiradorLink }) => {

	if (!image) {
		return null;
	}

	const src = `//iiif.cltk.org/${image.name}/full/1400,/0/default.jpg`;

	const styles = {
		backgroundImage: `url(${src})`,
		backgroundSize: 'contain',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
	};

	return (
		<div className="primaryImageOuter">
			<div
				style={styles}
				className="primaryImage"
			/>
			{itemMiradorLink ?
				<Link
					to={itemMiradorLink}
					className="viewInMiradorLink"
				>
					<i className="mdi mdi-eye" />
					<span>
						View in Mirador
					</span>
				</Link>
			: ''}
		</div>
	);
};

PrimaryImage.propTypes = {
	image: PropTypes.object.isRequired,
};

export default PrimaryImage;
