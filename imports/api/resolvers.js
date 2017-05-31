import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import Authors from '/imports/api/collections/authors';
import Corpora from '/imports/api/collections/corpora';
import Definitions from '/imports/api/collections/definitions';
import Languages from '/imports/api/collections/languages';
import TextNodes from '/imports/api/collections/textNodes';
import Wordforms from '/imports/api/collections/wordforms';
import Works from '/imports/api/collections/works';

function parseJSONLiteral(ast) {
	switch (ast.kind) {
		case Kind.STRING:
		case Kind.BOOLEAN:
			return ast.value;
		case Kind.INT:
		case Kind.FLOAT:
			return parseFloat(ast.value);
		case Kind.OBJECT: {
			const value = Object.create(null);
			ast.fields.forEach(field => {
				value[field.name.value] = parseJSONLiteral(field.value);
			});

			return value;
		}
		case Kind.LIST:
			return ast.values.map(parseJSONLiteral);
		default:
			return null;
	}
}

// create the resolve functions for the available GraphQL queries
const resolvers = {
	Query: {
		authors(_, args){
			if ('_id' in args) {
				args['_id'] = new Meteor.Collection.ObjectID(args._id);
			}

			const authors = Authors.find(args).fetch();

			// Fix inconsistencies with _id format
			authors.forEach((author) => {
				if ('_str' in author._id) {
					author._id = author._id._str;
				}
			});

			return authors;
		},
		corpora(_, args){
			if ('_id' in args) {
				args['_id'] = new Meteor.Collection.ObjectID(args._id);
			}

			const corpora = Corpora.find(args).fetch();

			// Fix inconsistencies with _id format
			corpora.forEach((corpus) => {
				if ('_str' in corpus._id) {
					corpus._id = corpus._id._str;
				}
			});

			return corpora;
		},
		definitions(_, args){
			let limit = 100;
			let skip = 0;

			return Definitions.find(args, { limit, skip }).fetch();
		},
		languages(_, args){
			if ('_id' in args) {
				args['_id'] = new Meteor.Collection.ObjectID(args._id);
			}

			const languages = Languages.find(args).fetch();

			// Fix inconsistencies with _id format
			languages.forEach((language) => {
				if ('_str' in language._id) {
					language._id = language._id._str;
				}
			});

			return languages;
		},
		textNodes(_, args){
			let limit = 100;
			let skip = 0;

			if ('_id' in args) {
				args['_id'] = new Meteor.Collection.ObjectID(args._id);
			}
			if ('work' in args) {
				args['work'] = new Meteor.Collection.ObjectID(args.work);
			}
			if ('limit' in args) {
				limit = args.limit;
				delete args.limit;
			}

			if ('skip' in args) {
				skip = args.skip;
				delete args.skip;
			}

			if ('text' in args) {
				args.text = { $regex: args.text, $options: 'i'};
			}

			const textNodes = TextNodes.find(args, {skip, limit, sort: { n_1: 1, n_2: 1, n_3: 1, n_4: 1, n_5: 1 } }).fetch();

			// Fix inconsistencies with _id format
			textNodes.forEach((textNode) => {
				if ('_str' in textNode._id) {
					textNode._id = textNode._id._str;
				}
				if ('_str' in textNode.work) {
					textNode.work = textNode.work._str;
				}
			});

			return textNodes;
		},
		wordForms(_, args){
			return Wordforms.find(args).fetch();
		},
		works(_, args){
			if ('_id' in args) {
				args['_id'] = new Meteor.Collection.ObjectID(args._id);
			}

			if ('english_title' in args) {
				args.english_title = { $regex: args.english_title, $options: 'i'}
			}

			if ('original_title' in args) {
				args.original_title = { $regex: args.original_title, $options: 'i'}
			}

			const works = Works.find(args).fetch();

			// Fix inconsistencies with _id format
			works.forEach((work) => {
				if ('_str' in work._id) {
					work._id = work._id._str;
				}
			});

			return works;
		},
	},

	Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),

	JSON: {
		__parseLiteral: parseJSONLiteral,
		__serialize: value => value,
		__parseValue: value => value,
	},
};

export default resolvers;
