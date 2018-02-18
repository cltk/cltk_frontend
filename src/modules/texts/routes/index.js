import React from 'react';
import { Route, IndexRoute } from 'react-router';

// layouts
import MainLayout from '../../../layouts/MainLayout';

// components
import TextDetailContainer from '../containers/TextDetailContainer';

export default (
	<div>

		<Route path="/texts" component={MainLayout}>
			<IndexRoute component={TextDetailContainer} />
			<Route path="/texts/:id/" component={TextDetailContainer} />
			<Route path="/texts/:id/:location" component={TextDetailContainer} />
		</Route>

	</div>
);
