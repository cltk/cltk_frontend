
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

HeaderReading = React.createClass({

	propTypes: {
		showSearchModal: React.PropTypes.func,
		work: React.PropTypes.object,
		location: React.PropTypes.array.isRequired,
		toggleSidePanel: React.PropTypes.func.isRequired,
		toggleCommentary: React.PropTypes.bool.isRequired,
		toggleDefinitions: React.PropTypes.bool.isRequired,
		toggleTranslations: React.PropTypes.bool.isRequired,
		toggleScansion: React.PropTypes.bool.isRequired,
		toggleMedia: React.PropTypes.bool.isRequired,
		toggleEntities: React.PropTypes.bool.isRequired,
		toggleAnnotations: React.PropTypes.bool.isRequired,
	},

	childContextTypes: {
		muiTheme: React.PropTypes.object.isRequired,
	},

	getDefaultProps() {
		return {
			toggleDefinitions: false,
			toggleCommentary: false,
			toggleTranslations: false,
			toggleMedia: false,
			toggleScansion: false,
			toggleEntities: false,
		};
	},

	getInitialState() {
		return {
			leftMenuOpen: false,
		};
	},

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	},


	toggleSidePanel(metadata) {
		if (typeof this.props.toggleSidePanel === 'function') {
			this.props.toggleSidePanel(metadata);
		}
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

		const work = this.props.work;
		const location = this.props.location;
		const textLocation = location.join('.');
		// console.log('ReadingHeader', this.props);

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
								<FlatButton
									className="left-drawer-toggle"
									style={styles.flatIconButton}
									icon={<FontIcon className="mdi mdi-menu" />}
									onClick={this.toggleLeftMenu}
								/>

								{work && location ?
									<div className="reading-location">
										<div
											className="reading-location-param reading-location-param--author"
										>
											{work.authors.map((author, i) => (
												<a
													key={i}
													href={`/authors/${author.slug}`}
												>
													{author.english_name},
												</a>
											))}
										</div>

										<a
											className="reading-location-param reading-location-param--work"
											href={`/works/${work._id}/${work.slug}`}
										>
											{'english_title' in work ?
												<span>{Utils.trunc(work.english_title, 100)},</span>
										:
											''
										}
										</a>

										<a
											className="reading-location-param reading-location-param--number"
											href={`/works/${work._id}/${work.slug}?location=${textLocation}`}
										>
											{location.map((textN, i) => (
												<span key={i} >
													{textN}{((i + 1) === location.length) ? '' : '.'}
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

										{work.form === 'poetry' ? <li
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
	},
});
