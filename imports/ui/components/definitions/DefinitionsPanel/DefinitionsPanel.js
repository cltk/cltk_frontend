import React from 'react';
import ReactList from 'react-list';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { createContainer } from 'meteor/react-meteor-data';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';

import Definitions from '/imports/api/collections/definitions';
import Wordforms from '/imports/api/collections/wordforms';

class DefinitionsPanel extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			searchText: '',
		};

		autoBind(this);
	}

	getDefaultProps() {
		return {
			toggleDefinitions: false,
			textNodes: [],
		};
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


const DefinitionsPanelContainer = createContainer((props) => {
	const words = [];
	const textIds = [];
	const definitionIds = [];
	const definitions = {};
	let wordForms = [];
	props.textNodes.map((textNode) => {
		textIds.push(textNode._id);
		return true;
	});

	const handleWordforms = Meteor.subscribe('wordForms', textIds);
	if (handleWordforms.ready()) {
		wordForms = Wordforms.find({ word: { $regex: props.searchText } }).fetch();
		wordForms.map((wordForm) => {
			definitionIds.push(wordForm.definitions);
			return true;
		});
		const handleDefinitions = Meteor.subscribe('definitions', definitionIds);
		if (handleDefinitions.ready()) {
			wordForms.map((wordForm) => {
				if (definitions[wordForm.word] == null) {
					definitions[wordForm.word] = [];
				}
				definition = Definitions.findOne({ _id: wordForm.definitions });
				if (definition !== undefined) {
					definitions[wordForm.word].push(definition);
				}
				return true;
			});
			Object.keys(definitions).forEach(key => {
				word = {};
				word.lemma = key;
				word.definitions = definitions[key];
				words.push(word);
			});
		}
	}
	return {
		words,
	};
}, DefinitionsPanel);

export default DefinitionsPanelContainer;
