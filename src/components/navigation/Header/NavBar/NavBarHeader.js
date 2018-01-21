import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { toggleLeftMenu } from '../../../../actions/leftMenu';

import './NavBarHeader.css';

const NavBarHeader = ({ dispatchToggleLeftMenu, leftMenuOpen }) => (
	<div className="nav-header">
		<i
			className="mdi mdi-menu left-menu-toggle-icon"
			onClick={dispatchToggleLeftMenu.bind(this, !leftMenuOpen)}
		/>
		<Link to="/">
			<h2 className="site-title">
				cltk.org [alpha]
			</h2>
		</Link>
	</div>
);

const mapStateToProps = state => ({
	userId: state.auth.userId,
	leftMenuOpen: state.leftMenu.open,
});

const mapDispatchToProps = dispatch => ({
	dispatchToggleLeftMenu: (open) => {
		dispatch(toggleLeftMenu(open));
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NavBarHeader);
