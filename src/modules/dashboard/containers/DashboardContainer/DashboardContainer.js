import React from 'react';
import { compose } from 'react-apollo';

import countsQuery from '../../graphql/queries/counts';
import Dashboard from '../../components/Dashboard';


const DashboardContainer = props => {
	let collectionsCount = 0;
	let articlesCount = 0;
	let itemsCount = 0;
	let textsCount = 0;

	if (
			props.countsQuery
		&& props.countsQuery.project
	) {
		const project = props.countsQuery.project;
		collectionsCount = project.collectionsCount;
		articlesCount = project.articlesCount;
		itemsCount = project.itemsCount;
		textsCount = project.textsCount;
	}

	return (
		<Dashboard
			 collectionsCount={collectionsCount}
			 articlesCount={articlesCount}
			 itemsCount={itemsCount}
			 textsCount={textsCount}
		/>
	);
}

export default compose(
	countsQuery,
)(DashboardContainer);
