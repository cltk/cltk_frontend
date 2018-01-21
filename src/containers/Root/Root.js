import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { Router } from 'react-router';
import { CookiesProvider } from 'react-cookie';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import routes from '../../routes';
import client from '../../middleware/apolloClient';

// auth
import AuthModalContainer from '../../modules/auth/containers/AuthModalContainer';
import { login, register, logoutUser, verifyToken } from '../../lib/auth';


const scrollToElemOrTop = () => {
	if (window.location.hash.length) {
		const elemHash = window.location.hash.replace('#', '');

		if (elemHash) {
			const elem = document.getElementById(elemHash);

			if (elem) {
				elem.scrollIntoView();
			}
		}
	} else {
		window.scrollTo(0, 0);
	}
};

const Root = ({store, history}) => (
	<ApolloProvider
		client={client}
		store={store}
	>
		<MuiThemeProvider>
			<CookiesProvider>
				<div>
					<Router
						onUpdate={scrollToElemOrTop}
						history={history}
						routes={routes}
					/>
					<AuthModalContainer
						loginMethod={login}
						signupMethod={register}
						logoutMethod={logoutUser}
						getUserFromServer={verifyToken}
					/>
				</div>
			</CookiesProvider>
		</MuiThemeProvider>
	</ApolloProvider>
);

Root.propTypes = {
	store: PropTypes.shape({}).isRequired,
	history: PropTypes.shape({}).isRequired,
};

export default Root;
