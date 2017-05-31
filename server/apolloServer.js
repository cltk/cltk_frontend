import { makeExecutableSchema } from 'graphql-tools';
import express from 'express';
import bodyParser from 'body-parser';
import proxyMiddleware from 'http-proxy-middleware';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

import typeDefs from '/imports/api/schema';
import resolvers from '/imports/api/resolvers';

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const GRAPHQL_PORT = 4000;

const graphQLServer = express();

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT);

WebApp.rawConnectHandlers.use(proxyMiddleware(`http://localhost:${GRAPHQL_PORT}/graphql`));
