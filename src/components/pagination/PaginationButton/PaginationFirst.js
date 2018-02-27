import React from 'react';
import { Link, withRouter } from 'react-router';

const PaginationFirst = props => (
	<Link
		to={{
			pathname: '/browse',
			query: {
				...props.location.query,
				page: props.page,
			},
		}}
	>
		<i className="mdi mdi-chevron-left" />
		<span>
			First
		</span>
	</Link>
);


export default withRouter(PaginationFirst);
