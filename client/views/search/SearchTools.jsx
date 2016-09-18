import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import debounce from 'throttle-debounce/debounce';

SearchTools = React.createClass({

	propTypes: {
		filters: React.PropTypes.array,
		toggleSearchTerm: React.PropTypes.func,
		handleChangeTextsearch: React.PropTypes.func,
		handleChangeDate: React.PropTypes.func,

	},

	childContextTypes: {
		muiTheme: React.PropTypes.object.isRequired,
	},

	getInitialState() {
		return {
			searchDropdownOpen: '',
			yearMin: -1000,
			yearMax: 1000,
			languages: [],
			corpora: [],
			authors: [],
		};
	},

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	},

	componentDidMount() {
		Meteor.call('searchTools', (err, res) => {
			if (err) {
				console.log(err);
			} else {
				//console.log('searchTools response', res);
				this.setState({
					languages: res.languages,
					corpora: res.corpora,
					authors: res.authors,

				});
			}
		});

		this.refs.textsearch.getInputNode().focus();

	},

	toggleSearchDropdown(dropdown) {
		if (this.state.searchDropdownOpen === dropdown) {
			this.setState({
				searchDropdownOpen: '',
			});
		} else {
			this.setState({
				searchDropdownOpen: dropdown,
			});
		}
	},

	toggleSearchTerm(key, value) {
		this.props.toggleSearchTerm(key, value);
		this.setState({
			searchDropdownOpen: '',
		});
	},

	handleChangeTextsearch() {
		this.props.handleChangeTextsearch(this.refs.textsearch.input.value);
	},


	render() {
		const self = this;
		const filters = this.props.filters;


		return (
			<div className="search-tools">
				<div className="text-search-row">
					<i
						className="search-icon mdi mdi-magnify"
					/>
					<TextField
						className="text-search-field"
						hintText="Search"
						floatingLabelText="Search"
						floatingLabelFixed={true}
						ref="textsearch"
						onChange={debounce(500, this.handleChangeTextsearch)}
					/>
				</div>

				<div className="dropdown-search-row">

					<div
						className={`cltk-dropdown search-dropdown search-dropdown-date${
							self.state.searchDropdownOpen === 'date' ? ' open' : ''}`}
					>
						<FlatButton
							className="search-tool search-type-date dropdown-toggle"
							// label={<span><i className='mdi mdi-calendar button-prefix-icon'></i>Date</span>}
							label="Date"
							labelPosition="before"
							icon={<FontIcon className="mdi mdi-chevron-down" />}
							onClick={this.toggleSearchDropdown.bind(null, 'date')}
						/>

						<ul className="dropdown-menu ">
							<div className="dropdown-menu-inner">
								<div className="search-tool--date toolbar">
									<DateRangeSlider
										handleChangeDate={this.props.handleChangeDate}
										min={-1000}
										max={1000}
									/>
								</div>
							</div>
						</ul>

					</div>
					<div
						className={`cltk-dropdown search-dropdown search-dropdown-languages${
							self.state.searchDropdownOpen === 'languages' ? ' open' : ''}`}
					>
						<FlatButton
							className="search-tool search-type-languages dropdown-toggle"
							label="languages"
							labelPosition="before"
							icon={<FontIcon className="mdi mdi-chevron-down" />}
							onClick={this.toggleSearchDropdown.bind(null, 'languages')}
						/>

						<ul className="dropdown-menu ">
							<div className="dropdown-menu-inner">
								{self.state.languages.map((language, i) => {
									let active = false;
									filters.forEach((filter) => {
										if (filter.key === 'languages') {
											filter.values.forEach((value) => {
												if (language === value) {
													active = true;
												}
											});
										}
									});
									return (
										<SearchTermButton
											key={i}
											toggleSearchTerm={self.toggleSearchTerm}
											label={language}
											searchTermKey="languages"
											value={language}
											active={active}
										/>
									);
								})}
								{self.state.languages.length === 0 ?
									<div className="no-results">No languages found in archive.</div>
									: ''
								}
							</div>
						</ul>
					</div>
					<div
						className={`cltk-dropdown search-dropdown search-dropdown-corpora${
							self.state.searchDropdownOpen === 'corpora' ? ' open' : ''}`}
					>
						<FlatButton
							className="search-tool search-type-corpora dropdown-toggle"
							label="corpora"
							labelPosition="before"
							icon={<FontIcon className="mdi mdi-chevron-down" />}
							onClick={this.toggleSearchDropdown.bind(null, 'corpora')}
						/>

						<ul className="dropdown-menu ">
							<div className="dropdown-menu-inner">
								{self.state.corpora.map((corpus, i) => {
									let active = false;
									filters.forEach((filter) => {
										if (filter.key === 'corpora') {
											filter.values.forEach((value) => {
												if (corpus === value) {
													active = true;
												}
											});
										}
									});
									return (
										<SearchTermButton
											key={i}
											toggleSearchTerm={self.toggleSearchTerm}
											label={corpus}
											searchTermKey="corpora"
											value={corpus}
											active={active}
										/>
									);
								})}
								{self.state.corpora.length === 0 ?
									<div className="no-results">No corpora found in archive.</div>
									: ''
								}
							</div>
						</ul>


					</div>
					<div
						className={`cltk-dropdown search-dropdown search-dropdown-authors${
							self.state.searchDropdownOpen === 'authors' ? ' open' : ''}`}
					>
						<FlatButton
							className="search-tool search-type-authors dropdown-toggle"
							label="authors"
							labelPosition="before"
							icon={<FontIcon className="mdi mdi-chevron-down" />}
							onClick={this.toggleSearchDropdown.bind(null, 'authors')}
						/>

						<ul className="dropdown-menu ">
							<div className="dropdown-menu-inner">
								{self.state.authors.map((author, i) => {
									let active = false;
									filters.forEach((filter) => {
										if (filter.key === 'authors') {
											filter.values.forEach((value) => {
												if (author === value) {
													active = true;
												}
											});
										}
									});
									return (
										<SearchTermButton
											key={i}
											toggleSearchTerm={self.toggleSearchTerm}
											label={author}
											searchTermKey="authors"
											value={author}
											active={active}
										/>
									);
								})}
								{self.state.authors.length === 0 ?
									<div className="no-results">No authors found in archive.</div>
									: ''
								}
							</div>
						</ul>

					</div>

				</div>
			</div>
		);
	},
});
