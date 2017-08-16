import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { Router } from 'react-router';
import Routes from '../components/routes';
import client from '../middleware/apolloClient';

const Root = ({store, history}) => {
  return (
    <ApolloProvider
      client={client}
      store={store}
    >
      <div>
        <Router history={history} routes={Routes}/>
      </div>
    </ApolloProvider>
  );
};

Root.propTypes = {
  store: PropTypes.shape({/* TODO: update */}).isRequired,
  history: PropTypes.shape({/* TODO: update */}).isRequired,
};

export default Root;
