
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

Header = React.createClass({

	propTypes: {
		showSearchModal: React.PropTypes.func,

	},

	childContextTypes: {
		muiTheme: React.PropTypes.object.isRequired,
	},

	getInitialState() {
		return {
			leftMenuOpen: false,
			modalLoginLowered: false,
			modalSignupLowered: false,
		};
	},

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	},

	toggleLeftMenu() {
		this.setState({
			leftMenuOpen: !this.state.leftMenuOpen,
		});
	},

	closeLeftMenu() {
		this.setState({
			leftMenuOpen: false,
		});
	},
	showLoginModal() {
		this.setState({
			modalLoginLowered: true,
		});
	},
	showSignupModal() {
		this.setState({
			modalSignupLowered: true,
		});
	},
	closeLoginModal() {
		this.setState({
			modalLoginLowered: false,
		});
	},
	closeSignupModal() {
		this.setState({
			modalSignupLowered: false,
		});
	},

	render() {
		const styles = {
			flatButton: {
				width: 'auto',
				minWidth: 'none',
				height: '55px',
				padding: '10px 5px',
			},
			flatIconButton: {
				padding: '10px 20px',
				width: 'auto',
				minWidth: 'none',
				height: '55px',

			},

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
								<IconButton
									className="left-drawer-toggle"
									style={styles.flatIconButton}
									iconClassName="mdi mdi-menu"
									onClick={this.toggleLeftMenu}
								/>

								<FlatButton
									className="logo"
									style={styles.flatButton}
									href="/"
									label="CLTK Archive [Prototype]"
								/>

							</div>

							<div className="navbar-collapse collapse module-group right">

								<div className="module left">

									<ul className="nav navbar-nav navbar-right">
										<li>
											<LoginButtons
												showLoginModal={this.showLoginModal}
												showSignupModal={this.showSignupModal}
											/>
										</li>
										<li>
											<FlatButton
												style={styles.flatButton}
												label="BROWSE"
												href="/browse"
											/>
										</li>

										<li>
											<FlatButton
												style={styles.flatButton}
												label="ABOUT"
												href="/about"
											/>
										</li>
										<li>
											<FlatButton
												style={styles.flatButton}
												label="UPDATES"
												href="//cltk.org/blog"
												target="_blank"
												rel="noopener noreferrer"
											/>
										</li>

									</ul>

								</div>

								<div className="module social-module widget-handle left">
									<ul className="menu icon-menu">
										<li>
											<FlatButton
												style={styles.flatIconButton}
												href="//github.com/cltk"
												icon={<FontIcon className="mdi mdi-github-circle" />}
												target="_blank"
												rel="noopener noreferrer"
											/>
										</li>
									</ul>
								</div>

								{this.props.showSearchModal ?
									<div className="module search-module widget-handle left">
										<ul className="menu icon-menu">
											<li>
												<FlatButton
													style={styles.flatIconButton}
													href="#"
													onClick={this.props.showSearchModal}
													icon={<FontIcon className="mdi mdi-magnify" />}
												/>
											</li>
										</ul>
									</div>
								: ''}

							</div>{/* <!-- .module-group.right -->*/}
						</div>{/* <!-- .container.close-navbar -->*/}
					</div>{/* <!-- .navigation-primary-->*/}
				</header>
				{this.state.modalLoginLowered ?
					<ModalLogin
						lowered={this.state.modalLoginLowered}
						closeModal={this.closeLoginModal}
					/>
					: ''
				}
				{this.state.modalSignupLowered ?
					<ModalSignup
						lowered={this.state.modalSignupLowered}
						closeModal={this.closeSignupModal}
					/>
					: ''
				}
			</div>
		);
	},
});
