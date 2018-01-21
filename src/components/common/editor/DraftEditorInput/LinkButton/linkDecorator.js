import React from 'react';
import PropTypes from 'prop-types';
import { CompositeDecorator } from 'draft-js';

const Link = (props) => {
	const { url } = props.contentState.getEntity(props.entityKey).getData();
	const style = {
		color: '#3b5998',
		textDecoration: 'underline',
	};
	return (
		<a href={url} style={style}>
			{props.children}
		</a>
	);
};
Link.propTypes = {
	contentState: PropTypes.shape({
		getEntity: PropTypes.func.isRequired,
	}).isRequired,
	children: PropTypes.element,
	entityKey: PropTypes.string,
};
Link.defaultProps = {
	children: null,
	entityKey: null,
};

function findLinkEntities(contentBlock, callback, contentState) {
	contentBlock.findEntityRanges(
		(character) => {
			const entityKey = character.getEntity();

			return (
				entityKey !== null &&
				contentState.getEntity(entityKey).getType() === 'LINK'
			);
		},
		callback
	);
}

const linkDecorator = new CompositeDecorator([{
	strategy: findLinkEntities,
	component: Link,
}]);

export default linkDecorator;
export { Link, findLinkEntities };
