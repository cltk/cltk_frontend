import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { mount } from 'react-mounter';
import { ApolloProvider } from 'react-apollo';

import AboutPage from '/imports/ui/components/pages/AboutPage';
import BrowsePage from '/imports/ui/components/browse/BrowsePage';
import TermsPage from '/imports/ui/components/pages/TermsPage';
import HomeLayout from '/imports/ui/layouts/HomeLayout';
import ReadingLayout from '/imports/ui/layouts/ReadingLayout';
import NotFound from '/imports/ui/layouts/NotFound';
import UserLayout from '/imports/ui/layouts/UserLayout';
import Utils from '/imports/lib/utils';
import client from './apolloClient';

/*
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';


const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
*/

const Routes = () => (
	<ApolloProvider client={client}>
		<Router>
			<Switch>
				<Route exact path="/" component={HomeLayout} />
				<Route path="/works/:id/:slug/:loc?" component={ReadingLayout} />
				<Route path="/browse" component={BrowsePage} />
				<Route path="/about" component={AboutPage} />
				<Route path="/terms" component={TermsPage} />
				<Route path="/profile" component={UserLayout} />
				<Route component={NotFound} />
			</Switch>
		</Router>
	</ApolloProvider>
);

export default Routes;
