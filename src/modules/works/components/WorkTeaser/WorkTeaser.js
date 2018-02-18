import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { Card } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';



// Work Teaser
class WorkTeaser extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isInShelf: false,
		};
		autoBind(this);
	}

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	}

	toggleShelf(isChecked) {
		this.setState({
			isInShelf: !this.state.isInShelf,
		});
	}

	render() {
		const work = this.props.work;
		const workUrl = `/works/${work.id}/${work.slug}`;

		let isInShelf = this.props.isInShelf;

		if (this.state.isInShelf) {
			isInShelf = this.state.isInShelf;
		}

		return (
			<Card
				className="work-teaser"
			>

				<div className="card-meta-left">
					<IconButton
						tooltip="Add to Your Library"
						tooltipPosition="top-center"
						className={`icon-favorite-button ${isInShelf ? 'in-user-shelf' : ''}`}
						iconClassName="mdi mdi-book-open-variant"
						onClick={this.toggleShelf.bind(this, isInShelf)}
					/>

					<div className="card-meta-items">
						<span className="card-meta card-meta-left-language">
							{work.language.title}
						</span>
						{work.date ?
							<span className="card-meta card-meta-left-date">
								{work.date}
							</span>
						:
							''
						}
						<span className="card-meta card-meta-left-corpus">
							{work.corpus.title}
						</span>
					</div>
				</div>

				<div className="work-teaser-authors">
					<div
						className="work-teaser-author"
					>

						<h4>
							{work.author.name}
							{work.author.original_name ?
								<span className="work-teaser-author-original-name">
									({work.author.original_name})
								</span>
								:
								''
							}
						</h4>
					</div>
				</div>

				<a
					href={workUrl}
					className="work-teaser-title"
				>
					<h3 >
						{work.english_title}
						{work.original_title ?
							<span className="work-teaser-original-title">
								{work.original_title}
							</span>
							:
							''
						}
					</h3>
				</a>

				<div className="card-meta-bottom">
					<span className="card-meta meta-count-commentary">
						{work.countComments || 0} Commentary
					</span>
					<span className="card-meta meta-count-translations">
						{work.countTranslations || 0} Translations
					</span>
					<span className="card-meta meta-count-annotations">
						{work.countAnnotations || 0} Annotations
					</span>
				</div>
			</Card>
		);
	}
}

WorkTeaser.childContextTypes = {
	muiTheme: PropTypes.object.isRequired,
};

WorkTeaser.propTypes = {
	work: PropTypes.object.isRequired,
};

export default WorkTeaser;
