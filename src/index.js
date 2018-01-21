import 'es6-shim';

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Root from './containers/Root';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import { loginJWT } from './lib/auth'; // eslint-disable-line
import { wsClient } from './middleware/apolloClient';  // eslint-disable-line

import './fonts.css';
import './index.css';


const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
injectTapEventPlugin();

ReactDOM.render(
	<Root store={store} history={history} />,
	document.getElementById('root')
);

registerServiceWorker();
