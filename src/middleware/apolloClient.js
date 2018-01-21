import { ApolloClient, createNetworkInterface } from 'react-apollo';
// import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

const networkInterface = createNetworkInterface({
	uri: `${process.env.REACT_APP_GRAPHQL_SERVER}/${process.env.REACT_APP_GRAPHQL_URI}`,
	opts: {
		credentials: 'include',
	}
});

networkInterface.use([{
	applyMiddleware(req, next) {
		if (!req.options.headers) {
			req.options.headers = {}; // Create the header object if needed.
		}
		req.options.headers.authorization = cookies.get('token') ? cookies.get('token') : null;
		next();
	}
}]);

// const connectionParams = () => ({ authToken: cookies.get('token') ? cookies.get('token') : null });

// const wsClient = new SubscriptionClient(`${process.env.REACT_APP_WS_SERVER}/${process.env.REACT_APP_WS_SERVER_URI}`, {
// 	reconnect: true,
// 	connectionParams,
// });

// const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
// 	networkInterface,
// 	wsClient
// );

const client = new ApolloClient({
	networkInterface
});

export default client;
// export { wsClient };
