import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const textCreate = gql`
mutation textCreate($hostname: String!, $text: TextInputType!) {
	textCreate(hostname: $hostname, text: $text) {
    _id
	}
}
`;

const textCreateMutation = graphql(textCreate, {
	props: params => ({
		textCreate: (text) => params.textCreateMutation({
			variables: {
				text,
				hostname: getCurrentProjectHostname(),
			},
		}),
	}),
	name: 'textCreateMutation',
	options: {
		refetchQueries: ['textListQuery', 'textQuery'],
	},
});

export default textCreateMutation;
