import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { createContainer } from 'meteor/react-meteor-data';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import TextMetaOptions from '/imports/ui/components/reading/TextMetaOptions';
import AnnotationsList from '/imports/ui/components/annotations/AnnotationsList';
import Annotations from '/imports/api/collections/annotations';
import RelatedPassages from '/imports/api/collections/relatedPassages';

class ReadingTextNode extends React.Component{

	constructor(props) {
		super(props);

		this.state = {
			bookmarked: false,
			showRelatedPassages: false,
			showAnnotations: false,
			annotationOpen: props.highlight,
			anchorEl: this.anchorEl,
		};
		autoBind(this);
	}

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	}

	componentDidMount() {
		if (this.props.highlight) {
			$('html,body').animate({ scrollTop: this.anchorEl.getBoundingClientRect().top }, 400);
		}
	}

	getTextLocation() {
		const text = this.props.text;
		let location = '';
		let textN = '';

		if ('n_1' in text) {
			location += text.n_1;
			textN = text.n_1;
		}
		if ('n_2' in text) {
			location += `.${text.n_2}`;
			textN = text.n_2;
		}
		if ('n_3' in text) {
			location += `.${text.n_3}`;
			textN = text.n_3;
		}
		if ('n_4' in text) {
			location += `.${text.n_4}`;
			textN = text.n_4;
		}
		if ('n_5' in text) {
			location += `.${text.n_5}`;
			textN = text.n_5;
		}

		return {
			location,
			textN,
		};
	}

	handleClick(event) {
		translation = $(`.translation-text[data-num="${this.props.index}"]`);
		if (translation.length !== 0) {
			$('.translations').animate({ scrollTop: translation.offset().top }, 800);
		}
		comment = $(`.commentary-comment[data-num="${this.props.index}"]`).first();
		if (comment.length !== 0) {
			$('.comments').animate({ scrollTop: comment.offset().top }, 800);
		}
		// This prevents ghost click.
		event.preventDefault();

		this.setState({
			annotationOpen: true,
		});
	}

	addAnnotationCheckList() {
		if (Meteor.userId()) {
			if (typeof this.props.addAnnotationCheckList === 'function') {
				this.props.addAnnotationCheckList(this.props.text._id);
			}
		} else {
			this.props.showLoginModal();
		}
	}

	handleRequestClose() {
		this.setState({
			annotationOpen: false,
		});
	}

	toggleBookmark() {
		if (Meteor.userId()) {
			let bookmarked = this.props.bookmarked;
			if (this.state.bookmarked) {
				bookmarked = this.state.bookmarked;
			}
			if (!bookmarked) {
				Meteor.call('bookmark.insert', this.props.text._id._str);
				this.setState({
					bookmarked: true,
				});
			} else {
				Meteor.call('bookmark.remove', this.props.text._id._str);
				this.setState({
					bookmarked: false,
				});
			}
		} else {
			this.props.showLoginModal();
		}
	}

	toggleBookmarked() {
		this.setState({
			bookmarked: !this.state.bookmarked,

		});
	}

	toggleShowAnnotations() {
		this.props.toggleReadingMeta('annotations');

		this.setState({
			showAnnotations: !this.state.showAnnotations,
		});
	}

	toggleShowRelatedPassages() {
		this.props.toggleReadingMeta('annotations');

		this.setState({
			showRelatedPassages: !this.state.showRelatedPassages,

		});
	}

	renderAnnotations() {
		return this.props.annotations.map((annotation, i) => (
			<AnnotationItem
				key={i}
				annotation={annotation}
			/>
		));
	}

	render() {
		const text = this.props.text;
		let textClasses = 'text-node';
		const numbering = this.props.numbering;
		const textLocation = this.getTextLocation();
		const mediaItems = text.mediaItems || [];
		const relatedPassages = text.relatedPassages || [];
		const entities = text.entities || [];
		let bookmarked = this.props.bookmarked;

		if (this.state.bookmarked) {
			bookmarked = this.state.bookmarked;
		}

		if (this.state.showAnnotations) {
			textClasses += ' with-annotations';
		}

		if (this.state.showRelatedPassages) {
			textClasses += ' with-related-passages';
		}

		if (this.props.showNumber) {
			textClasses = `${textClasses} show-number`;
		}

		if (bookmarked) {
			textClasses = `${textClasses} text-bookmarked`;
		}

		if (this.state.showEntities) {
			textClasses = `${textClasses} show-entities`;
		}

		if (this.state.showRelatedPassages) {
			textClasses = `${textClasses} show-related-passages`;
		}

		if (this.props.annotations.length !== 0) {
			textClasses = `${textClasses} text-annotated`;
			if (this.state.annotationOpen) {
				textClasses = `${textClasses} has-annotation`;
			}
		}

		if ((parseInt(textLocation.textN, 10) % 5) === 0) {
			textClasses = `${textClasses} show-number`;
		}

		return (
			<div
				className={textClasses}
				data-id={text._id}
				data-num={this.props.index}
				data-loc={textLocation.location}
			>
				<div className="text-left-header">
					<h2 className="section-numbering">{numbering}</h2>
					<span className="text-n">{textLocation.textN}</span>
					<i className="text-bookmark mdi mdi-bookmark" />
				</div>

				<TextMetaOptions
					toggleBookmark={this.toggleBookmark}
					toggleShowAnnotations={this.toggleShowAnnotations}
					toggleShowRelatedPassages={this.toggleShowRelatedPassages}
					annotationsCount={this.props.annotations.length}
					relatedPassagesCount={this.props.relatedPassages.length}
				/>

				<p
					className="text-html"
					onClick={this.handleClick}
					ref={(ref) => {
						this.anchorEl = ref;
						return ref;
					}}
				>
					{text.html && text.html.length ?
						<span dangerouslySetInnerHTML={{ __html: text.html }} />
					:
						<span>[ . . . ]</span>
					}
				</p>

				<div className="text-meta text-entities">
				{entities.map((entity, i) =>
					<ReadingEntity
						key={i}
						entity={entity}
					/>
				)}
				</div>

				<div className="text-meta text-media">
					{mediaItems.map((mediaId, i) => (
						<ReadingMedia
							key={i}
							mediaId={mediaId}
						/>
					))}
				</div>

				<div className="text-meta text-annotations">
					<i
						className="mdi mdi-close"
						onClick={this.toggleShowAnnotations}
					/>

					{/* <div className="text-annotations--create">
						<Popover
							open={this.state.annotationOpen}
							anchorEl={this.state.anchorEl}
							anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
							targetOrigin={{ horizontal: 'left', vertical: 'top' }}
						>
							<Card
								style={style.annotationCard}
							>
								<CardTitle
									style={style.annotationTitle}
									title="Add a note"
								/>
								<Toggle
									style={style.annotationToggle}
									label="Private"
									toggled={this.state.annotationPrivate}
									onToggle={this.handleAnnotationToggle}
								/>
								<CardText>
									<TextField
										name="annotationInput"
										style={style.annotationInput}
										multiLine
										rows={4}
										rowsMax={4}
										value={this.state.annotationText}
										onChange={this.handleAnnotationInput}
									/>
								</CardText>
								<CardActions>
									<FlatButton
										label="Save"
										primary
										onClick={this.handleAnnotationSubmit}
									/>
									<FlatButton
										label="Cancel"
										onClick={this.handleAnnotationCancel}
									/>
								</CardActions>
							</Card>
						</Popover>
					</div> */}
					<div className="text-annotations--content">
						<AnnotationsList
							text={text}
						/>
					</div>
				</div>

				<div className="text-meta text-related-passages">
					<i
						className="mdi mdi-close"
						onClick={this.toggleShowRelatedPassages}
					/>
					{relatedPassages.map((relatedPassage, i) => (
						<ReadingRelatedPassage
							key={i}
							relatedPassage={relatedPassage}
						/>
					))}
				</div>

			</div>

		);
	}
}

