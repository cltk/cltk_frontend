import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';

import { toggleLeftMenu } from '../../../actions/leftMenu';
import MenuItem from '../MenuItem';
import LeftMenuHead from '../LeftMenuHead';

// actions
import { logout, toggleAuthModal } from '../../../modules/auth/actions';
import { logoutUser } from '../../../lib/auth';

// lib
import getCurrentProjectHostname from '../../../lib/getCurrentProjectHostname';

import './LeftMenu.css';


class LeftMenu extends React.Component {

	renderMenuItems() {
		const { closeLeftMenu } = this.props;

		return (
			<div>
				<MenuItem
					to="/collections"
					onClick={closeLeftMenu}
				>
					Collections
				</MenuItem>
				<MenuItem
					to="/items"
					onClick={closeLeftMenu}
				>
					Items
				</MenuItem>
				<MenuItem
					to="/articles"
					onClick={closeLeftMenu}
				>
					Articles
				</MenuItem>
				<MenuItem
					to="/texts"
					onClick={closeLeftMenu}
				>
					Texts
				</MenuItem>
			</div>
		);
	}

	render() {
		const {
			project, leftMenuOpen, closeLeftMenu, userId, dispatchLogout,
			dispatchToggleAuthModal
		} = this.props;

		let isMaincltkProject = false;
		const hostname = getCurrentProjectHostname();

		if (!hostname || ~['cltk.org', 'cltk.local'].indexOf(hostname)) {
			isMaincltkProject = true;
		}

		if (!project) {
			return null;
		}
		return (
			<Drawer
				open={leftMenuOpen}
				docked={false}
				onRequestChange={closeLeftMenu}
				className="leftMenu"
			>
				<LeftMenuHead />
				<div className="leftMenuContent">
					<MenuItem
						to="/"
						onClick={closeLeftMenu}
					>
						Home
					</MenuItem>
					{!isMaincltkProject ?
						this.renderMenuItems()
					: ''}
					<Divider />

					{userId ?
						<div>
							<MenuItem
								to="/profile"
								onClick={closeLeftMenu}
							>
								Profile
							</MenuItem>
							<MenuItem
								to="/profile/projects"
								onClick={closeLeftMenu}
							>
								Projects
							</MenuItem>
							<Divider />

							<MenuItem
								to="/"
								onClick={dispatchLogout}
							>
								Sign out
							</MenuItem>
						</div>
					:
						<MenuItem
							onClick={dispatchToggleAuthModal}
						>
							Sign up / in
						</MenuItem>
					}
				</div>
			</Drawer>

		);
	}
}


LeftMenu.propTypes = {
	project: PropTypes.object,
	leftMenuOpen: PropTypes.bool,
	closeLeftMenu: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
	leftMenuOpen: state.leftMenu.open,
	userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	closeLeftMenu: () => {
		dispatch(toggleLeftMenu(false));
	},
	dispatchLogout: () => {
		dispatch(logout(logoutUser));
		dispatch(toggleLeftMenu(false));
	},
	dispatchToggleAuthModal: () => {
		dispatch(toggleAuthModal());
		dispatch(toggleLeftMenu(false));
	},
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(LeftMenu);
