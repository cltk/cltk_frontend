import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


Footer = React.createClass({

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	},


	render() {
		const date = new Date();
		const year = date.getFullYear();

		const styles = {
			circleButton: {
				width: 'auto',
				height: 'auto',
			},
			circleButtonIcon: {
				color: '#ffffff',

			},
		};

		return (
			<footer className="bg-dark">
				<div className="container">
					<div className="row">
						<div className="col-md-8 col-md-offset-2 col-sm-9 col-sm-offset-1 text-center">
							<h3 className="logo">CLTK Archive</h3>
							<div className="footer-nav">
								<FlatButton
									label="HOME"
									href="/"
								/>
								<FlatButton
									label="READ"
									href="/browse"
								/>
								<FlatButton
									label="SEARCH"
									href="/search"
								/>
								<FlatButton
									label="CONTRIBUTE"
									target="_blank"
									href="http://github.com/cltk/cltk"
									rel="noopener noreferrer"
								/>
								<FlatButton
									label="CLTK.ORG"
									href="//cltk.org/"
									target="_blank"
									rel="noopener noreferrer"
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12 text-center">
							<ul className="list-inline social-list mb0">
								<li>

									<IconButton
										style={styles.circleButton}
										iconStyle={styles.circleButtonIcon}
										href="http://github.com/cltk"
										iconClassName="mdi mdi-github-circle"
									/>
								</li>
								<li>
									<IconButton
										style={styles.circleButton}
										iconStyle={styles.circleButtonIcon}
										href="http://twitter.com/@cltkarchive"
										iconClassName="mdi mdi-twitter"
									/>
								</li>
								<li>
									<IconButton
										style={styles.circleButton}
										iconStyle={styles.circleButtonIcon}
										href="http://plus.google.com/+cltkarchive"
										iconClassName="mdi mdi-google-plus"
									/>
								</li>
							</ul>
							<span className="copyright-information fade-1-4">
								Copyright Classical Languages ToolKit, {year}.  All of the media presented
								on this site originating from the CLTK are available through the Creative Commons Attribution 4.0 International, Free Culture License. Media originating from other sources are specific to the contributor. Review specific corpora information here: <a href="https://github.com/cltk" target="_blank">https://github.com/cltk</a>.
							</span>

						</div>
					</div>
				</div>
			</footer>
		);
	},
});

Footer.childContextTypes = {
	muiTheme: React.PropTypes.object.isRequired,
};
