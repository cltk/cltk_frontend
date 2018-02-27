import { gql, graphql } from 'react-apollo';

const userUpdate = gql`
	mutation userInvite(
		$userEmail: String!,
		$role: String!,
		$recaptchaVerification: String!,
	) {
	userInvite(
		userEmail: $userEmail,
		role: $role,
		recaptchaVerification: $recaptchaVerification,
	)
}
`;

const userUpdateMutation = graphql(userUpdate, {
	props: params => ({
		userInvite: ({ userEmail, role, recaptchaVerification }) => params.userInviteMutation({
			variables: {
				userEmail,
				role,
				recaptchaVerification,
			},
		}),
	}),
	name: 'userInviteMutation',
	options: {
		refetchQueries: ['projectQuery', 'projectsQuery'],
	},
});


export default userUpdateMutation;
