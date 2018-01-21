import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const query = gql`
	query countsQuery($hostname: String) {
		project(hostname: $hostname) {
	    _id
			collectionsCount
			articlesCount
			pagesCount
			itemsCount
			filesCount
			textsCount
		}
	}
`;


const countsQuery = graphql(query, {
	name: 'countsQuery',
	options: ({ params }) => ({
		variables: {
			hostname: getCurrentProjectHostname(),
		}
	}),
});

export default countsQuery;
