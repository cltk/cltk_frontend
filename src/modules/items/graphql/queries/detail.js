import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const query = gql`
	query itemQuery($hostname: String, $id: String) {
		project(hostname: $hostname) {
	    _id
			userIsAdmin
			item(_id: $id) {
				_id
				title
				slug
				description
				projectId

				metadata {
					type
					label
					value
				}

				files {
					_id
					name
					title
					type
					path
				}

				commentsCount
				comments {
					_id
					userId
					itemId
					content
					updatedAt
				}

				manifest {
					_id
				}
			}
		}
	}
`;

const itemQuery = graphql(query, {
	name: 'itemQuery',
	options: ({ params }) => ({
		variables: {
			hostname: getCurrentProjectHostname(),
			id: params.id,
		}
	}),
});

export default itemQuery;
