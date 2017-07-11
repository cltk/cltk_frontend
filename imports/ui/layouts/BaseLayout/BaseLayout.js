import React from 'react';
import PropTypes from 'prop-types';

export default function BaseLayout(props) {
	return (
		<main>
			{props.content}
		</main>
	);
}

BaseLayout.propTypes = {
	content: PropTypes.element
};
