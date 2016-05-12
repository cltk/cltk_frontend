
import RaisedButton from 'material-ui/RaisedButton';

Header = React.createClass({
  render(){
    return (
    <header className="header-nav paper-shadow">
  		<div className="navigation-primary">
  			<div className="container close-navbar">

  				<div className="navbar-header">
            <a className="toggle-left-menu md-button md-ink-ripple" href="/" aria-label="Menu">
  						<i className="mdi mdi-menu"></i>
              <div className="md-ripple-container"></div>
            </a>

            <a className="logo md-button md-ink-ripple" href="/" aria-label="Menu">
              Classics Archive [Development Prototype]
              <div className="md-ripple-container"></div>
            </a>

  				</div>

  				<div className="navbar-collapse collapse module-group right">

              <div className="module left">

      					<ul className="nav navbar-nav navbar-right">
      						<li>
                    <a className="md-button md-ink-ripple" href="/browse" aria-label="Works">
                      Read
                      <div className="md-ripple-container"></div>
                    </a>
                  </li>

      						<li>
                    <a className="md-button md-ink-ripple" href="/about" aria-label="Contribute">
                      About
                      <div className="md-ripple-container"></div>
                    </a>
                  </li>

      					</ul>

              </div>

              <div className="module social-module widget-handle left">
                <ul className="menu icon-menu">
                  <li>
                    <a className="close-navbar md-button md-ink-ripple" href="http://github.com/cltk" target="_blank">
                      <i className="mdi mdi-github-circle"></i>
                      <div className="md-ripple-container"></div>
                    </a>
                  </li>
                  {/*<!--li>
                    <a className="close-navbar md-button md-ink-ripple" href="http://twitter.com/@classicsarchive" target="_blank">
                      <i className="mdi mdi-twitter"></i>
                      <div className="md-ripple-container"></div>
                    </a>
                  </li>
                  <li>
                    <a className="close-navbar md-button md-ink-ripple" href="http://plus.google.com/+ClassicsArchive" target="_blank">
                      <i className="mdi mdi-google-plus"></i>
                      <div className="md-ripple-container"></div>
                    </a>
                  </li-->*/}
                </ul>
              </div>

              <div className="module search-module widget-handle left">
                <ul className="menu icon-menu">
                  <li>
                    <a className="close-navbar md-button md-ink-ripple" href="/search">
                      <i className="mdi mdi-magnify"></i>
                      <div className="md-ripple-container"></div>
                    </a>
                  </li>
                </ul>
              </div>


            </div>{/*<!-- .module-group.right -->*/}
      			</div>{/*<!-- .container.close-navbar -->*/}
      		</div>{/*<!-- .navigation-primary-->*/}
      	</header>
    )
  }
});
