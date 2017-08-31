import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { createContainer } from 'meteor/react-meteor-data';
import { Card } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Utils from '/imports/lib/utils';


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
		if (Meteor.userId()) {
			if (!isChecked) {
				Meteor.call('shelf.insert', this.props.work.id);
			} else {
				Meteor.call('shelf.remove', this.props.work.id);
			}
			this.setState({
				isInShelf: true,
			});
		} else {
			this.setState({
				showLoginDialog: true,
			});
		}
	}

	render() {
		const work = this.props.work;
		const workUrl = `/works/${work.slug}`;

		let isInShelf = this.props.isInShelf;

		if (this.state.isInShelf) {
			isInShelf = this.state.isInShelf;
    }

    // FIXME: MongoDB returns an `authors` array
    work.author = work.authors[0] || {}

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
							{work.language}
						</span>
						{work.date ?
							<span className="card-meta card-meta-left-date">
								{work.date}
							</span>
						:
							''
						}
					</div>
				</div>

				<div className="work-teaser-authors">
					<a
						href={`/authors/${work.author.id}`}
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
					</a>
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
						{work.countComments} Comments
					</span>
					<span className="card-meta meta-count-translations">
						{work.countTranslations} Translations
					</span>
					<span className="card-meta meta-count-annotations">
						{work.countAnnotations} Annotations
					</span>

				</div>


				{/* <Divider />
				<CardActions>
				<a href="#">
				<IconButton tooltip="Comment">
				<CommunicationComment />
				</IconButton>
				</a>
				<a href="#">
				<IconButton tooltip="Favorite">
				<ActionFavoriteBorder />
				</IconButton>
				</a>
				<a href="#">
				<IconButton tooltip="Other Formats">
				<ActionInput />
				</IconButton>
				</a>
				</CardActions>*/}
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

const WorkTeaserContainer = createContainer((props) => {
	let isInShelf = false;

	const worksShelfList = Meteor.users.findOne({
		_id: Meteor.userId(),
	}, {
		fields: {
			worksShelf: 1,
		},
	});

	const handle = Meteor.subscribe('worksShelf');
	if (handle.ready()) {
		if (worksShelfList && 'worksShelf' in worksShelfList) {
			// Check if current textNode exist in bookmarked textNodes
			isInShelf = ~worksShelfList.worksShelf.indexOf(props.work.id);
		}
	}

	return {
		isInShelf,
	};
}, WorkTeaser);

export default WorkTeaserContainer;