ReadingTextNode.propTypes = {
	index: PropTypes.number.isRequired,
	text: PropTypes.object.isRequired,
	showNumber: PropTypes.bool.isRequired,
	numbering: PropTypes.string.isRequired,
	addAnnotationCheckList: PropTypes.func,
	annotationCheckList: PropTypes.array,
	highlight: PropTypes.bool,
	toggleReadingMeta: PropTypes.func,
	showLoginModal: PropTypes.func,
	showSignupModal: PropTypes.func,
	closeLoginModal: PropTypes.func,
	closeSignupModal: PropTypes.func,
};

ReadingTextNode.childContextTypes = {
	muiTheme: PropTypes.object.isRequired,
};

const ReadingTextNodeContainer = createContainer(props => {
	let annotations = [];
	let relatedPassages = [];
	let bookmarked = false;
	const handleAnnotation = Meteor.subscribe('annotation');
	const handleRelatedPassages = Meteor.subscribe('relatedPassages');
	if (handleAnnotation.ready()) {
		annotations = Annotations.find({ textNodes: props.text._id }).fetch();
	}
	if (handleRelatedPassages.ready()) {
		relatedPassages = RelatedPassages.find({ textNodes: props.text._id }).fetch();
	}

	const handleBookmark = Meteor.subscribe('bookmark');
	if (handleBookmark.ready()) {
		const bookmarksList = Meteor.users.findOne({
			_id: Meteor.userId(),
		}, {
			fields: {
				bookmarks: 1,
			},
		});

		if (bookmarksList && 'bookmarks' in bookmarksList) {
			// Check if current textNode exist in bookmarked textNodes
			bookmarked = ~bookmarksList.bookmarks.indexOf(props.text._id._str);
		}
	}

	return {
		annotations,
		relatedPassages,
		bookmarked,
	};
}, ReadingTextNode);

export default ReadingTextNodeContainer;
