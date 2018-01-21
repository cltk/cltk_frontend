import React from 'react';
import { compose } from 'react-apollo';
import userAvatarQuery from '../../graphql/queries/avatar';


import Avatar from '../../components/Avatar';


const UserAvatarContainer = (props) => {
	let user;
	let avatarUrl = '/images/default_user.jpg';

	if (props.userAvatarQuery && props.userAvatarQuery.userProfile) {
		user = props.userAvatarQuery.userProfile;
		if ('avatar' in user && user.avatar) {
			avatarUrl = user.avatar;
		}
	}

	return (
		<Avatar
			avatarUrl={avatarUrl}
		/>
	);
};

export default compose(
	userAvatarQuery,
)(UserAvatarContainer);
