import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const UserListItem = ({ _id, name, username, avatarUrl, isActiveUser }) => (
	<div className="userListItem">
		<Link
			to={isActiveUser ?
				"/profile"
			:
				`/users/${_id}`
			}
		>
			<div
				className="userListItemAvatarImage"
				style={{
					backgroundImage: `url('${avatarUrl}')`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			/>
			<div className="userListItemUserName">
				{name ?
					name
				:
					username
				}
			</div>
		</Link>
	</div>
);

UserListItem.propTypes = {
	username: PropTypes.string,
	avatarUrl: PropTypes.string,
};

UserListItem.defaultProps = {
	username: '',
	avatarUrl: '/images/default_user.jpg',
};

export default UserListItem;
