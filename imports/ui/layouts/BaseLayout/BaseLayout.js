import React from 'react';

export default function BaseLayout(props) {
	return (
		<main>
			{props.content}
		</main>
	);
}

BaseLayout.propTypes = {
	content: React.PropTypes.element
};
