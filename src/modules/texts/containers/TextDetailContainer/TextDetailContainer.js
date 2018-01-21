import React from 'react';
import { compose } from 'react-apollo';
import autoBind from 'react-autobind';

import ReadingEnvironmentContainer from '../ReadingEnvironmentContainer';
import textDetailQuery from '../../graphql/queries/detail';
import textListQuery from '../../graphql/queries/list';
import textRemoveMutation from '../../graphql/mutations/remove';


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
		let userIsAdmin = false;

		if (
			this.props.textQuery
			&& this.props.textQuery.project
		) {
			text = this.props.textQuery.project.text;
			userIsAdmin = this.props.textQuery.project.userIsAdmin;
		}

		return (
			<ReadingEnvironmentContainer
				{...text}
				userIsAdmin={userIsAdmin}
				handleRemove={this.handleRemove}
			/>
		);
	}
}

export default compose(
	textDetailQuery, textListQuery, textRemoveMutation,
)(TextDetailContainer);
