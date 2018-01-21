import { gql, graphql } from 'react-apollo';

const query = gql`
	query userProfileQuery {
		userProfile {
	    _id
			username
			avatar
	    name
	    email
	    bio
			isActiveUser
		}
	}
`;

const userProfileQuery = graphql(query, {
	name: 'userProfileQuery',
});

export default userProfileQuery;
