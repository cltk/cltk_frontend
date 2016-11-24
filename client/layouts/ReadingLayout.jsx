import debounce from 'throttle-debounce/debounce';
import LoadingDoubleWell from '/imports/spinkit/client/LoadingDoubleWell';

ReadingLayout = React.createClass({

	propTypes: {
		params: React.PropTypes.object.isRequired,
		queryParams: React.PropTypes.object.isRequired,
	},

	mixins: [ReactMeteorData],

	getInitialState() {
		const queryParams = this.props.queryParams;
		let location = [];

		if ('location' in queryParams) {
			location = queryParams.location.split('.');
			location.forEach((textN, i) => {
				location[i] = parseInt(textN, 10);
			});
		}

		return {
			toggleCommentary: false,
			toggleDefinitions: false,
			toggleTranslations: false,
			toggleScansion: false,
			toggleMedia: false,
			toggleEntities: false,
			toggleAnnotations: false,
			toggleRelatedPassages: false,
			filters: [],
			limit: 30,
			annotationCheckList: [],
			searchModalVisible: false,
			modalLoginLowered: false,
			modalSignupLowered: false,
			location,
		};
	},

	componentDidMount() {
		window.addEventListener('resize', this.calculateTextNodeDepths);
		window.addEventListener('scroll', debounce(100, this.handleScroll));
	},

	componentDidUpdate() {
		if (this.textNodesDepths.length !== this.textNodes.length) {
			this.calculateTextNodeDepths();
		}
	},

	getMeteorData() {
		const workQuery = {
			_id: new Meteor.Collection.ObjectID(this.props.params.id),
		};
		const textLocation = this.state.location;
		let query = {};
		let textNodes = [];
		let work = null;
		let attachment = null;

		Meteor.subscribe('workSingle', workQuery);
		work = Works.findOne();

		if (work) {
			// Get the work authors
			work.authors = Authors.find({ _id: { $in: work.authors } }).fetch();

			// Get the work cover image
			if ('coverImage' in work) {
				Meteor.subscribe('images');
				attachment = Images.findOne(work.coverImage);
			}
		}

		/*
		* Set the query
		*/
		query = {
			work: new Meteor.Collection.ObjectID(this.props.params.id),
		};

		/*
		 * This needs much more attention for a simpler solution in the future.
		 */
		if (textLocation.length === 5) {
			query.n_5 = { $gte: textLocation[4] };
		}
		if (textLocation.length >= 4) {
			query.n_4 = { $gte: textLocation[3] };
		}
		if (textLocation.length >= 3) {
			query.n_3 = { $gte: textLocation[2] };
		}
		if (textLocation.length >= 2) {
			query.n_2 = { $gte: textLocation[1] };
		}
		if (textLocation.length >= 1) {
			query.n_1 = { $gte: textLocation[0] };
		}

		Meteor.subscribe('textNodes', query, this.state.limit);
		textNodes = Texts.find(query).fetch();

		return {
			work,
			attachment,
			textNodes,
		};
	},

	textNodes: [],
	textNodesDepths: [],
	isTextAfter: true,
	isTextBefore: false,

	loadMore(direction) {
		const textNodes = this.textNodes;
		const work = this.data.work;
		let textLocation = this.state.location;
		let locationUpdated = false;

		if (direction === 'next') {
			// Bump query for each nested level of the document structure if need be
			if ('rangeN5' in work) {
				if (work.rangeN5.high === textNodes[textNodes.length - 1].n_5) {
					textLocation[3]++;
					textLocation[4] = 1;
				} else {
					textLocation[4] += this.state.limit;
					locationUpdated = true;
				}
			}
			if ('rangeN4' in work && !locationUpdated) {
				if (work.rangeN4.high === textNodes[textNodes.length - 1].n_4) {
					textLocation[2]++;
					textLocation[3] = 1;
				} else {
					textLocation[3] += this.state.limit;
					locationUpdated = true;
				}
			}
			if ('rangeN3' in work && !locationUpdated) {
				if (work.rangeN3.high === textNodes[textNodes.length - 1].n_3) {
					textLocation[1]++;
					textLocation[2] = 1;
				} else {
					textLocation[2] += this.state.limit;
					locationUpdated = true;
				}
			}
			if ('rangeN2' in work && !locationUpdated) {
				if (work.rangeN2.high === textNodes[textNodes.length - 1].n_2) {
					textLocation[0]++;
					textLocation[1] = 1;
				} else {
					textLocation[1] += this.state.limit;
					locationUpdated = true;
				}
			}
			if ('rangeN1' in work && !locationUpdated) {
				textLocation[0] += this.state.limit;
				locationUpdated = true;
			}

			this.setState({
				location: textLocation,
			});
		} else if (direction === 'previous') {
			textLocation[textLocation.length - 1] = textLocation[textLocation.length - 1] - 60;
			if (textLocation[textLocation.length - 1] < 1) {
				textLocation[textLocation.length - 1] = 1;

				if (textLocation[textLocation.length - 2]) {
					textLocation[textLocation.length - 2] = textLocation[textLocation.length - 2] - 1;
					if (textLocation[textLocation.length - 2] < 1) {
						if (textLocation[textLocation.length - 3]) {
							textLocation[textLocation.length - 3] = textLocation[textLocation.length - 3] - 1;
							if (textLocation[textLocation.length - 3] < 1) {
								if (textLocation[textLocation.length - 4]) {
									textLocation[textLocation.length - 4] = textLocation[textLocation.length - 4] - 1;
									if (textLocation[textLocation.length - 4] < 1) {
										if (textLocation[textLocation.length - 5]) {
											textLocation[textLocation.length - 5] = textLocation[textLocation.length - 5] - 1;
										}
									}
								}
							}
						}
					}
				}
			}

			this.setState({
				location: textLocation,
			});
		}
	},

	checkIfTextBefore() {
		this.isTextBefore = true;

		if ('n_5' in this.textNodes[0]) {
			this.textNodes.forEach((textNode) => {
				if (textNode.n_5 === 1) {
					this.isTextBefore = false;
				}
			})
		} else if ('n_4' in this.textNodes[0]) {
			this.textNodes.forEach((textNode) => {
				if (textNode.n_4 === 1) {
					this.isTextBefore = false;
				}
			})
		} else if ('n_3' in this.textNodes[0]) {
			this.textNodes.forEach((textNode) => {
				if (textNode.n_3 === 1) {
					this.isTextBefore = false;
				}
			})
		} else if ('n_2' in this.textNodes[0]) {
			this.textNodes.forEach((textNode) => {
				if (textNode.n_2 === 1) {
					this.isTextBefore = false;
				}
			})
		} else if ('n_1' in this.textNodes[0]) {
			this.textNodes.forEach((textNode) => {
				if (textNode.n_1 === 1) {
					this.isTextBefore = false;
				}
			});
		}
	},

	checkIfTextAfter() {
		const work = this.data.work;
		const textNodes = this.textNodes;

		if ('rangeN5' in work) {
			if (
				work.rangeN5.high === textNodes[textNodes.length - 1].n_5
			&& work.rangeN4.high === textNodes[textNodes.length - 1].n_4
			&& work.rangeN3.high === textNodes[textNodes.length - 1].n_3
			&& work.rangeN2.high === textNodes[textNodes.length - 1].n_2
			&& work.rangeN1.high === textNodes[textNodes.length - 1].n_1
			) {
				this.isTextAfter = false;
			} else {
				this.isTextAfter = true;
			}
		} else if ('rangeN4' in work) {
			if (
				work.rangeN4.high === textNodes[textNodes.length - 1].n_4
			&& work.rangeN3.high === textNodes[textNodes.length - 1].n_3
			&& work.rangeN2.high === textNodes[textNodes.length - 1].n_2
			&& work.rangeN1.high === textNodes[textNodes.length - 1].n_1
			) {
				this.isTextAfter = false;
			} else {
				this.isTextAfter = true;
			}
		} else if ('rangeN3' in work) {
			if (
				work.rangeN3.high === textNodes[textNodes.length - 1].n_3
			&& work.rangeN2.high === textNodes[textNodes.length - 1].n_2
			&& work.rangeN1.high === textNodes[textNodes.length - 1].n_1
			) {
				this.isTextAfter = false;
			} else {
				this.isTextAfter = true;
			}
		} else if ('rangeN2' in work) {
			if (
				work.rangeN2.high === textNodes[textNodes.length - 1].n_2
			&& work.rangeN1.high === textNodes[textNodes.length - 1].n_1
			) {
				this.isTextAfter = false;
			} else {
				this.isTextAfter = true;
			}
		} else if (
				work.rangeN1.high === textNodes[textNodes.length - 1].n_1
		) {
			this.isTextAfter = false;
		} else {
			this.isTextAfter = true;
		}
	},

	calculateTextNodeDepths() {
		const $textNodes = $('.text-node');
		const textNodesDepths = [];

		$textNodes.each((i, textNode) => {
			textNodesDepths.push({
				depth: $(textNode).offset().top,
				location: textNode.dataset.loc,
			});
		});

		this.textNodesDepths = textNodesDepths;
	},

	handleScroll() {
		const scrollY = window.scrollY;
		let activeTextNode = null;
		this.textNodesDepths.forEach((textNodeDepth) => {
			if (scrollY > textNodeDepth.depth) {
				activeTextNode = textNodeDepth;
			}
		});

		if (!activeTextNode) {
			activeTextNode = this.textNodesDepths[0];
		}

		if (
			'location' in this.props.queryParams
			&& activeTextNode.location !== this.props.queryParams.location
		) {
			FlowRouter.setQueryParams({ location: activeTextNode.location });
		}
	},

	toggleSidePanel(metadata) {
		if (metadata === 'definitions') {
			const toggle = !this.state.toggleDefinitions;
			this.setState({
				toggleDefinitions: toggle,
			});
		}
		if (metadata === 'commentary') {
			const toggle = !this.state.toggleCommentary;
			this.setState({
				toggleCommentary: toggle,
			});
		}
		if (metadata === 'translations') {
			const toggle = !this.state.toggleTranslations;
			this.setState({
				toggleTranslations: toggle,
			});
		}
		if (metadata === 'entities') {
			const toggle = !this.state.toggleEntities;
			this.setState({
				toggleEntities: toggle,
			});
		}
		if (metadata === 'media') {
			const toggle = !this.state.toggleMedia;
			this.setState({
				toggleMedia: toggle,
			});
		}
		if (metadata === 'scansion') {
			const toggle = !this.state.toggleScansion;
			this.setState({
				toggleScansion: toggle,
			});
		}
	},


	addAnnotationCheckList(textNodeId, isChecked) {
		const annotationCheckList = this.state.annotationCheckList;
		if (isChecked) {
			annotationCheckList.push(textNodeId);
		} else {
			const index = annotationCheckList.indexOf(textNodeId);
			if (index > -1) {
				annotationCheckList.splice(index, 1);
			}
		}
		this.setState({
			annotationCheckList,
		});
	},


	resetAnnotationCheckList() {
		this.setState({
			annotationCheckList: [],
		});
	},

	showSearchModal() {
		this.setState({
			searchModalVisible: true,
		});
	},

	closeSearchModal() {
		this.setState({
			searchModalVisible: false,
		});
	},

	showLoginModal() {
		this.setState({
			modalLoginLowered: true,
		});
	},
	showSignupModal() {
		this.setState({
			modalSignupLowered: true,
		});
	},
	closeLoginModal() {
		this.setState({
			modalLoginLowered: false,
		});
	},
	closeSignupModal() {
		this.setState({
			modalSignupLowered: false,
		});
	},

	toggleReadingMeta(metaType) {
		if (metaType === 'annotations') {
			this.setState({
				toggleAnnotations: !this.state.toggleAnnotations,
			});
		} else if (metaType === 'relatedPassages') {
			this.setState({
				toggleRelatedPassages: !this.state.toggleRelatedPassages,
			});
		}
	},

	renderReadingEnvironment() {
		const self = this;
		const work = this.data.work;
		const textNodes = this.textNodes;

		// Set default location when textNodes are available
		if (
				work
			&& textNodes.length === 0
			&& this.state.location.length === 0
		) {
			if ('rangeN5' in work) {
				textLocation = [1, 1, 1, 1, 1];
			} else if ('rangeN4' in work) {
				textLocation = [1, 1, 1, 1];
			} else if ('rangeN3' in work) {
				textLocation = [1, 1, 1];
			} else if ('rangeN2' in work) {
				textLocation = [1, 1];
			} else {
				textLocation = [1];
			}

			this.setState({
				location: textLocation,
			});
			FlowRouter.setQueryParams({
				location: textLocation.join('.'),
			});
		}

		// Deduplicate text response data
		if (this.data.textNodes.length) {
			this.data.textNodes.forEach(textNode => {
				if (
					!self.textNodes.some(existingTextNode =>
						existingTextNode._id === textNode._id
					)
				) {
					let isInTextNodes = false;

					if ('n_5' in textNode) {
						textNodes.forEach((existingTextNode) => {
							if (
								existingTextNode.n_5 === textNode.n_5
							&& existingTextNode.n_4 === textNode.n_4
							&& existingTextNode.n_3 === textNode.n_3
							&& existingTextNode.n_2 === textNode.n_2
							&& existingTextNode.n_1 === textNode.n_1
							) {
								isInTextNodes = true;
							}
						});
					} else if ('n_4' in textNode) {
						textNodes.forEach((existingTextNode) => {
							if (
								existingTextNode.n_4 === textNode.n_4
							&& existingTextNode.n_3 === textNode.n_3
							&& existingTextNode.n_2 === textNode.n_2
							&& existingTextNode.n_1 === textNode.n_1
							) {
								isInTextNodes = true;
							}
						});
					} else if ('n_3' in textNode) {
						textNodes.forEach((existingTextNode) => {
							if (
								existingTextNode.n_3 === textNode.n_3
							&& existingTextNode.n_2 === textNode.n_2
							&& existingTextNode.n_1 === textNode.n_1
							) {
								isInTextNodes = true;
							}
						});
					} else if ('n_2' in textNode) {
						textNodes.forEach((existingTextNode) => {
							if (
								existingTextNode.n_2 === textNode.n_2
							&& existingTextNode.n_1 === textNode.n_1
							) {
								isInTextNodes = true;
							}
						});
					} else {
						textNodes.forEach((existingTextNode) => {
							if (
								existingTextNode.n_1 === textNode.n_1
							) {
								isInTextNodes = true;
							}
						});
					}

					if (!isInTextNodes) {
						self.textNodes.push(textNode);
					}
				}
			});

			if (this.textNodes.length) {
				if ('n_5' in this.textNodes[0]) {
					this.textNodes.sort((a, b) => {
						if (a.n_5 < b.n_5) return -1;
						if (a.n_5 > b.n_5) return 1;
						return 0;
					});
				} else if ('n_4' in this.textNodes[0]) {
					this.textNodes.sort((a, b) => {
						if (a.n_4 < b.n_4) return -1;
						if (a.n_4 > b.n_4) return 1;
						return 0;
					});
				} else if ('n_3' in this.textNodes[0]) {
					this.textNodes.sort((a, b) => {
						if (a.n_3 < b.n_3) return -1;
						if (a.n_3 > b.n_3) return 1;
						return 0;
					});
				} else if ('n_2' in this.textNodes[0]) {
					this.textNodes.sort((a, b) => {
						if (a.n_2 < b.n_2) return -1;
						if (a.n_2 > b.n_2) return 1;
						return 0;
					});
				} else if ('n_1' in this.textNodes[0]) {
					this.textNodes.sort((a, b) => {
						if (a.n_1 < b.n_1) return -1;
						if (a.n_1 > b.n_1) return 1;
						return 0;
					});
				}
			}
		}


		// Update the textBefore / textAfter values
		if(
			work
		&& this.textNodes.length
		) {
			this.checkIfTextBefore();
			this.checkIfTextAfter();
		}

		// If data is loaded
		if (work && textNodes) {
			return (
				<ReadingEnvironment
					work={work}
					textNodes={textNodes}
					loadMore={this.loadMore}
					highlightId={this.props.queryParams.id}
					calculateTextNodeDepths={this.calculateTextNodeDepths}
					toggleReadingMeta={this.toggleReadingMeta}
					isTextBefore={this.isTextBefore}
					isTextAfter={this.isTextAfter}
					showLoginModal={this.showLoginModal}
					showSignupModal={this.showSignupModal}
					closeLoginModal={this.closeLoginModal}
					closeSignupModal={this.closeSignupModal}
				/>
			);
		}
		return null;
	},

	render() {

		let readingClassName = 'clearfix';
		if (
				this.state.toggleCommentary
			|| this.state.toggleTranslations
		) {
			readingClassName += ' with-right-panel';
		} else if (
				this.state.toggleMedia
			|| this.state.toggleEntities
			|| this.state.toggleAnnotations
			|| this.state.toggleRelatedPassages
		) {
			readingClassName += ' with-right-metadata';
		}

		if (this.state.toggleMedia) {
			readingClassName += ' with-media';
		}

		if (this.state.toggleEntities) {
			readingClassName += ' with-entities';
		}

		if (this.state.toggleScansion) {
			readingClassName += ' with-scansion';
		}

		if (this.state.toggleDefinitions) {
			readingClassName += ' with-left-panel';
		}

		return (
			<div className="cltk-layout reading-layout">
				{this.data.work ?
					<div>
						<HeaderReading
							work={this.data.work}
							showSearchModal={this.showSearchModal}
							toggleSidePanel={this.toggleSidePanel}
							toggleDefinitions={this.state.toggleDefinitions}
							toggleCommentary={this.state.toggleCommentary}
							toggleTranslations={this.state.toggleTranslations}
							toggleScansion={this.state.toggleScansion}
							toggleMedia={this.state.toggleMedia}
							toggleEntities={this.state.toggleEntities}
							toggleAnnotations={this.state.toggleAnnotations}
						/>

						<main>
							<div id="reading-environment" className={readingClassName}>
								{this.renderReadingEnvironment()}
							</div>
						</main>

						{/* <AnnotateWidget />*/}

						<DefinitionsPanel
							toggleDefinitions={this.state.toggleDefinitions}
							textNodes={this.data.textNodes}
						/>

						<CommentaryPanel
							toggleCommentary={this.state.toggleCommentary}
							toggleTranslations={this.state.toggleTranslations}
							work={(this.data.work && 'title' in this.data.work) ? this.data.work.title : ''}
							textNodes={this.data.textNodes}
						/>

						<AnnotateWidget
							annotationCheckList={this.state.annotationCheckList}
							work={this.data.work || {}}
							submitAnnotation={this.submitAnnotation}
						/>

						<SearchModal
							work={this.data.work}
							visible={this.state.searchModalVisible}
							closeSearchModal={this.closeSearchModal}
						/>
					</div>
				:
					<div>
						<div className="loading-reading-layout">
							<LoadingDoubleWell />
						</div>
					</div>
				}
				{this.state.modalLoginLowered ?
					<ModalLogin
						lowered={this.state.modalLoginLowered}
						closeModal={this.closeLoginModal}
					/>
					: ''
				}
				{this.state.modalSignupLowered ?
					<ModalSignup
						lowered={this.state.modalSignupLowered}
						closeModal={this.closeSignupModal}
					/>
					: ''
				}
			</div>
		);
	},

});
