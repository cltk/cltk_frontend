import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

ReadingTextNode = React.createClass({

	propTypes: {
		index: React.PropTypes.number.isRequired,
		text: React.PropTypes.object.isRequired,
		showNumber: React.PropTypes.bool.isRequired,
		numbering: React.PropTypes.string.isRequired,
		addAnnotationCheckList: React.PropTypes.func,
		annotationCheckList: React.PropTypes.array,
		highlight: React.PropTypes.bool,
	},

	childContextTypes: {
		muiTheme: React.PropTypes.object.isRequired,
	},

	mixins: [ReactMeteorData],

	getInitialState() {
		return {
			bookmarked: false,
			showRelatedPassages: false,
			showAnnotations: false,
			showLoginDialog: false,
			annotationOpen: this.props.highlight,
			anchorEl: this.anchorEl,
		};
	},

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	},

	componentDidMount() {
		if (this.props.highlight) {
			$('html,body').animate({ scrollTop: this.anchorEl.getBoundingClientRect().top }, 400);
		}
	},

	getMeteorData() {
		let annotationList = [];
		let bookmarked = false;
		const handleAnnotation = Meteor.subscribe('annotation');
		const handleBookmark = Meteor.subscribe('bookmark');
		if (handleAnnotation.ready()) {
			annotationList = Annotation.find({ textNodes: this.props.text._id }).fetch();
		}
		if (handleBookmark.ready()) {
			const bookmarkList = Meteor.users.findOne({}, { fields: { bookmarks: 1 } });
			if (bookmarkList && bookmarkList.bookmarks) {
				// Check if current textNode exist in bookmarked textNodes
				bookmarked = bookmarkList.bookmarks.indexOf(this.props.text._id) !== -1;
			}
		}
		return {
			annotationList,
			bookmarked,
		};
	},

	getTextLocation() {
		const text = this.props.text;
		let location = '';

		if ('n_1' in text) {
			location += text.n_1;
		}
		if ('n_2' in text) {
			location += `.${text.n_2}`;
		}
		if ('n_3' in text) {
			location += `.${text.n_3}`;
		}
		if ('n_4' in text) {
			location += `.${text.n_4}`;
		}
		if ('n_5' in text) {
			location += `.${text.n_5}`;
		}

		return location;
	},


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
	},

	addAnnotationCheckList(event, isChecked) {
		if (Meteor.userId()) {
			if (typeof this.props.addAnnotationCheckList === 'function') {
				this.props.addAnnotationCheckList(this.props.text._id, isChecked);
			}
		} else {
			this.setState({
				showLoginDialog: true,
			});
		}
	},

	handleRequestClose() {
		this.setState({
			annotationOpen: false,
		});
	},

	handleLoginDialogClose() {
		this.setState({
			showLoginDialog: false,
		});
	},

	toggleBookmark(event, isChecked) {
		if (Meteor.userId()) {
			if (isChecked) {
				Meteor.call('bookmark.insert', this.props.text._id);
			} else {
				Meteor.call('bookmark.remove', this.props.text._id);
			}
		} else {
			this.setState({
				showLoginDialog: true,
			});
		}
	},

	toggleBookmarked() {
		this.setState({
			bookmarked: !this.state.bookmarked,

		});
	},

	toggleShowAnnotations() {
		this.setState({
			showAnnotations: !this.state.showAnnotations,

		});
	},

	toggleShowRelatedPassages() {
		this.setState({
			showRelatedPassages: !this.state.showRelatedPassages,

		});
	},

	renderAnnotations() {
		return this.data.annotationList.map((annotation, i) => (
			<AnnotationItem
				key={i}
				annotation={annotation}
			/>
		));
	},

	render() {
		const text = this.props.text;
		let textClasses = 'text-node';
		const numbering = this.props.numbering;

		if (this.props.showNumber) {
			textClasses = `${textClasses} show-number`;
		}

		if (this.state.bookmarked) {
			textClasses = `${textClasses} text-bookmarked`;
		}

		if (this.state.showEntities) {
			textClasses = `${textClasses} show-entities`;
		}

		if (this.state.showRelatedPassages) {
			textClasses = `${textClasses} show-related-passages`;
		}

		if (this.data.annotationList.length !== 0) {
			textClasses = `${textClasses} text-annotated`;
			if (this.state.annotationOpen) {
				textClasses = `${textClasses} has-annotation`;
			}
		}

		const textLocation = this.getTextLocation();

		return (
			<div
				className={textClasses}
				data-id={text._id}
				data-num={this.props.index}
				data-loc={textLocation}
			>
				<div className="text-left-header">
					<h2>{numbering}</h2>
					<i className="text-bookmark mdi mdi-bookmark" />
				</div>

				<TextMetaOptions
					toggleBookmark={this.toggleBookmark}
					toggleShowAnnotations={this.toggleShowAnnotations}
					toggleShowRelatedPassages={this.toggleShowRelatedPassages}
				/>

				<p
					className="text-html"
					onClick={this.handleClick}
					ref={(ref) => {
						this.anchorEl = ref;
						return ref;
					}}
				>
					<span dangerouslySetInnerHTML={{ __html: text.html }} />
				</p>

				{text.n_1 === 5 || text.n_2 === 5 ?
					<div className="text-meta text-related-passages">
						<ReadingRelatedPassage />
					</div>
					: ''
				}

				{text.n_1 === 5 || text.n_2 === 5 ?
					<div className="text-meta text-entities">
						<ReadingEntity />
					</div>
					: ''
				}

				{text.n_1 === 10 || text.n_2 === 10 ?
					<div className="text-meta text-media">
						<ReadingMedia />
					</div>

				: ''}

				{text.n_1 === 10 || text.n_2 === 10 ?
					<div className="text-meta text-annotations">
						<ReadingAnnotation />
					</div>

				: ''}

			</div>

		);
	},
});
