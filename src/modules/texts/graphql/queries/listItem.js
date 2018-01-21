import { gql, graphql } from 'react-apollo';

const query = gql`
	query textListItemQuery($collectionId: Int, $textGroupUrn: String, $workUrn: String) {
		collection(id: $collectionId) {
	    id
			textGroup(urn: $textGroupUrn) {
				id
				work(urn: $workUrn) {
					id
					english_title
				}
			}
		}
	}
`;

const textListItemQuery = graphql(query, {
	name: 'textListItemQuery',
	options: (props) => ({
		variables: {
			collectionId: parseInt(props.ctsNamespace, 10),
			textGroupUrn: props.textGroup,
			workUrn: props.work,
		}
	}),
});

export default textListItemQuery;
