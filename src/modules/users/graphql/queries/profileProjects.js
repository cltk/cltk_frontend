import { gql, graphql } from 'react-apollo';

const query = gql`
	query userProjectsQuery {
		userProjects {
			_id
			title
			hostname
		}
	}
`;

const userProjectsQuery = graphql(query, {
	name: 'userProjectsQuery',
});

export default userProjectsQuery;
