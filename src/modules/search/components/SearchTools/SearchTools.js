import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import autoBind from 'react-autobind';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import debounce from 'throttle-debounce/debounce';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


class SearchTools extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			searchDropdownOpen: '',
			yearMin: -1000,
			yearMax: 1000,
			languages: [],
			corpora: [],
			authors: [],
		};

		autoBind(this);
	}

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	}

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
	}

	toggleSearchTerm(key, value) {
		this.props.toggleSearchTerm(key, value);
		this.setState({
			searchDropdownOpen: '',
		});
	}

	handleChangeTextsearch() {
		this.props.handleChangeTextsearch(this.refs.textsearch.input.value);
	}

	render() {
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
						floatingLabelFixed
						ref="textsearch"
						onChange={debounce(500, this.handleChangeTextsearch)}
					/>
				</div>

			</div>
		);
	}
}

SearchTools.propTypes = {
	filters: PropTypes.array,
	toggleSearchTerm: PropTypes.func,
	handleChangeTextsearch: PropTypes.func,
	handleChangeDate: PropTypes.func,
};

SearchTools.childContextTypes = {
	muiTheme: PropTypes.object.isRequired,
};

export default SearchTools;
