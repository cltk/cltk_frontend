import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import LeftMenu from '/imports/ui/components/header/LeftMenu';
import LoginButtons from '/imports/ui/components/auth/LoginButtons';
import AuthModal from '/imports/ui/components/auth/AuthModal';

export default class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			leftMenuOpen: false,
			AuthModalLowered: false,
		};

		[
			'toggleLeftMenu',
			'closeLeftMenu',
			'showLoginModal',
			'showSignupModal',
			'closeAuthModal',
		].forEach(f => {
			this[f] = this[f].bind(this);
		});
	}

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	}

	toggleLeftMenu() {
		this.setState({
			leftMenuOpen: !this.state.leftMenuOpen,
		});
	}

	closeLeftMenu() {
		this.setState({
			leftMenuOpen: false,
		});
	}

	showLoginModal() {
		this.setState({
      authAction: 'login',
			authModalLowered: true,
		});
	}

	showSignupModal() {
		this.setState({
      authAction: 'signup',
			authModalLowered: true,
		});
	}

	closeAuthModal() {
		this.setState({
			AuthModalLowered: false,
		});
	}

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
				verticalAlign: 'top',
				fontSize: '20px',
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
											<LoginButtons />
										</li>
										<li>
											<FlatButton
												className="header-button"
												style={styles.flatButton}
												label="ABOUT"
												href="/about"
											/>
										</li>
										<li>
											<FlatButton
												className="header-button"
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
												className="header-button header-icon-button"
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
													className="header-button header-icon-button"
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
			</div>
		);
	}
};

Header.childContextTypes = {
	muiTheme: PropTypes.object.isRequired,
};

Header.propTypes = {
	showSearchModal: PropTypes.func,
};
