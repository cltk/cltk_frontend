import React from 'react';
import { Route } from 'react-router';

// components
import AboutPage from '../components/AboutPage';
import NotFoundPage from '../components/NotFoundPage';
import MainLayout from '../../../layouts/MainLayout';


export default (
	<div>
		<Route
			path="about"
			component={() => (
				<MainLayout>
					<AboutPage />
				</MainLayout>
			)}
		/>
		<Route
			path=":slug"
			component={() => (
				<MainLayout>
					<NotFoundPage />
				</MainLayout>
			)}
		/>
	</div>
);
