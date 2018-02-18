import React from 'react';

// routes
import homeRoute from '../modules/home/routes';
import pageRoutes from '../modules/pages/routes';
import textRoutes from '../modules/texts/routes';
import userRoutes from '../modules/users/routes';


export default (
	<div>
		{/* Home Route for cltk.org */}
		{homeRoute}

		{/* Routes for texts */}
		{textRoutes}

		{/* Routes for users */}
		{userRoutes}

		{/* Routes for single pages */}
		{pageRoutes}
	</div>
);
