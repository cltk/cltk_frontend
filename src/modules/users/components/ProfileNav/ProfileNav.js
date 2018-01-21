import React from 'react';
import { Link, withRouter } from 'react-router';

import './ProfileNav.css';


const ProfileNav = (props) => {
	const activePath = props.location.pathname;

	return (
		<div className="profileNav">
			<Link
				to="/profile"
				className={
					activePath === '/profile' ?
					'profileNavLinkActive'
					: ''
				}
			>
				<i className="mdi mdi-account" />
				Profile
			</Link>
			<Link
				to="/profile/projects"
				className={
					activePath === '/profile/projects' ?
					'profileNavLinkActive'
					: ''
				}
			>
				<i className="mdi mdi-view-dashboard" />
				Your Projects
			</Link>
			<Link
				to="/create"
				className={
					activePath === '/create' ?
					'profileNavLinkActive'
					: ''
				}
			>
				<i className="mdi mdi-plus" />
				Create Project
			</Link>
		</div>
	);
};

export default withRouter(ProfileNav);
