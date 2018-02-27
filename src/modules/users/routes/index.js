import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Projects
import MainLayout from '../../../layouts/MainLayout';
import ProfileContainer from '../containers/ProfileContainer';

export default (
	<div>
		<Route path="/profile" component={MainLayout}>
			<IndexRoute component={ProfileContainer} />
		</Route>
		<Route path="/users/:id" component={ProfileContainer} />
	</div>
);
