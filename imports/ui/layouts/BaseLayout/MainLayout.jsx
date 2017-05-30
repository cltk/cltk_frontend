import React from 'react';

export default function MainLayout(props) {
	return (
		<main>
			{props.content}
		</main>
	);
}

MainLayout.propTypes = {
	content: React.PropTypes.element
};
