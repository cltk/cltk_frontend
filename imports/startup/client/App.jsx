import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux'
import { mount } from 'react-mounter';

import AboutPage from '/imports/ui/components/pages/AboutPage';
import BrowsePage from '/imports/ui/components/browse/BrowsePage';
import HomeLayout from '/imports/ui/layouts/HomeLayout';
import AuthModal from '/imports/ui/components/auth/AuthModal';
import NotFound from '/imports/ui/layouts/NotFound';
import PrivateRoute from '/imports/ui/components/auth/PrivateRoute';
import ReadingLayout from '/imports/ui/layouts/ReadingLayout';
import TermsPage from '/imports/ui/components/pages/TermsPage';
import UserLayout from '/imports/ui/layouts/UserLayout';

import Utils from '/imports/lib/utils';
import client from '/imports/middleware/apolloClient';
import configureStore from '/imports/store/configureStore';

const store = configureStore();

// initialState is a placeholder for now, but it could eventually
// be hydrated on application start
const initialState = {}


const App = () => (
	<ApolloProvider client={client} store={store}>
		<Router>
			<Switch>
				<Route exact path="/" component={HomeLayout} />
				<Route path="/works/:id/:slug/:loc?" component={ReadingLayout} />
				<Route path="/browse" component={BrowsePage} />
				<Route path="/about" component={AboutPage} />
				<Route path="/terms" component={TermsPage} />
				<PrivateRoute path="/profile" component={UserLayout} />
				<Route path="/sign-in" render={props => (<AuthModal {...props} authAction="login" history={props.history} lowered />)} />
				<Route path="/sign-up" render={props => (<AuthModal {...props} authAction="signup" history={props.history} lowered />)} />
				<Route component={NotFound} />
			</Switch>
		</Router>
	</ApolloProvider>
);

export default App;
