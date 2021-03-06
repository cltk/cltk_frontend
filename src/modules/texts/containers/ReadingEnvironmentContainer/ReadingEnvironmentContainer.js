import React from 'react';
import { compose } from 'react-apollo';

import ReadingEnvironment from '../../components/ReadingEnvironment';
import readingEnvironmentQuery from '../../graphql/queries/readingEnvironment';


class ReadingEnvironmentContainer extends React.Component {
	render() {
		let work = null;

		if (
			this.props.readingEnvironmentQuery
			&& this.props.readingEnvironmentQuery.work
		) {
			work = this.props.readingEnvironmentQuery.work;
		}

		return (
			<ReadingEnvironment
				{...work}
			/>
		);
	}
}

export default compose(
	readingEnvironmentQuery,
)(ReadingEnvironmentContainer);
