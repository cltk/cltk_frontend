import React from 'react';
import { Route } from 'react-router';

// layouts
import ProjectLayout from '../../projects/layouts/ProjectLayout';
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
				<ProjectLayout>
					<PageContainer {...props} />
				</ProjectLayout>
			)}
		/>
	</div>
);
