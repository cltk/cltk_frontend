import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
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

const browserHistory = createBrowserHistory();


export const renderRoutes = () => (
  <ApolloProvider client={client}>
	  <Router history={browserHistory}>
			<div>
	      <Route exact path="/" component={HomeLayout}/>
	      <Route path="works/:id/:work" component={ReadingLayout}/>
	      <Route path="browse" component={BrowsePage}/>
	      <Route path="about" component={AboutPage}/>
	      <Route path="terms" component={TermsPage}/>
	      <Route path="profile" component={UserLayout}/>
	      <Route path="*" component={NotFound}/>
	    </div>
	  </Router>
  </ApolloProvider>
);


/*
* Perform functions necessary on route load
*
function onRouteLoad() {
	let headroom;

	// If Meteor is on the client and a window exists
	if (Meteor.isClient && typeof window !== 'undefined') {
		// Initialize headroom
		setTimeout(() => {
			const elem = document.querySelector('header');
			if (elem) {
				headroom = new Headroom(elem);
				headroom.init();
			}
		}, 300);

		// Append .background-image-holder <img>'s as CSS backgrounds
		setTimeout(() => {
			$('.background-image-holder').each(function appendImg() {
				const imgSrc = $(this).children('img').attr('src');
				$(this).css('background', `url("${imgSrc}")`);
				$(this).children('img').hide();
				$(this).css('background-position', 'initial');
				$(this).addClass('fadeIn');
			});

			// Fade in background images
			setTimeout(() => {
				$('.background-image-holder').each(function fadeImg() {
					$(this).removeClass('blur');
				});
			}, 500);
		}, 500);
	}
}

// Add onRouteLoad to FlowRouter.triggers.enter callbacks
FlowRouter.triggers.enter([onRouteLoad]);
*/
