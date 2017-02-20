import SchemaBridge from 'meteor/kuip:schema-graphql-bridge';
import Authors from '/imports/collections/authors';
import Corpora from '/imports/collections/corpora';
import Definitions from '/imports/collections/definitions';
import Languages from '/imports/collections/languages';
import TextNodes from '/imports/collections/textNodes';
import Wordforms from '/imports/collections/wordforms';
import Works from '/imports/collections/works';

const authorSchema = SchemaBridge.schema(Authors.schema, 'Author', {wrap: false});
const corporaSchema = SchemaBridge.schema(Corpora.schema, 'Corpus', {wrap: false});
const definitionSchema = SchemaBridge.schema(Definitions.schema, 'Definition');
const languageSchema = SchemaBridge.schema(Languages.schema, 'Language', {wrap: false});
const textNodeSchema = SchemaBridge.schema(TextNodes.schema, 'TextNode', {wrap: false});
const wordformSchema = SchemaBridge.schema(Wordforms.schema, 'Wordform');
const workSchema = SchemaBridge.schema(Works.schema, 'Work', {wrap: false});

export default typeDefs = [`

scalar JSON
scalar Date

${definitionSchema}
${wordformSchema}

${authorSchema.objects}
type Author {
	_id: JSON
	${authorSchema.fields}
}

${corporaSchema.objects}
type Corpus {
	_id: JSON
	${corporaSchema.fields}
}

${languageSchema.objects}
type Language {
	_id: JSON
	${languageSchema.fields}
}

${workSchema.objects}
type Work {
	_id: JSON
	${workSchema.fields}
}

${textNodeSchema.objects}
type TextNode {
	${textNodeSchema.fields}
	textNodeWork: Work
}

type Query {
  authors(_id: String, english_name: String, original_name: String, slug: String): [Author]
  corpora(_id: String, title: String, slug: String, corpusLanguages: String): [Corpus]
  definitions(_id: String, headword: String, pos: String, definition: String): [Definition]
  languages(_id: String, title: String, slug: String): [Language]
  textNodes(_id: String, textLanguage: String, corpus: String, author: String, work: String, edition: String, speakerName: String, text: String, entities: String, limit: Int): [TextNode]
  wordForms(_id: String): [Wordform]
  works(_id: String, english_title: String, original_title: String, workLanguage: String, form: String, tags: String, authors: String): [Work]
}

schema {
  query: Query
}
`];
