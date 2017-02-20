// import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from '/imports/api/schema';
import resolvers from '/imports/api/resolvers';

import express from 'express';
import bodyParser from 'body-parser';
// import { Meteor } from 'meteor/meteor';
import { apolloExpress } from 'apollo-server';
import proxyMiddleware from 'http-proxy-middleware';
import { graphiqlExpress } from 'graphql-server-express';

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const GRAPHQL_PORT = 4000;

const graphQLServer = express();

graphQLServer.use('/graphql', bodyParser.json(), apolloExpress({ schema }));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT);

WebApp.rawConnectHandlers.use(proxyMiddleware(`http://localhost:${GRAPHQL_PORT}/graphql`));
