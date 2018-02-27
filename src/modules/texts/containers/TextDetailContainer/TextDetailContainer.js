import React from 'react';
import { compose } from 'react-apollo';
import autoBind from 'react-autobind';

import ReadingEnvironmentContainer from '../ReadingEnvironmentContainer';
import textDetailQuery from '../../graphql/queries/detail';


class TextDetailContainer extends React.Component {
	constructor(props) {
		super(props);
		autoBind(this);
	}

	render() {
		let text = [];

		if (
			this.props.textQuery
			&& this.props.textQuery.project
		) {
			text = this.props.textQuery.project.text;
		}

		return (
			<ReadingEnvironmentContainer
				{...text}
			/>
		);
	}
}

export default compose(
	textDetailQuery,
)(TextDetailContainer);
