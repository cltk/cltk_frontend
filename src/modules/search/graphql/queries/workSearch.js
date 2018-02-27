import { gql, graphql } from 'react-apollo';

const query = gql`
	query workSearchQuery($textsearch: String, $language: String, $offset: Int) {
    workSearch(textsearch: $textsearch, language: $language, offset: $offset) {
      works {
        id
        slug
        urn
        english_title
        original_title

        language {
          id
          slug
          title
        }

        version {
          id
          slug
          title
        }

        translation {
          id
          slug
          title
        }
      }
      total
		}
	}
`;

const workSearchQuery = graphql(query, {
	name: 'workSearchQuery',
	options: ({ textsearch, language, offset }) => ({
		variables: {
			textsearch,
			language,
			offset,
		}
	}),
});

export default workSearchQuery;
