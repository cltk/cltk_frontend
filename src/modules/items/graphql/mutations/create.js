import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const itemCreate = gql`
mutation itemCreate($hostname: String!, $item: ItemInputType!, $files: [FileInputType]) {
	itemCreate(hostname: $hostname, item: $item, files: $files) {
		_id
		title
		slug
		description
	}
}
`;

const itemCreateMutation = graphql(itemCreate, {
	props: params => ({
		itemCreate: (item, files) => params.itemCreateMutation({
			variables: {
				item,
				files,
				hostname: getCurrentProjectHostname(),
			},
		}),
	}),
	name: 'itemCreateMutation',
	options: {
		refetchQueries: ['itemQuery', 'itemListQuery'],
	},
});

export default itemCreateMutation;
