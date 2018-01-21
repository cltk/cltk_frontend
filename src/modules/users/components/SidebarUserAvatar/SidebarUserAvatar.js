import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';


import './SidebarUserAvatar.css';


const SidebarUserAvatar = props => (
	<div className="sidebarUserAvatar">
		<Link to="/profile">
			<div
				className="sidebarUserAvatarImage"
				style={{
					backgroundImage: `url('${props.avatarUrl}')`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			/>
			<div className="sidebarUserName">
				{props.name}
			</div>
		</Link>
	</div>
);

SidebarUserAvatar.propTypes = {
	name: PropTypes.string,
	avatarUrl: PropTypes.string,
};

SidebarUserAvatar.defaultProps = {
	name: '',
	avatarUrl: '/images/default_user.jpg',
};

export default SidebarUserAvatar;
