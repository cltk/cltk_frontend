import React from 'react';
import { compose } from 'react-apollo';


import textSelectorQuery from '../../graphql/queries/textSelector';
import textListQuery from '../../graphql/queries/list';
import TextSelector from '../../components/TextSelector';


const TextSelectorContainer = props => {
	let collection = null;
	let collections = [];

	if (
		props.textSelectorQuery
	) {
		if (
			props.textSelectorQuery.collection
		) {
			collection = props.textSelectorQuery.collection;
		}
		if (
			props.textSelectorQuery.collections
		) {
			collections = props.textSelectorQuery.collections;
		}
	}

	return (
		<TextSelector
			collection={collection}
			collections={collections}
			collectionId={props.collectionId}
			textGroupUrn={props.textGroupUrn}
			workUrn={props.workUrn}
			handleSelectCollection={props.handleSelectCollection}
			handleSelectTextGroup={props.handleSelectTextGroup}
			handleSelectWork={props.handleSelectWork}
		/>
	);
}


export default compose(
	textSelectorQuery, textListQuery,
)(TextSelectorContainer);
