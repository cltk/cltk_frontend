
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

HeaderReading = React.createClass({

  propTypes: {
    toggleSidePanel: React.PropTypes.func,
    toggleCommentary: React.PropTypes.bool,
    toggleDefinitions: React.PropTypes.bool,
    toggleTranslations: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      toggleDefinitions: false,
      toggleCommentary: false,
      toggleTranslations: false
    };
  },

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  },

  toggleSidePanel(metadata){
    if (typeof this.props.toggleSidePanel === 'function') {
      this.props.toggleSidePanel(metadata);
    }
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
        <header className="header-nav paper-shadow">
      		<div className="navigation-primary">
      			<div className="container close-navbar">

      				<div className="navbar-header">
                <FlatButton
                  className="left-drawer-toggle"
                  style={styles.flatIconButton}
                  icon={<FontIcon className="mdi mdi-menu" />}
                />

                <div className="reading-location">
                  <a className="reading-location-param reading-location-param--author" href="/" aria-label="Menu">
                    Herodotus,
                  </a>

                  <a className="reading-location-param reading-location-param--work" href="/" aria-label="Menu">
                    Histories,
                  </a>

                  <a className="reading-location-param reading-location-param--subwork" href="/" aria-label="Menu">
                    Book I,
                  </a>

                  <a className="reading-location-param reading-location-param--book-line" href="/" aria-label="Menu">
                    1.1
                  </a>

                </div>

      				</div>

      				<div className="navbar-collapse collapse module-group right">

                  <div className="module left">
                    <ul className="menu ">
                      <li>
                        <LoginButtons />
                      </li>
          						<li className={(this.props.toggleDefinitions) ? "checked meta-toggle" : "meta-toggle"} >

                          <FlatButton
                            style={styles.flatButton}
                            label="Definitions"
                            onClick={this.toggleSidePanel.bind(this,"definitions")}
                            />
                      </li>

          						<li className={(this.props.toggleCommentary) ? "checked meta-toggle" : "meta-toggle"} >
                          <FlatButton
                            style={styles.flatButton}
                            label="Commentary"
                            onClick={this.toggleSidePanel.bind(this,"commentary")}
                            />
                      </li>

          						<li className={(this.props.toggleTranslations) ? "checked meta-toggle" : "meta-toggle"} >
                        <FlatButton
                          style={styles.flatButton}
                          label="Translations"
                          onClick={this.toggleSidePanel.bind(this,"translations")}
                          />
                      </li>

          					</ul>

                  </div>

                <div className="module search-module widget-handle left">
                  <ul className="menu icon-menu">
                    <li>
                      <FlatButton
                        style={styles.flatIconButton}
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

    );
  }
});

HeaderReading.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
