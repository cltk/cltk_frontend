import { gql, graphql } from 'react-apollo';

const query = gql`
	query readingEnvironmentQuery($collectionId: Int, $textGroupUrn: String, $workUrn: String) {
		collection(id: $collectionId) {
	    id
			title
			textGroup(urn: $textGroupUrn) {
				id
				title
				work(urn: $workUrn) {
					id
					english_title
					textNodes {
						id
						urn
						location
						text
					}
				}
			}
		}
	}
`;

const readingEnvironmentQuery = graphql(query, {
	name: 'readingEnvironmentQuery',
	options: (props) => ({
		variables: {
			collectionId: parseInt(props.ctsNamespace, 10),
			textGroupUrn: props.textGroup,
			workUrn: props.work,
		}
	}),
});

export default readingEnvironmentQuery;
