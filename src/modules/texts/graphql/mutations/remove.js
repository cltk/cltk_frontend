import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const textRemove = gql`
	mutation textRemove($id: String!, $hostname: String!) {
	textRemove(_id: $id, hostname: $hostname) {
		result
	}
}
`;

const textRemoveMutation = graphql(textRemove, {
	props: params => ({
		textRemove: id => params.textRemoveMutation({
			variables: {
				id,
				hostname: getCurrentProjectHostname(),
			},
		}),
	}),
	name: 'textRemoveMutation',
	options: {
		refetchQueries: ['textListQuery', 'textQuery'],
	},
});

export default textRemoveMutation;
