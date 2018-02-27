import React from 'react';
import { Link, withRouter } from 'react-router';

const PaginationNext = props => (
	<Link
		to={{
			pathname: '/browse',
			query: {
				...props.location.query,
				page: (props.location.query.page ? parseInt(props.location.query.page, 10) : 1) + 1,
			},
		}}
	>
		<span>
			Next
		</span>
		<i className="mdi mdi-chevron-right" />
	</Link>
);


export default withRouter(PaginationNext);
