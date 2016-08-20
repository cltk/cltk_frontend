import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

LoginButtons = React.createClass({

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	},

	mixins: [ReactMeteorData],

   	getMeteorData(){
        return{
            user: Meteor.user(),
        }
    },

	getInitialState() {
		return {
			loginOptionOpen: false,
			anchorEl: null,
		}
	},

	handleClick(event) {
		// This prevents ghost click.
	    event.preventDefault();
	    this.setState({
	      loginOptionOpen: true,
	      anchorEl: event.currentTarget,
	    });
	},

	handleRequestClose() {
		this.setState({
			loginOptionOpen: false,
		});
	},

	render() {
		const styles = {
			flatButton : {
		        width: "auto",
		        minWidth: "none",
		        height: "55px",
		        padding: "10px 5px"
			},
		};


		if(this.data.user) {

			// render logged in info

			// make a user dispaly name from available user profile info
			let userNiceName = "";

			if("profile" in this.data.user){
				let profile = this.data.user.profile;
				userNiceName = profile.firstName;

			}else if("emails" in this.data.user && this.data.user.emails.length > 0) {
				userNiceName = this.data.user.emails[0].address;

			}else {
				userNiceName = "User";

			}


			return(
				<div>
					<FlatButton
						label={"Hi "+ userNiceName}
						style={styles.flatButton}
						href="#"
						onTouchTap={this.handleClick} />
					<Popover
		        open={this.state.loginOptionOpen}
		        anchorEl={this.state.anchorEl}
		        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
    				targetOrigin={{horizontal: 'left', vertical: 'top'}}
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
		else {
			// render sign in button
			return(
				<FlatButton
					label="Sign In"
					style={styles.flatButton}
					href="/sign-in" />
			);
		}
	}
});
LoginButtons.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};
