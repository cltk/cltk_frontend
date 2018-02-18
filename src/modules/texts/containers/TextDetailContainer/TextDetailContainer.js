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

	handleRemove(textId) {
		const { textRemove, router } = this.props;

		textRemove(textId)
			.then((response) => {
				router.replace('/texts');
			})
			.catch((err) => {
				console.error(err);
			});
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
				handleRemove={this.handleRemove}
			/>
		);
	}
}

export default compose(
	textDetailQuery,
)(TextDetailContainer);
