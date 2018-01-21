import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import DashboardNav from '../../../dashboard/components/DashboardNav';
import { required, maxLength } from '../../../../lib/formHelpers';

import './UserInvite.css';


const maxLength200 = maxLength(200);


const UserInvite = props => (
	<div className="userInvite">
		<DashboardNav />

		<div className="userInviteHead">
			<h1>Invite a new project member</h1>
		</div>

		<form
			className="userInviteForm"
			onSubmit={props.handleSubmit}
		>
			<div className="userInviteFormInputOuter">
				<label>Email of project member to invite</label>
				<Field
					name="userEmail"
					type="email"
					component="input"
					placeholder="User email (e.g. user@example.edu)"
					validate={[required, maxLength200]}
				/>
			</div>

			<button
				type="submit"
				className={`
					profileEditorButton
				`}
			>
				Invite
			</button>
		</form>
	</div>
);


UserInvite.propTypes = {
	handleSubmit: PropTypes.function,
};

export default reduxForm({
	form: 'UserInvite',
})(UserInvite);
