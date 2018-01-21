import React from 'react';
import { compose } from 'react-apollo';

import TextListItem from '../../components/TextListItem';
import textListItemQuery from '../../graphql/queries/listItem';


class TextListItemContainer extends React.Component {
	render() {
		let collection = null;

		if (
			this.props.textListItemQuery
			&& this.props.textListItemQuery.collection
		) {
			collection = this.props.textListItemQuery.collection;
		}

		return (
			<TextListItem
				collection={collection}
				{...this.props}
			/>
		);
	}
}

export default compose(
	textListItemQuery,
)(TextListItemContainer);
