import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';

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
			showEntities: false,
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

	toggleBookmarked() {
		this.setState({
			bookmarked: !this.state.bookmarked,

		});
	},

	toggleShowEntities() {
		this.setState({
			showEntities: !this.state.showEntities,

		});
	},

	toggleShowRelatedPassages() {
		this.setState({
			showRelatedPassages: !this.state.showRelatedPassages,

		});
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

	renderAnnotations() {
		return this.data.annotationList.map((annotation, i) => (
			<AnnotationItem
				key={i}
				annotation={annotation}
			/>
		));
	},

	render() {
		const styles = {
			checkbox: {
				display: 'inline-block',
				width: 'auto',
			},
		};
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

		return (
			<div className={textClasses} data-id={text._id} data-num={this.props.index}>
				<div className="text-left-header">
					<h2>{numbering}</h2>
					<i className="text-bookmark mdi mdi-bookmark" />
				</div>
				<div className="text-meta-options">
					<IconButton
						className="text-meta-button"
						onClick={this.toggleBookmark}
						style={styles.checkbox}
						iconClassName="mdi mdi-bookmark"
						tooltip="Bookmark"
						tooltipPosition="top-center"
					/>
					<IconButton
						className="text-meta-button"
						onClick={this.showAnnotations}
						style={styles.checkbox}
						iconClassName="mdi mdi-comment-text-outline"
						tooltip="Annoations"
						tooltipPosition="top-center"
					/>
					<IconButton
						className="text-meta-button"
						onClick={this.showRelatedPassages}
						style={styles.checkbox}
						iconClassName="mdi mdi-information-variant"
						tooltip="Related Passages"
						tooltipPosition="top-center"
					/>
				</div>
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

				<div className="text-meta text-related-passages">
					<div className="related-passage">
						<span className="related-passage-edition">1920, A. S. F. Gow</span>
						<a href="#passage" className="related-passage-ref paper-link">
							<h4 >Theocritus, Idylls 17.2-3</h4>
						</a>
						<div className="related-passage-lemma">
							<p>ἄλλοκα δ’ αὖ ποτὶ τὸν ῥιπτεῖ νόον· οἳ δ’ ὑπ’ ἔρωτος</p>
							<p>δηθὰ κυλοιδιόωντες ἐτώσια μοχθίζοντι.</p>

						</div>

					</div>

				</div>
				<div className="text-meta text-entities">
					<div className="entity-teaser">
						<a href="#thumbnail" className="entity-thumbnail-image image-wrap paper-shadow">
							<img alt="thumbnail" src="/images/entities/herodotus_thumbnail.jpg" />
						</a>
						<div className="entity-description">
							<a href="#entity" className="entity-name ">
								<h4 >Herodotus</h4>
							</a>
							<span className="entity-bio">
								Herodotus was a Greek historian who was born in Halicarnassus
								Caria and lived in the 5th century BC, a contemporary of Socrates ...
							</span>

							<div className="entity-meta">
								<a
									href="#references"
									className="entity-meta-link entity-additional-refernces entity-action "
								>
									<span>76 other references</span>
								</a>
								<a href="#associated-media" className="entity-meta-link entity-media entit-action ">
									<span>8 associated media</span>
								</a>

							</div>
						</div>

					</div>
					<div className="entity-teaser">
						<a href="#thumbnail" className="entity-thumbnail-image image-wrap paper-shadow">
							<img alt="thumbnail" src="/images/entities/halicarnassus_thumbnail.jpg" />
						</a>
						<div className="entity-description">
							<a href="#entity" className="entity-name ">
								<h4 >Halicarnassus</h4>
							</a>
							<span className="entity-bio">
								Halicarnassus was an ancient Greek city at the site of modern Bodrum in Turkey.
								It is located in southwest Caria on a picturesque ...
							</span>

							<div className="entity-meta">
								<a
									href="#references"
									className="entity-meta-link entity-additional-refernces entity-action "
								>
									<span>24 other references</span>
								</a>
								<a
									href="#associated-media"
									className="entity-meta-link entity-media entity-action "
								>
									<span>3 associated media</span>
								</a>

							</div>

						</div>

					</div>

				</div>

			</div>

		);
	},
});
