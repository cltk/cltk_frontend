
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

Header = React.createClass({

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
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
                        href="https://github.com/cltk"
                        icon={<FontIcon className="mdi mdi-github-circle" />}
                        target="_blank"
                      />
                    </li>
                    {/*<!--li>
                      <a className="close-navbar md-button md-ink-ripple" href="http://twitter.com/@cltk" target="_blank">
                        <i className="mdi mdi-twitter"></i>
                        <div className="md-ripple-container"></div>
                      </a>
                    </li>
                    <li>
                      <a className="close-navbar md-button md-ink-ripple" href="http://plus.google.com/+CLTK" target="_blank">
                        <i className="mdi mdi-google-plus"></i>
                        <div className="md-ripple-container"></div>
                      </a>
                    </li-->*/}
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
				<LeftMenu />
      </div>
    )
  }
});

Header.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
