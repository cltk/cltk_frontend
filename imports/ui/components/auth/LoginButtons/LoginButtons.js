import React from 'react';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

class LoginButtons extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loginOptionOpen: false,
			anchorEl: null,
		}
	}

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	}

	handleClick(event) {
		// This prevents ghost click.
		event.preventDefault();
		this.setState({
			loginOptionOpen: true,
			anchorEl: event.currentTarget,
		});
	}

	handleRequestClose() {
		this.setState({
			loginOptionOpen: false,
		});
	}

	render() {
		const styles = {
			flatButton: {
				width: 'auto',
				minWidth: 'none',
				height: '55px',
				padding: '10px 5px',
			},
		};


		if (this.props.user) {
			// render logged in info

			// make a user display name from available user profile info
			let userNiceName = '';

			if ('profile' in this.props.user) {
				const profile = this.props.user.profile;
				userNiceName = profile.firstName;
			} else if ('emails' in this.props.user && this.props.user.emails.length > 0) {
				userNiceName = this.props.user.emails[0].address;
			} else {
				userNiceName = 'User';
			}


			return (
				<div>
					<FlatButton
						label={userNiceName}
						style={styles.flatButton}
						href="#"
						onTouchTap={this.handleClick}
					/>
					<Popover
						open={this.state.loginOptionOpen}
						anchorEl={this.state.anchorEl}
						anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
						targetOrigin={{ horizontal: 'left', vertical: 'top' }}
						onRequestClose={this.handleRequestClose}
						className="cltk-popover"
					>
						<Menu
							className="cltk-popover-menu login-buttons-popover-menu"
						>
							<MenuItem primaryText="Profile" href="/profile" />
							<MenuItem primaryText="Account" href="/account" />
							<Divider />
							<MenuItem primaryText="Sign out" href="/sign-out" />
						</Menu>
					</Popover>
				</div>
			);
		}
		// render sign in button
		return (
			<div>
        <Link to="sign-in">
          <FlatButton
            label="Login"
            style={styles.flatButton}
            className="account-button account-button-login"
          />
        </Link>
        <Link to="sign-up">
          <FlatButton
            label="Sign Up"
            style={styles.flatButton}
            className="account-button account-button-signup"
          />
        </Link>
			</div>
		);
	}
};

LoginButtons.childContextTypes = {
	muiTheme: PropTypes.object.isRequired,
};

const LoginButtonsContainer = createContainer(props => {
	return {
		user: Meteor.user(),
	};
}, LoginButtons);

export default LoginButtonsContainer;
