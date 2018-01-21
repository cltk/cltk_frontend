import { gql, graphql } from 'react-apollo';

const userUpdate = gql`
	mutation userUpdate($user: UserInputType!) {
	userUpdate(user: $user) {
		_id
	}
}
`;

const userUpdateMutation = graphql(userUpdate, {
	props: params => ({
		userUpdate: user => params.userUpdateMutation({
			variables: {
				user,
			},
		}),
	}),
	name: 'userUpdateMutation',
	options: {
		refetchQueries: [],
	},
});


export default userUpdateMutation;
