import React from 'react';
import './Avatar.css';

const Avatar = props => (
	<div
		className="userAvatar"
		style={{
			backgroundImage: `url('${props.avatarUrl}')`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			borderRadius: '100%',
			border: '1px solid #f6f6f6',
			minHeight: '30px',
			minWidth: '30px',
		}}
	/>
);


export default Avatar;
