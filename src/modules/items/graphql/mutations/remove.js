import { gql, graphql } from 'react-apollo';


import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const itemRemove = gql`
	mutation itemRemove($id: String!, $hostname: String!) {
	itemRemove(_id: $id, hostname: $hostname) {
		result
	}
}
`;

const itemRemoveMutation = graphql(itemRemove, {
	props: params => ({
		itemRemove: id => params.itemRemoveMutation({
			variables: {
				id,
				hostname: getCurrentProjectHostname(),
			},
		}),
	}),
	name: 'itemRemoveMutation',
	options: {
		refetchQueries: ['itemQuery', 'itemListQuery'],
	},
});

export default itemRemoveMutation;
