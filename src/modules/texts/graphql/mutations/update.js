import { gql, graphql } from 'react-apollo';

const textUpdate = gql`
	mutation textUpdate($text: TextInputType!) {
	textUpdate(text: $text) {
		_id
	}
}
`;

const textUpdateMutation = graphql(textUpdate, {
	props: params => ({
		textUpdate: (text) => params.textUpdateMutation({
			variables: {
				text,
			},
		}),
	}),
	name: 'textUpdateMutation',
	options: {
		refetchQueries: ['textListQuery', 'textQuery'],
	},
});


export default textUpdateMutation;
