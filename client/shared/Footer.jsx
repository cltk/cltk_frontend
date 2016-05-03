Footer = React.createClass({
  render(){
		let date = new Date();
		let year = date.getFullYear();
    return (
			<footer className="bg-dark">
		    <div className="container">
		      <div className="row">
		        <div className="col-sm-12 text-center">
		          <h3 className="logo">Classics Archive</h3>
		          <ul className="list-inline social-list mb0">
		            <li>
									<a className="md-button md-ink-ripple" href="http://github.com/cltk">
										<i className="mdi mdi-github-circle"></i>
										<div className="md-ripple-container"></div>
									</a>
		            </li>
		            <li>
									<a className="md-button md-ink-ripple" href="http://twitter.com/@classicsarchive">
										<i className="mdi mdi-twitter"></i>
										<div className="md-ripple-container"></div>
									</a>
		            </li>
		            <li>
									<a className="md-button md-ink-ripple" href="http://plus.google.com/+ClassicsArchive">
										<i className="mdi mdi-google-plus"></i>
										<div className="md-ripple-container"></div>
									</a>
		            </li>
		          </ul>
		        </div>
					</div>
		      <div className="row">
		        <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 text-center">
		          <div className="footer-links">
								<a className="md-button md-ink-ripple" href="/">
									<span>Home</span>
									<div className="md-ripple-container"></div>
								</a>
								<a className="md-button md-ink-ripple" href="http://api.cltk.org/browse">
									<span>Read</span>
									<div className="md-ripple-container"></div>
								</a>
								<a className="md-button md-ink-ripple" href="http://api.cltk.org/search">
									<span>Search</span>
									<div className="md-ripple-container"></div>
								</a>
								<a className="md-button md-ink-ripple" href="/">
									<span>Contribute</span>
									<div className="md-ripple-container"></div>
								</a>
							</div>
		          <span className="fade-1-4">Copyright the Classical Languages ToolKit, {year}.  All of the media presented on this site are available through the Creative Commons Attribution 4.0 International, Free Culture License.</span>

		        </div>
		      </div>
		    </div>
		  </footer>
		);
	}
});
