import React from 'react';
import { compose } from 'react-apollo';

import TextList from '../../components/TextList';
import textsQuery from '../../graphql/queries/list';


class TextListContainer extends React.Component {
	render() {
		let texts = [];

		if (
			this.props.textListQuery
			&& this.props.textListQuery.project
		) {
			texts = this.props.textListQuery.project.texts;
		}

		return (
			<TextList
				texts={texts}
			/>
		);
	}
}

export default compose(
	textsQuery,
)(TextListContainer);
