import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

LeftMenu = React.createClass({


	propTypes: {
		open: React.PropTypes.bool.isRequired,
		closeLeftMenu: React.PropTypes.func.isRequired,
	},

	childContextTypes: {
		muiTheme: React.PropTypes.object.isRequired,
	},


	mixins: [ReactMeteorData],

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	},

	getMeteorData() {
		return {
			currentUser: Meteor.users.findOne({ _id: Meteor.userId() }),
		};
	},

	scrollToAbout(e) {
		$('html, body').animate({ scrollTop: $('#get-started').height() - 100 }, 300);

		this.props.closeLeftMenu();
		e.preventDefault();
	},

	render() {
		const userIsLoggedIn = this.data.currentUser !== undefined;
		let username = '';
		let userIsAdmin = false;

		if (userIsLoggedIn) {
			if (this.data.currentUser.emails.length) {
				username = this.data.currentUser.emails[0].address;
			}
			userIsAdmin = Roles.userIsInRole(this.data.currentUser._id, ['admin']);
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
								target="_blank"
								rel="noopener noreferrer"
								onClick={this.props.closeLeftMenu}
							/>
							<MenuItem
								href="/sign-out"
								primaryText="Sign out"
								target="_blank"
								rel="noopener noreferrer"
								onClick={this.props.closeLeftMenu}
							/>
						</div>
						:
							<MenuItem
								href="/sign-in"
								primaryText="Sign in"
								target="_blank"
								rel="noopener noreferrer"
								onClick={this.props.closeLeftMenu}
       />
					}
				</Drawer>
			</div>
		);
	},
});
