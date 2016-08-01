import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

LoginButtons = React.createClass({

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	},

	mixins: [ReactMeteorData],

   	getMeteorData(){
        return{
            isLogin: Meteor.userId() != null,
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
		if(this.data.isLogin) {
			// render logged in info
			let profile = Meteor.user().profile;
			return(
				<div>
					<FlatButton
						label={"Hi "+ profile.firstName}
						style={styles.flatButton}
						linkButton={true}
						href="#"
						onTouchTap={this.handleClick} />
					<Popover
				        open={this.state.loginOptionOpen}
				        anchorEl={this.state.anchorEl}
				        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          				targetOrigin={{horizontal: 'left', vertical: 'top'}}
				        onRequestClose={this.handleRequestClose}>
				        <Menu>
					        <MenuItem primaryText="Profile" href="/profile" />
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
					linkButton={true}
					href="/sign-in" />
			);
		}
	}
});
LoginButtons.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};
