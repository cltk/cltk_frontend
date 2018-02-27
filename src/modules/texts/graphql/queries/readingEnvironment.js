import { gql, graphql } from 'react-apollo';

const query = gql`
	query readingEnvironmentQuery($workId: Int, $location: [Int]) {
		work(id: $workId) {
			id
			slug
			english_title
			original_title
			textNodes(startsAtLocation: $location) {
				id
				index
				location
				text
			}
			textLocationNext(location: $location)
			textLocationPrev(location: $location)
		}
	}
`;

const readingEnvironmentQuery = graphql(query, {
	name: 'readingEnvironmentQuery',
	options: ({ params }) => {
		let location = null;

		if (params.location) {
			location = [];
			params.location.split('.').forEach(locParam => {
				location.push(parseInt(locParam, 10));
			});
		}

		return {
			variables: {
				workId: parseInt(params.id, 10),
				location,
			}
		};
	},
});

export default readingEnvironmentQuery;
