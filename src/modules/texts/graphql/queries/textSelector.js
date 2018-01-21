import { gql, graphql } from 'react-apollo';


const query = gql`
	query textSelectorQuery($collectionId: Int, $textGroupUrn: String) {
		collections {
	    id
	    urn
	    title
	  }

		collection(id: $collectionId) {
			id
			urn
			title
			textGroups {
				id
				urn
				title
			}

			textGroup(urn: $textGroupUrn) {
				works {
					id
					urn
					english_title
				}
			}
		}
	}
`;

const textSelectorQuery = graphql(query, {
	name: 'textSelectorQuery',
	options: (props) => ({
		variables: {
			collectionId: props.collectionId,
			textGroupUrn: props.textGroupUrn,
		}
	}),
});

export default textSelectorQuery;
