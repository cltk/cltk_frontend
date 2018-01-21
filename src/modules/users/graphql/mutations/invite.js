import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const userUpdate = gql`
	mutation userInvite(
		$userEmail: String!,
		$role: String!,
		$recaptchaVerification: String!,
		$hostname: String!
	) {
	userInvite(
		userEmail: $userEmail,
		role: $role,
		recaptchaVerification: $recaptchaVerification,
		hostname: $hostname,
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
				hostname: getCurrentProjectHostname(),
			},
		}),
	}),
	name: 'userInviteMutation',
	options: {
		refetchQueries: ['projectQuery', 'projectsQuery'],
	},
});


export default userUpdateMutation;
