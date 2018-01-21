import React from 'react';
import { Field, reduxForm } from 'redux-form';

import ProfileNav from '../ProfileNav';
import { required, maxLength } from '../../../../lib/formHelpers';

import './Profile.css';


const maxLength200 = maxLength(200);
const maxLength2100 = maxLength(2100);

class Profile extends React.Component {

	render() {
		return (
			<div className="profile">
				<ProfileNav />

				<form
					className="profileForm"
					onSubmit={this.props.handleSubmit}
				>
					<div className="profileEditorFormInputOuter">
						<label>Username</label>
						<Field
							name="username"
							type="text"
							component="input"
							placeholder="Username"
							validate={[required, maxLength200]}
						/>
					</div>

					<div className="profileEditorFormInputOuter">
						<label>Name</label>
						<Field
							name="name"
							type="text"
							component="input"
							placeholder="Name"
							validate={[required, maxLength200]}
						/>
					</div>

					<div className="profileEditorFormInputOuter">
						<label>Email</label>
						<Field
							name="email"
							type="text"
							component="input"
							placeholder="Email"
							validate={[required, maxLength200]}
						/>
					</div>

					<div className="profileEditorFormInputOuter">
						<label>Biography</label>
						<Field
							name="bio"
							type="text"
							component="textarea"
							placeholder="Your Biography . . . "
							validate={[maxLength2100]}
						/>
					</div>

					<button
						type="submit"
						className={`
							profileEditorButton
						`}
					>
						Save
					</button>
				</form>
			</div>
		);
	}
}


export default reduxForm({
	form: 'Profile',
})(Profile);
