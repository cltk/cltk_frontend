import React from 'react';
import { compose } from 'react-apollo';

import ProfileProjects from '../../components/ProfileProjects';
import profileProjectsQuery from '../../graphql/queries/profileProjects';


class ProfileProjectsContainer extends React.Component {
	render() {
		let projects = [];

		if (
			this.props.userProjectsQuery
			&& this.props.userProjectsQuery.userProjects
		) {
			projects = this.props.userProjectsQuery.userProjects;
		}

		return (
			<ProfileProjects
				projects={projects}
			/>
		);
	}
}

export default compose(
	profileProjectsQuery,
)(ProfileProjectsContainer);
