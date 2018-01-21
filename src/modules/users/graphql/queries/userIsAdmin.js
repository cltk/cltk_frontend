import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const query = gql`
	query userIsAdminQuery($hostname: String) {
		project(hostname: $hostname) {
			_id
			userIsAdmin
		}
	}
`;

const userIsAdminQuery = graphql(query, {
	name: 'userIsAdminQuery',
	options: ({ params }) => ({
		variables: {
			hostname: getCurrentProjectHostname(),
		}
	}),
});

export default userIsAdminQuery;
