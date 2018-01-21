import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const query = gql`
	query manifestQuery($hostname: String, $id: String) {
		project(hostname: $hostname) {
	    _id
			userIsAdmin
			item (_id: $id) {
				_id
				manifest {
					_id
					remoteUri
				}
			}
		}
	}
`;

const manifestQuery = graphql(query, {
	name: 'manifestQuery',
	options: ({ params }) => ({
		variables: {
			hostname: getCurrentProjectHostname(),
			id: params.id,
		}
	}),
});

export default manifestQuery;
