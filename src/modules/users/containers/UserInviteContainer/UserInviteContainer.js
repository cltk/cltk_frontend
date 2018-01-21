import React from 'react';
import { compose } from 'react-apollo';
import autoBind from 'react-autobind';
import { withRouter } from 'react-router';

import projectListQuery from '../../../projects/graphql/queries/list';
import projectDetailQuery from '../../../projects/graphql/queries/detail';
import userInviteMutation from '../../graphql/mutations/invite';
import UserInvite from '../../components/UserInvite';


class UserInviteContainer extends React.Component {
	constructor(props) {
		super(props);
		autoBind(this);
	}

	async handleSubmit(_values) {
		const values = Object.assign({}, _values);
		const { userInvite, router } = this.props;

		// TODO: integrate recaptchaVerification
		values.recaptchaVerification = '###';

		// TODO: let users select role of invitee
		values.role = 'admin';

		userInvite(values)
			.then((response) => {
				router.replace('/dashboard/people');
			})
			.catch((err) => {
				console.error(err);
			});
	}

	render() {
		return (
			<UserInvite
				onSubmit={this.handleSubmit}
			/>
		);
	}
}

export default compose(
	userInviteMutation, projectDetailQuery, projectListQuery,
	withRouter,
)(UserInviteContainer);
