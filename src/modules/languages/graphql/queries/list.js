import { gql, graphql } from 'react-apollo';

const query = gql`
	query languageListQuery {
		languages {
			id
      slug
      title
		}
	}
`;

const languageListQuery = graphql(query, {
	name: 'languageListQuery',
});

export default languageListQuery;
