import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const query = gql`
	query pageQuery($hostname: String, $slug: String) {
		project(hostname: $hostname) {
	    _id
			page(slug: $slug) {
				_id
				title
				slug
				content
			}
		}
	}
`;

const pageQuery = graphql(query, {
	name: 'pageQuery',
	options: ({ params }) => ({
		variables: {
			hostname: getCurrentProjectHostname(),
			slug: params.slug,
		}
	}),
});

export default pageQuery;
