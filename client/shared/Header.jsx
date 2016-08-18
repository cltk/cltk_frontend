
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

Header = React.createClass({

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  },

  getInitialState(){
    return {
      leftMenuOpen : false,
		}
	},

  toggleLeftMenu(){
    this.setState({
      leftMenuOpen : !this.state.leftMenuOpen
    });
  },

  closeLeftMenu(){
    this.setState({
      leftMenuOpen : false
    });
  },

  render(){

    let styles = {
      flatButton : {
        width: "auto",
        minWidth: "none",
        height: "55px",
        padding: "10px 5px"
      },
      flatIconButton : {
        padding: "10px 20px",
        width: "auto",
        minWidth: "none",
        height: "55px",

      }

    };

    return (
    <div>
      <LeftMenu
        open={this.state.leftMenuOpen}
        closeLeftMenu={this.closeLeftMenu}
        />
      <header className="header-nav paper-shadow">
    		<div className="navigation-primary">
    			<div className="container close-navbar">

    				<div className="navbar-header">
              <FlatButton
                className="left-drawer-toggle"
                style={styles.flatIconButton}
                icon={<FontIcon className="mdi mdi-menu" />}
              />

              <FlatButton
                className="logo"
                linkButton={true}
                style={styles.flatButton}
                href="/"
                label="CLTK Archive [Development Prototype]"
                />

    				</div>

    				<div className="navbar-collapse collapse module-group right">

                <div className="module left">

        					<ul className="nav navbar-nav navbar-right">
        						<li>
                      <LoginButtons />
                    </li>
                    <li>
                      <FlatButton
                        style={styles.flatButton}
                        linkButton={true}
                        label="READ"
                        href="/browse"
                        />
                    </li>

        						<li>
                      <FlatButton
                        style={styles.flatButton}
                        linkButton={true}
                        label="ABOUT"
                        href="/about"
                        />
                    </li>
        						<li>
                      <FlatButton
                        style={styles.flatButton}
                        linkButton={true}
                        label="UPDATES"
                        href="//cltk.org/blog"
                        target="_blank"

                        />
                    </li>

        					</ul>

                </div>

                <div className="module social-module widget-handle left">
                  <ul className="menu icon-menu">
                    <li>
                      <FlatButton
                        style={styles.flatIconButton}
                        linkButton={true}
                        href="//github.com/cltk"
                        icon={<FontIcon className="mdi mdi-github-circle" />}
                        target="_blank"
                      />
                    </li>
                  </ul>
                </div>

                <div className="module search-module widget-handle left">
                  <ul className="menu icon-menu">
                    <li>
                      <FlatButton
                        style={styles.flatIconButton}
                        linkButton={true}
                        href="/search"
                        icon={<FontIcon className="mdi mdi-magnify" />}
                      />
                    </li>
                  </ul>
                </div>


              </div>{/*<!-- .module-group.right -->*/}
      			</div>{/*<!-- .container.close-navbar -->*/}
      		</div>{/*<!-- .navigation-primary-->*/}
      	</header>
      </div>
    )
  }
});

Header.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
