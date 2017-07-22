import { ApolloClient, createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface({
	uri: Meteor.settings.public.textServerURI,
	opts: {
		credentials: 'include',
	}
});

networkInterface.use([{
	applyMiddleware(req, next) {
		if (!req.options.headers) {
			req.options.headers = {}; // Create the header object if needed.
		}
		req.options.headers['authorization'] = localStorage.getItem('token') ? localStorage.getItem('token') : null;
		next();
	}
}]);

const connectionParams = () => {
	return { authToken: localStorage.getItem('token') ? localStorage.getItem('token') : null };
};

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
	networkInterface,
);

const client = new ApolloClient({
	networkInterface: networkInterfaceWithSubscriptions,
});

export default client;
export { wsClient };
