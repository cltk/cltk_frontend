import React from 'react';
import ReactList from 'react-list';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';


import './DefinitionsPanel.css';


class DefinitionsPanel extends React.Component {
	static defaultProps = {
		toggleDefinitions: false,
		textNodes: [],
	}

	constructor(props) {
		super(props);

		this.state = {
			searchText: '',
		};

		autoBind(this);
	}

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	}

	handleChange(event) {
		this.setState({ searchText: event.target.value.toLowerCase() });
	}

	renderDefinitions() {
		return this.props.words.map((word, i) => (
			<DefinitionWord
				key={i}
				word={word}
			/>
		));
	}

	renderDefinition(index, key) {
		return (
			<DefinitionWord
				key={key}
				word={this.props.words[index]}
			/>
		);
	}

	render() {
		return (
			<div
				className={(this.props.toggleDefinitions) ?
				'slide-visible modal-panel definitions-panel paper-shadow' :
				'modal-panel definitions-panel paper-shadow'}
			>
				<div className="modal-panel-inner definitions-panel-inner">
					<TextField
						className="search-box" hintText="Search text"
						fullWidth
						onChange={this.handleChange}
					/>
					<div className="definitions panel-items" >
						<ReactList
							itemRenderer={this.renderDefinition}
							length={this.props.words.length}
							type="variable"
						/>

					</div>

					{this.props.words.length === 0 ?
						<span className="no-results no-results-definitions">No definitions available.</span>
						:
						null
					}
				</div>
			</div>
		);
	}
}

DefinitionsPanel.propTypes = {
	toggleDefinitions: PropTypes.bool,
	textNodes: PropTypes.array,
};

DefinitionsPanel.childContextTypes = {
	muiTheme: PropTypes.object.isRequired,
};


export default DefinitionsPanel;
