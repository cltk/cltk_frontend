import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import TextField from 'material-ui/TextField';
import ReactList from 'react-list';

DefinitionsPanel = React.createClass({

	propTypes: {
		toggleDefinitions: React.PropTypes.bool,
		textNodes: React.PropTypes.array,
	},

	mixins: [ReactMeteorData],

	getDefaultProps() {
		return {
			toggleDefinitions: false,
			textNodes: [],
		};
	},

	getInitialState() {
		return {
			searchText: '',
		};
	},

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	},

	// This mixin makes the getMeteorData method work

	getMeteorData() {
		const words = [];
		const textIds = [];
		const definitionIds = [];
		const definitions = {};
		let wordForms = [];
		this.props.textNodes.map((textNode) => {
			textIds.push(textNode._id);
			return true;
		});

		const handleWordforms = Meteor.subscribe('wordForms', textIds);
		if (handleWordforms.ready()) {
			wordForms = Wordforms.find({ word: { $regex: this.state.searchText } }).fetch();
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
	},

	handleChange(event) {
		this.setState({ searchText: event.target.value.toLowerCase() });
	},

	renderDefinitions() {
		/* eslint max-len: "off" */

		/*
		var words = [
		{
		_id : 123,
		lemma: "arma",
		definitions: [
		{
		orthography: ["armum", "armi"],
		senses: ["arms (pl.)", "weapons", "armor", "shield", "close fighting weapons", "equipment", "force"],
		inflections: [
		{
		pos: "noun",
		ending: "a",
		declension: {
		title: "2nd",
		"case": "nominative"
		},
		gender: "neuter",
		number: "plural"
		}, {
		pos: "noun",
		ending: "a",
		declension: {
		title: "2nd",
		"case": "vocative"
		},
		gender: "neuter",
		number: "plural"
		}, {
		pos: "noun",
		ending: "a",
		declension: {
		title: "2nd",
		"case": "accusative"
		},
		gender: "neuter",
		number: "plural"
		}
		]
		}, {
		orthography: ["armo", "armare", "aramvi", "armatus"],
		senses: ["equip", "fit with armor", "arm", "strengthen", "rouse", "stir", "incite war", "rig (ship)"],
		inflections: [
		{
		pos: "verb",
		ending: "a",
		conjugation: "1st",
		person: "2nd",
		number: "singular",
		tense: "present",
		voice: "active",
		mood: "imperative"
		}
		]
		}
		]
		}, {
		_id : 124,
		lemma: "virum",
		definitions: [
		{
		orthography: ["virum", "viri"],
		senses: ["man", "husband", "hero", "person of courage", "honor", "nobility"],
		inflections: [
		{
		pos: "noun",
		ending: "um",
		declension: {
		title: "2nd",
		"case": "accusative"
		},
		gender: "masculine",
		number: "singular"
		}
		]
		}, {
		orthography: ["vis", "viris"],
		senses: ["strength (bodily) (pl.)", "force", "power", "might", "violence", "resources", "large body"],
		inflections: [
		{
		pos: "noun",
		ending: "um",
		declension: {
		title: "3rd",
		"case": "genitive"
		},
		gender: "feminine",
		number: "plural"
		}
		]
		}
		]
		}
		];
		*/
		return this.data.words.map((word, i) => (
			<DefinitionWord
				key={i}
				word={word}
			/>
		));
	},

	renderDefinition(index, key) {
		return (
			<DefinitionWord
				key={key}
				word={this.data.words[index]}
			/>
		);
	},

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
							length={this.data.words.length}
							type="variable"
						/>

					</div>

					{this.data.words.length === 0 ?
						<span className="no-results no-results-definitions">No definitions available.</span>
						:
						null
					}
				</div>
			</div>
		);
	},

});
DefinitionsPanel.childContextTypes = {
	muiTheme: React.PropTypes.object.isRequired,
};
