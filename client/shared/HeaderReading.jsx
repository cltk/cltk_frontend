HeaderReading = React.createClass({
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

                <div className="reading-location">
                  <a className="md-button md-ink-ripple" href="/" aria-label="Menu">
                    Herodotus,
                    <div className="md-ripple-container"></div>
                  </a>

                  <a className="md-button md-ink-ripple" href="/" aria-label="Menu">
                    <em>Histories</em>,
                    <div className="md-ripple-container"></div>
                  </a>

                  <a className="md-button md-ink-ripple" href="/" aria-label="Menu">
                    Book I,
                    <div className="md-ripple-container"></div>
                  </a>

                  <a className="md-button md-ink-ripple" href="/" aria-label="Menu">
                    1.1
                    <div className="md-ripple-container"></div>
                  </a>

                </div>

      				</div>

      				<div className="navbar-collapse collapse module-group right">

                  <div className="module left">
                    <ul className="menu ">

          						<li className="meta-toggle" data-type="definitions">
                        <a className="md-button md-ink-ripple" href="#" aria-label="Works">
                          Definitions
                          <div className="md-ripple-container"></div>
                        </a>
                      </li>

          						<li className="meta-toggle" data-type="commentary">
                        <a className="md-button md-ink-ripple" href="#" aria-label="Contribute">
                          Commentary
                          <div className="md-ripple-container"></div>
                        </a>
                      </li>

          						<li className="meta-toggle" data-type="translations">
                        <a className="md-button md-ink-ripple" href="#" aria-label="Contribute">
                          Translations
                          <div className="md-ripple-container"></div>
                        </a>
                      </li>

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

    );
  }
});
