import React from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Utils from '/imports/lib/utils';
import LeftMenu from '/imports/ui/components/header/LeftMenu';

class HeaderReading extends React.Component {
	static defaultProps = {
		toggleDefinitions: false,
		toggleCommentary: false,
		toggleTranslations: false,
		toggleMedia: false,
		toggleScansion: false,
		toggleEntities: false,
	}

	constructor(props) {
		super(props);

		this.state = {
			leftMenuOpen: false,
		};
	}


	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	}

	toggleSidePanel(metadata) {
		if (typeof this.props.toggleSidePanel === 'function') {
			this.props.toggleSidePanel(metadata);
		}
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

	render() {
		const styles = {
			flatButton: {
				width: 'auto',
				minWidth: 'none',
				height: '60px',
				padding: '10px 0px',
			},
			flatIconButton: {
				padding: '10px 20px',
				width: 'auto',
				minWidth: 'none',
				height: '60px',

			},

		};

		const { work, loc } = this.props;
		const { leftMenuOpen } = this.state;

		return (
			<div>
				<LeftMenu
					open={leftMenuOpen}
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
									onClick={this.toggleLeftMenu}
								/>

								{work && loc ?
									<div className="reading-location">
										<div
											className="reading-location-param reading-location-param--author"
										>
											<a
												href={`/authors/${work.author.id}`}
											>
												{work.author.id}
												{work.author.englishname},
											</a>
										</div>
										<a
											className="reading-location-param reading-location-param--work"
											href={`/works/${work.id}/${work.slug}`}
										>
											<span>{Utils.trunc(work.englishtitle, 100)},</span>
										</a>
										<a
											className="reading-location-param reading-location-param--number"
											href={`/works/${work.id}/${work.slug}/${loc}`}
										>
											{loc.split('.').map((locN, i) => (
												<span key={`${locN}-${i}`} >
													{parseInt(locN, 10) + 1}{((i + 1) === loc.split('.').length) ? '' : '.'}
												</span>
											))}
										</a>
									</div>
									:
									''
								}

							</div>

							<div className="navbar-collapse collapse module-group right">

								<div className="module left">
									<ul className="menu ">
										<li
											className={(this.props.toggleDefinitions) ? 'checked meta-toggle' :
											'meta-toggle'}
										>

											<FlatButton
												style={styles.flatButton}
												label="Definitions"
												onClick={this.toggleSidePanel.bind(this, 'definitions')}
											/>
										</li>

										<li
											className={(this.props.toggleCommentary) ? 'checked meta-toggle' :
											'meta-toggle'}
										>
											<FlatButton
												style={styles.flatButton}
												label="Commentary"
												onClick={this.toggleSidePanel.bind(this, 'commentary')}
											/>
										</li>

										<li
											className={(this.props.toggleTranslations) ? 'checked meta-toggle' :
											'meta-toggle'}
										>
											<FlatButton
												style={styles.flatButton}
												label="Translations"
												onClick={this.toggleSidePanel.bind(this, 'translations')}
											/>
										</li>

										<li
											className={(this.props.toggleEntities) ? 'checked meta-toggle' :
											'meta-toggle'}
										>
											<FlatButton
												style={styles.flatButton}
												label="Entities"
												onClick={this.toggleSidePanel.bind(this, 'entities')}
											/>
										</li>

										{work.form === 'poetry' ?
											<li
												className={(this.props.toggleScansion) ? 'checked meta-toggle' :
												'meta-toggle'}
											>
												<FlatButton
													style={styles.flatButton}
													label="Scansion"
													onClick={this.toggleSidePanel.bind(this, 'scansion')}
												/>
											</li>
										: ''}

										<li
											className={(this.props.toggleMedia) ? 'checked meta-toggle' : 'meta-toggle'}
										>
											<FlatButton
												style={styles.flatButton}
												label="Media"
												onClick={this.toggleSidePanel.bind(this, 'media')}
											/>
										</li>
										{/* <li
											className={'meta-toggle'}
										>
											<FlatButton
												style={styles.flatButton}
												label=""
												onClick={this.toggleSidePanel.bind(this, 'show-more')}
												icon={<span className="mdi mdi-dots-horizontal" />}
											/>
										</li> */}

									</ul>

								</div>

								{this.props.showSearchModal ?
									<div className="module search-module widget-handle left">
										<ul className="menu icon-menu">
											<li>
												<FlatButton
													style={styles.flatIconButton}
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
}

HeaderReading.propTypes = {
	showSearchModal: PropTypes.func,
	work: PropTypes.object,
	toggleSidePanel: PropTypes.func.isRequired,
	toggleCommentary: PropTypes.bool.isRequired,
	toggleDefinitions: PropTypes.bool.isRequired,
	toggleTranslations: PropTypes.bool.isRequired,
	toggleScansion: PropTypes.bool.isRequired,
	toggleMedia: PropTypes.bool.isRequired,
	toggleEntities: PropTypes.bool.isRequired,
	toggleAnnotations: PropTypes.bool.isRequired,
};

HeaderReading.childContextTypes = {
	muiTheme: PropTypes.object.isRequired,
};

export default HeaderReading;
