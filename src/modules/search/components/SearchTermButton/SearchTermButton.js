import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import FlatButton from 'material-ui/FlatButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class SearchTermButton extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			active: false,
		};

		autoBind(this);
	}

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	}

	toggleSearchTerm() {
		if (this.props.authorValue) {
			this.props.toggleSearchTerm(this.props.searchTermKey, this.props.authorValue);
		} else {
			this.props.toggleSearchTerm(this.props.searchTermKey, this.props.value);
		}
	}

	render() {
		let className = 'search-term-button';
		let active = this.props.active;

		if ('activeWork' in this.props) {
			if (this.props.activeWork === true) {
				active = true;
			}
		} else if (this.state.active) {
			active = true;
		}

		if (active) {
			className += ' search-term-button--active';
		}

		return (
			<li>
				<FlatButton
					className={className}
					onClick={this.toggleSearchTerm}
					label={this.props.label}
				/>
			</li>
		);
	}
}

SearchTermButton.propTypes = {
	toggleSearchTerm: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	searchTermKey: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	authorValue: PropTypes.object,
	activeWork: PropTypes.bool,
	active: PropTypes.bool,
};

SearchTermButton.childContextTypes = {
	muiTheme: PropTypes.object.isRequired,
};

export default SearchTermButton;
