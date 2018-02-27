import React from 'react';
import { Route, IndexRoute } from 'react-router';

// layouts
import ReadingLayout from '../layouts/ReadingLayout';

// containers
import ReadingEnvironmentContainer from '../containers/ReadingEnvironmentContainer';


export default (
	<div>

		<Route path="/texts" component={ReadingLayout}>
			<IndexRoute component={ReadingEnvironmentContainer} />
			<Route path="/texts/:id/" component={ReadingEnvironmentContainer} />
			<Route path="/texts/:id/:slug" component={ReadingEnvironmentContainer} />
			<Route path="/texts/:id/:slug/:location" component={ReadingEnvironmentContainer} />
		</Route>

	</div>
);
