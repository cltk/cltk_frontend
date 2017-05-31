import React from 'react';

export default function BaseLayout(props) {
	return (
		<main>
			{props.content}
		</main>
	);
}

MainLayout.propTypes = {
	content: React.PropTypes.element
};
