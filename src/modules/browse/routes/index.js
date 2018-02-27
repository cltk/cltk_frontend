import React from 'react';
import { Route } from 'react-router';

// components
import BrowsePage from '../components/BrowsePage';
import MainLayout from '../../../layouts/MainLayout';


export default (
	<div>
		<Route
			path="browse"
			component={() => (
				<MainLayout>
					<BrowsePage />
				</MainLayout>
      )}
		/>
	</div>
);
