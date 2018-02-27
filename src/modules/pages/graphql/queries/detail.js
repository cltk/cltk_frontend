import { gql, graphql } from 'react-apollo';


const query = gql`
	query pageQuery($slug: String) {
		page(slug: $slug) {
			_id
			title
			slug
			content
		}
	}
`;

const pageQuery = graphql(query, {
	name: 'pageQuery',
	options: ({ params }) => ({
		variables: {
			slug: params.slug,
		}
	}),
});

export default pageQuery;
