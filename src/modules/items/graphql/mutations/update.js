import { gql, graphql } from 'react-apollo';

const itemUpdate = gql`
	mutation itemUpdate($item: ItemInputType!, $files: [FileInputType]) {
	itemUpdate(item: $item, files: $files) {
		_id
	}
}
`;

const itemUpdateMutation = graphql(itemUpdate, {
	props: params => ({
		itemUpdate: (item, files) => params.itemUpdateMutation({
			variables: {
				item,
				files,
			},
		}),
	}),
	name: 'itemUpdateMutation',
	options: {
		refetchQueries: ['itemQuery', 'itemListQuery'],
	},
});


export default itemUpdateMutation;
