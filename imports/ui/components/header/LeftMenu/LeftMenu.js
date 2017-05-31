import React from 'react';

import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { createContainer } from 'meteor/react-meteor-data';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';

class LeftMenu extends React.Component {
	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	}

	scrollToAbout(e) {
		$('html, body').animate({ scrollTop: $('#get-started').height() - 100 }, 300);

		this.props.closeLeftMenu();
		e.preventDefault();
	}

	render() {
		const userIsLoggedIn = this.props.currentUser !== undefined;
		let username = '';
		let userIsAdmin = false;

		if (userIsLoggedIn) {
			if ('emails' in this.props.currentUser && this.props.currentUser.emails.length) {
				username = this.props.currentUser.emails[0].address;
			}
			if ('facebook' in this.props.currentUser) {
				username = this.props.currentUser.services.facebook.first_name;
			}
			userIsAdmin = Roles.userIsInRole(this.props.currentUser._id, ['admin']);
		}


		return (
			<div>
				<Drawer
					open={this.props.open}
					docked={false}
					onRequestChange={this.props.closeLeftMenu}
					className="md-sidenav-left"
				>
					<div className="sidenav-top">
						{userIsLoggedIn ?
							<div>
								<div className="user-image paper-shadow">
									<img alt="user" src="/images/default_user.jpg" />
								</div>
							</div>
							:
							''
						}
						<span className="user-fullname">
							{username}
						</span>

					</div>

					{userIsAdmin ?
						<div>
							<MenuItem
								href="/admin"
								primaryText="Admin"
								onClick={this.props.closeLeftMenu}
							/>
							<Divider />
						</div>
						:
						''
					}

					<MenuItem
						href="/"
						primaryText="Home"
						onClick={this.props.closeLeftMenu}
					/>
					<MenuItem
						href="/browse"
						primaryText="Browse"
						onClick={this.props.closeLeftMenu}
					/>
					<MenuItem
						href="/about"
						primaryText="About"
						onClick={this.props.closeLeftMenu}
					/>
					<MenuItem
						href="//cltk.org"
						primaryText="CLTK.org"
						onClick={this.props.closeLeftMenu}
						target="_blank"
						rel="noopener noreferrer"
					/>
					<MenuItem
						href="//github.com/cltk"
						primaryText="GitHub"
						onClick={this.props.closeLeftMenu}
						target="_blank"
						rel="noopener noreferrer"
					/>

					<Divider />

					{userIsLoggedIn ?
						<div>
							<MenuItem
								href="/profile"
								primaryText="Profile"
								rel="noopener noreferrer"
								onClick={this.props.closeLeftMenu}
							/>
							<MenuItem
								href="/sign-out"
								primaryText="Sign out"
								rel="noopener noreferrer"
								onClick={this.props.closeLeftMenu}
							/>
						</div>
						:
						<MenuItem
							href="/sign-in"
							primaryText="Sign in"
							rel="noopener noreferrer"
							onClick={this.props.closeLeftMenu}
						/>
					}
				</Drawer>
			</div>
		);
	}
};

LeftMenu.childContextTypes = {
	muiTheme: PropTypes.object.isRequired,
};

LeftMenu.propTypes = {
	open: PropTypes.bool.isRequired,
	closeLeftMenu: PropTypes.func.isRequired,
};

export default LeftMenuContainer = createContainer(props => {
	return {
		currentUser: Meteor.users.findOne({ _id: Meteor.userId() }),
	};
}, LeftMenu);
