import { gql, graphql } from 'react-apollo';


const query = gql`
	query textQuery($id: String) {
		text(_id: $id) {
			_id
		  projectId
		  ctsNamespace
		  textGroup
		  work
		}
	}
`;

const textQuery = graphql(query, {
	name: 'textQuery',
	options: ({ params }) => ({
		variables: {
			id: params.id,
		}
	}),
});

export default textQuery;
