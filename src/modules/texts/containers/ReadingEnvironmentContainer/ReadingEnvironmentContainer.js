import React from 'react';
import { compose } from 'react-apollo';

import ReadingEnvironment from '../../components/ReadingEnvironment';
import readingEnvironmentQuery from '../../graphql/queries/readingEnvironment';


class ReadingEnvironmentContainer extends React.Component {
	render() {
		let collection = null;

		if (
			this.props.readingEnvironmentQuery
			&& this.props.readingEnvironmentQuery.collection
		) {
			collection = this.props.readingEnvironmentQuery.collection;
		}

		return (
			<ReadingEnvironment
				_id={this.props._id}
				collection={collection}
				handleRemove={this.props.handleRemove.bind(this, this.props._id)}
			/>
		);
	}
}

export default compose(
	readingEnvironmentQuery,
)(ReadingEnvironmentContainer);
