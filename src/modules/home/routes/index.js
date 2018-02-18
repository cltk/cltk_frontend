import React from 'react';
import { Route } from 'react-router';

// archive.cltk.org home
import Home from '../components/Home';
import MainLayout from '../../../layouts/MainLayout';

export default (
	<div>
		<Route
			exact
			path="/"
			component={() => (
				<MainLayout>
					<Home />
				</MainLayout>
			)}
		/>
	</div>
);
