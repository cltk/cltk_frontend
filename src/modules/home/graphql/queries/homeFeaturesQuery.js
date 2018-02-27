import { gql, graphql } from 'react-apollo';


const query = gql`
	query homeFeaturesQuery {
		collectionsCount
		textGroupsCount
		worksCount
	}
`;


const homeFeaturesQuery = graphql(query, {
	name: 'homeFeaturesQuery',
});

export default homeFeaturesQuery;
