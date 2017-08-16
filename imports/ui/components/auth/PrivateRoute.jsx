import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (

	<Route
		{...rest}
		render={props => (
			Meteor.user() ? (
				<Component {...props} />
			) : (
				<Redirect 
					to={{
						pathname: '/sign-in',
						state: { from: props.location }
					}}
				/>
			)
		)}
	/>
);

export default PrivateRoute;
