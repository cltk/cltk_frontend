import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


Footer = React.createClass({

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  },

  render(){
		let date = new Date();
		let year = date.getFullYear();
    return (
			<footer className="bg-dark">
		    <div className="container">
		      <div className="row">
		        <div className="col-sm-12 text-center">
		          <h3 className="logo">CLTK Archive</h3>
		          <ul className="list-inline social-list mb0">
		            <li>

                  <IconButton
                    linkButton={true}
                    href="http://github.com/cltk"
                    iconClassName="mdi mdi-github-circle"
                    />
		            </li>
		            <li>
                  <IconButton
                    linkButton={true}
                    href="http://twitter.com/@cltkarchive"
                    iconClassName="mdi mdi-twitter"
                    />
		            </li>
		            <li>
                  <IconButton
                    linkButton={true}
                    href="http://plus.google.com/+cltkarchive"
                    iconClassName="mdi mdi-google-plus"
                    />
		            </li>
		          </ul>
		        </div>
					</div>
		      <div className="row">
		        <div className="col-md-8 col-md-offset-2 col-sm-9 col-sm-offset-1 text-center">
		          <div className="footer-links">
                <FlatButton
                  linkButton={true}
                  label="HOME"
                  href="/"
                  />
                <FlatButton
                  linkButton={true}
                  label="READ"
                  href="/browse"
                  />
                <FlatButton
                  linkButton={true}
                  label="SEARCH"
                  href="/search"
                  />
                <FlatButton
                  linkButton={true}
                  label="CONTRIBUTE"
                  href="/contribute"
                  />
                <FlatButton
                  linkButton={true}
                  label="CLTK.ORG"
                  href="//cltk.org/"
                  target="_blank"

                  />
							</div>
		          <span className="copyright-information fade-1-4">Copyright the Classical Languages ToolKit, {year}.  All of the media presented on this site are available through the Creative Commons Attribution 4.0 International, Free Culture License.</span>

		        </div>
		      </div>
		    </div>
		  </footer>
		);
	}
});

Footer.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
