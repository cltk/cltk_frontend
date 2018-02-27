import React from 'react';
import { compose } from 'react-apollo';

import ReadingHeader from '../../components/ReadingHeader';
import readingEnvironmentQuery from '../../graphql/queries/readingEnvironment';


class ReadingHeaderContainer extends React.Component {
	render() {
		let work = null;

		if (
			this.props.readingEnvironmentQuery
			&& this.props.readingEnvironmentQuery.work
		) {
			work = this.props.readingEnvironmentQuery.work;
		}


		// TODO: handle loading
		if (!work) {
			return <div />
		}

		return (
			<ReadingHeader
				work={work}
				location={this.props.location}
			/>
		);
	}
}

export default compose(
	readingEnvironmentQuery,
)(ReadingHeaderContainer);
