import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import Authors from '/imports/collections/authors';
import Corpora from '/imports/collections/corpora';
import Definitions from '/imports/collections/definitions';
import Languages from '/imports/collections/languages';
import TextNodes from '/imports/collections/textNodes';
import Wordforms from '/imports/collections/wordforms';
import Works from '/imports/collections/works';

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
export default resolvers = {
	Query: {
		authors(_, args){
			if ('_id' in args) {
				args['_id'] = new Meteor.Collection.ObjectID(args._id);
			}

			return Authors.find(args).fetch();
		},
		corpora(_, args){
			if ('_id' in args) {
				args['_id'] = new Meteor.Collection.ObjectID(args._id);
			}

			return Corpora.find(args).fetch();
		},
		definitions(_, args){
			return Definitions.find(args).fetch();
		},
		languages(_, args){
			if ('_id' in args) {
				args['_id'] = new Meteor.Collection.ObjectID(args._id);
			}

			return Languages.find(args).fetch();
		},
		textNodes(_, args){
			let limit = 1000;

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

			if ('text' in args) {
				args.text = { $regex: args.text, $options: 'i'};
			}

			return TextNodes.find(args, {limit, sort: { n_1: 1, n_2: 1, n_3: 1, n_4: 1, n_5: 1 } }).fetch();
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

			console.log('#########');
			console.log(args);
			console.log('#########');

			return Works.find(args).fetch();
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
