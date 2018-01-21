import React from 'react';
import { compose } from 'react-apollo';


import userAvatarQuery from '../../graphql/queries/avatar';
import SidebarUserAvatar from '../../components/SidebarUserAvatar';


const SidebarUserAvatarContainer = (props) => {
	let user;
	let userName = '';
	let avatarUrl = '/images/default_user.jpg';

	if (props.userAvatarQuery && props.userAvatarQuery.userProfile) {
		user = props.userAvatarQuery.userProfile;
		if ('avatar' in user && user.avatar) {
			avatarUrl = user.avatar;
		}
		if ('name' in user) {
			userName = user.name;
		}
	}

	return (
		<SidebarUserAvatar
			avatarUrl={avatarUrl}
			name={userName}
		/>
	);
};

export default compose(
	userAvatarQuery,
)(SidebarUserAvatarContainer);
