import React from 'react';
import { Route } from 'react-router';

// layouts
import MainLayout from '../../../layouts/MainLayout';

// components
import AboutPage from '../components/AboutPage';
import PageContainer from '../containers/PageContainer';


export default (
	<div>
		<Route
			path="about"
			component={props => (
				<MainLayout>
					<AboutPage />
				</MainLayout>
			)}
		/>
		<Route
			path=":slug"
			component={props => (
				<MainLayout>
					<PageContainer {...props} />
				</MainLayout>
			)}
		/>
	</div>
);
