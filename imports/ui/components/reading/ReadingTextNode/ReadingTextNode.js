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
			showNumber: false,
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

	handleClick(event) {
		const textLocation = this.props.location.join('.');
		const translation = $(`.translation-text[data-location="${textLocation}"]`);
		if (translation.length !== 0) {
			$('.translations').animate({ scrollTop: translation.offset().top }, 800);
		}

		const comment = $(`.commentary-comment[data-location="${textLocation}"]`).first();
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
		const { text, location, index } = this.props;
		let textClasses = 'text-node';
		const mediaItems = text.mediaItems || [];
		const relatedPassages = text.relatedPassages || [];
		const entities = text.entities || [];

		let bookmarked = this.props.bookmarked;
		if (this.state.bookmarked) {
			bookmarked = this.state.bookmarked;
		}
		if (bookmarked) {
			textClasses = ' text-bookmarked';
		}

		if (this.state.showAnnotations) {
			textClasses += ' with-annotations';
		}

		if (this.state.showRelatedPassages) {
			textClasses += ' with-related-passages';
		}

		if (
			this.state.showNumber
			|| ((location[location.length - 1] + 1) % 5) === 0
		) {
			textClasses += ' show-number';
		}

		if (this.state.showEntities) {
			textClasses += ' show-entities';
		}

		if (this.state.showRelatedPassages) {
			textClasses += ' show-related-passages';
		}

		/*
		if (this.props.annotations.length !== 0) {
			textClasses += ' text-annotated';
			if (this.state.annotationOpen) {
				textClasses += ' has-annotation';
			}
		}
		*/

		return (
			<div
				className={textClasses}
				data-location={location.join('.')}
			>
				<div className="text-left-header">
					<h2 className="section-numbering"></h2>
					<span className="text-n">{location[location.length - 1] + 1}</span>
					<i className="text-bookmark mdi mdi-bookmark" />
				</div>

				<TextMetaOptions
					toggleBookmark={this.toggleBookmark}
					toggleShowAnnotations={this.toggleShowAnnotations}
					toggleShowRelatedPassages={this.toggleShowRelatedPassages}
					annotationsCount={0}
					relatedPassagesCount={0}
				/>

				<p
					className="text-html"
					onClick={this.handleClick}
					ref={(ref) => {
						this.anchorEl = ref;
						return ref;
					}}
				>
					{text && text.length ?
						<span>{text}</span>
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

					{/*
					<div className="text-annotations--create">
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
					</div>
					*/}
					{/*
					<div className="text-annotations--content">
						<AnnotationsList
							text={text}
						/>
					</div>
					*/}
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
	id: PropTypes.number.isRequired,
	index: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
	location: PropTypes.array.isRequired,
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

export default ReadingTextNode;
