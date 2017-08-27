import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import { Meteor } from 'meteor/meteor';


const networkInterface = createNetworkInterface({
	uri: Meteor.settings.public.textServerURI,
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

const client = new ApolloClient({
	networkInterface,
});

export default client;
