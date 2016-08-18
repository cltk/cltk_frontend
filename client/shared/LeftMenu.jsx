import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

LeftMenu = React.createClass({


    propTypes: {
        open: React.PropTypes.bool.isRequired,
        closeLeftMenu: React.PropTypes.func.isRequired,
    },

    getChildContext() {
        return {muiTheme: getMuiTheme(baseTheme)};
    },

    childContextTypes: {
        muiTheme: React.PropTypes.object.isRequired,
    },


	  mixins: [ReactMeteorData],

	  getMeteorData(){
	    var query = {};

			return {
				currentUser: Meteor.users.findOne({_id: Meteor.userId()})
			}

		},

    scrollToAbout(e){
        $("html, body").animate({scrollTop: $('#get-started').height() - 100}, 300);

        this.props.closeLeftMenu();
        e.preventDefault();
    },

    render(){
        var userIsLoggedIn = this.data.currentUser ? true : false;
				var username = "";

				if(userIsLoggedIn){
						if(this.data.currentUser.emails.length){
							username = this.data.currentUser.emails[0].address;
						}

				}


        return (
            <div>
                <Drawer
                    open={this.props.open}
                    docked={false}
                    onRequestChange={open => this.setState({open})}
                    className="md-sidenav-left"
                >
                    <div className="sidenav-top">
                      {userIsLoggedIn ?
                          <div>
                            <div className="user-image paper-shadow">
                              <img src="/images/default_user.jpg"/>
                            </div>
                          </div>
                          : ""
                      }
                      <span className="user-fullname">
												{username}
                      </span>


                    </div>
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
                      />
                    <MenuItem
                          href="//github.com/cltk"
                          primaryText="GitHub"
                          onClick={this.props.closeLeftMenu}
													target="_blank"
                      />

                    <Divider />

                    {userIsLoggedIn ?
                      <div>
                        <MenuItem
                            href="/profile"
                            primaryText="Profile"
                            target="_blank"
                            onClick={this.props.closeLeftMenu}
                        />
                        <MenuItem
                            href="/sign-out"
                            primaryText="Sign out"
                            target="_blank"
                            onClick={this.props.closeLeftMenu}
                        />
                    </div>
                    :
                    <MenuItem
                          href="/sign-in"
                          primaryText="Sign in"
                          target="_blank"
                          onClick={this.props.closeLeftMenu}
                      />
                    }
                </Drawer>
            </div>
        );
    }
});
