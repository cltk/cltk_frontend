import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const query = gql`
	query textListQuery($hostname: String) {
		project(hostname: $hostname) {
	    _id
			texts {
				_id
			  projectId
			  ctsNamespace
			  textGroup
			  work
			}
		}
	}
`;

const textListQuery = graphql(query, {
	name: 'textListQuery',
	options: ({ params }) => ({
		variables: {
			hostname: getCurrentProjectHostname(),
		}
	}),
});

export default textListQuery;
