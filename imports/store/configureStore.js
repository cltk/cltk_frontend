import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import client from '../middleware/apolloClient';

const configureStore = preloadedState => {
	const store = createStore(
		rootReducer,
		preloadedState,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
		compose(
			applyMiddleware(thunk, createLogger(), client.middleware()),
			DevTools.instrument()
		)
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers').default; // eslint-disable-line global-require
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
};

export default configureStore;
