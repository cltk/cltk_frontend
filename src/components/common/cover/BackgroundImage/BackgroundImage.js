import React from 'react';

import Textures from '../Textures';

import './BackgroundImage.css';

const BackgroundImage = ({ src }) => {
	const styles = {
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
	};

	if (src) {
		styles.backgroundImage = `url(${src})`;
	} else {
		styles.backgroundColor = 'rgba(0, 0, 0, 0.04)';
	}

	return (
		<div
			className="backgroundImage"
			style={styles}
		>
			{!src ?
				<Textures />
			: ''}
		</div>
	);
};

export default BackgroundImage;
