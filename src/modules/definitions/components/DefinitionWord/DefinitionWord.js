import React from 'react';
import PropTypes from 'prop-types';

class DefinitionWord extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			showMore: false,
		};
	}

	toggleShowMore() {
		this.setState({
			showMore: !this.state.showMore,
		});
	}

	render() {
		const { showMore } = this.state;
		const wordClassName = `meta-item panel-item definition ${
			(showMore ? 'expanded' : '')}`;
		return (
			<div className={wordClassName}>
				<div className="show-more-toggle" onClick={this.toggleShowMore}>
					<i className="mdi mdi-plus paper-shadow" />
					<i className="mdi mdi-minus paper-shadow" />

				</div>

				<div className="definition-title meta-item-title">
					<h4 className="word">
						{this.props.word.lemma}
					</h4>
					<a
						className="definition-link"
						href={`http://www.perseus.tufts.edu/hopper/morph?l=${this.props.word.lemma}&la=la`}
						target="_blank"
						rel="noopener noreferrer"
					>
						Perseus
					</a>
				</div>

				<div className="word-meanings">
					{this.props.word.definitions.map((definition, i) => (
						<div className="meaning" key={i}>
							<span className="root">{definition.headword}</span>
							<span className="meaning-definition">{definition.definition}</span>
							<div className="forms">
								<span className="form">-{definition.pos}</span>
							</div>
						</div>
					))}

				</div>

				<div className="bottom-gradient" />
			</div>
		);
	}
}

DefinitionWord.propTypes = {
	word: PropTypes.object.isRequired,
};

export default DefinitionWord;
