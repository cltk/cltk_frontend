import React from 'react';
import { connect } from 'react-redux';


import SidebarUserAvatarContainer from '../../../modules/users/containers/SidebarUserAvatarContainer';

import './LeftMenuHead.css';


const LeftMenuHead = ({ userId }) => (
	<div className="leftMenuHead">
		{userId ?
			<SidebarUserAvatarContainer />
		: ''}
	</div>
);


const mapStateToProps = (state, props) => ({
	userId: state.auth.userId,
});

export default connect(
	mapStateToProps,
)(LeftMenuHead);
