import React from 'react';
import { compose } from 'react-apollo';
import { withRouter } from 'react-router';

import workSearchQuery from '../../graphql/queries/workSearch';
import SearchResults from '../../components/SearchResults';


const SearchResultsContainer = props => {

	let works = [];
	let total = 0;

	if (
    props.workSearchQuery
    && props.workSearchQuery.workSearch
    && props.workSearchQuery.workSearch.works
    && props.workSearchQuery.workSearch.works.length
  ) {
		works = props.workSearchQuery.workSearch.works;
		total = props.workSearchQuery.workSearch.total;
	}

	return (
		<SearchResults
			works={works}
			total={total}
    />
	);
}

export default compose(
  workSearchQuery,
  withRouter,
)(SearchResultsContainer);
