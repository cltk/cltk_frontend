import React from 'react';
import { compose } from 'react-apollo';

import TextListPage from '../../components/TextListPage';
import textsQuery from '../../graphql/queries/list';
import userIsAdminQuery from '../../../users/graphql/queries/userIsAdmin';


const TextListPageContainer = (props) => {
	let userIsAdmin = false;
	let files = [];

	if (
		props.userIsAdminQuery
		&& props.userIsAdminQuery.project
	) {
		userIsAdmin = props.userIsAdminQuery.project.userIsAdmin;
	}

	if (
		props.textListQuery
		&& props.textListQuery.project
	) {
		files = props.textListQuery.project.files;
	}

	return (
		<TextListPage
			userIsAdmin={userIsAdmin}
			files={files}
		/>
	);
};

export default compose(
	userIsAdminQuery,
	textsQuery,
)(TextListPageContainer);
