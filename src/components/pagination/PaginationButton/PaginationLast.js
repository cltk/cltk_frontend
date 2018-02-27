import React from 'react';
import { Link, withRouter } from 'react-router';

const PaginationLast = props => (
	<Link
		to={{
			pathname: '/browse',
			query: {
				...props.location.query,
				page: props.page,
			},
		}}
	>
		<span>
			Last
		</span>
		<i className="mdi mdi-chevron-right" />
	</Link>
);


export default withRouter(PaginationLast);
