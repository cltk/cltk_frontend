import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const query = gql`
	query textQuery($hostname: String, $id: String) {
		project(hostname: $hostname) {
	    _id
			userIsAdmin
			text(_id: $id) {
				_id
			  projectId
			  ctsNamespace
			  textGroup
			  work
			}
		}
	}
`;

const textQuery = graphql(query, {
	name: 'textQuery',
	options: ({ params }) => ({
		variables: {
			hostname: getCurrentProjectHostname(),
			id: params.id,
		}
	}),
});

export default textQuery;
