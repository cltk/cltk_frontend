import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import debounce from 'throttle-debounce/debounce';
import { createContainer } from 'meteor/react-meteor-data';

import Utils from '/imports/lib/utils';
import Authors from '/imports/api/collections/authors';
import TextNodes from '/imports/api/collections/textNodes';
import Works from '/imports/api/collections/works';

import AnnotateWidget from '/imports/ui/components/annotations/AnnotateWidget';
import CommentaryPanel from '/imports/ui/components/commentary/CommentaryPanel';
import DefinitionsPanel from '/imports/ui/components/definitions/DefinitionsPanel';
import HeaderReading from '/imports/ui/components/header/HeaderReading';
import LoadingDoubleWell from '/imports/ui/components/spinkit/LoadingDoubleWell';
import ReadingEnvironment from '/imports/ui/components/reading/ReadingEnvironment';
import SearchModal from '/imports/ui/components/search/SearchModal';

class ReadingLayout extends React.Component {
	static defaultProps = {
		textNodes: [],
	}

	static propTypes = {
		params: PropTypes.object.isRequired,
		queryParams: PropTypes.object.isRequired,
		textNodes: PropTypes.array,
	}

	constructor(props) {
		super(props);

		const queryParams = props.queryParams;
		let location = [];

		if ('location' in queryParams) {
			location = queryParams.location.split('.');
			location.forEach((textN, i) => {
				location[i] = parseInt(textN, 10);
			});
		}

		this.state = {
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
			textNodesDepths: [],
			isTextAfter: true,
			isTextBefore: false,
		};

		autoBind(this);
	}

	componentDidMount() {
		window.addEventListener('resize', this.calculateTextNodeDepths);
		window.addEventListener('scroll', debounce(100, this.handleScroll));
	}

	loadMore(direction) {
		const { textNodes, work } = this.props;
		let textLocation = this.props.location || [];

		if (direction === 'next') {
			// Bump query for each nested level of the document structure if need be

			this.setState({
				location: textLocation,
			});
		} else if (direction === 'previous') {
			// Decrement the final number in the textLocation by the state limit
			textLocation[textLocation.length - 1] = textLocation[textLocation.length - 1] - this.state.limit;

			this.setState({
				location: textLocation,
			});
		}
	}

	calculateTextNodeDepths() {
		const $textNodes = $('.text-node');
		const textNodesDepths = [];

		$textNodes.each((i, textNode) => {
			textNodesDepths.push({
				depth: $(textNode).offset().top,
				location: textNode.dataset.loc,
			});
		});
	}

	handleScroll() {
		const scrollY = window.scrollY;
		let activeTextNode = null;
		const textNodesDepths = [];

		textNodesDepths.forEach((textNodeDepth) => {
			if (scrollY > textNodeDepth.depth) {
				activeTextNode = textNodeDepth;
			}
		});

		if (!activeTextNode) {
			activeTextNode = this.textNodesDepths[0];
		}

		if (
			activeTextNode
			&& 'location' in this.props.queryParams
			&& activeTextNode.location !== this.props.queryParams.location
		) {
			FlowRouter.withReplaceState(() => {
				FlowRouter.setQueryParams({ location: activeTextNode.location });
			});
		}
	}

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
	}

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
	}

	resetAnnotationCheckList() {
		this.setState({
			annotationCheckList: [],
		});
	}

	showSearchModal() {
		this.setState({
			searchModalVisible: true,
		});
	}

	closeSearchModal() {
		this.setState({
			searchModalVisible: false,
		});
	}

	showLoginModal() {
		this.setState({
			modalLoginLowered: true,
		});
	}

	showSignupModal() {
		this.setState({
			modalSignupLowered: true,
		});
	}

	closeLoginModal() {
		this.setState({
			modalLoginLowered: false,
		});
	}

	closeSignupModal() {
		this.setState({
			modalSignupLowered: false,
		});
	}

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
	}

	renderReadingEnvironment() {
		const self = this;
		const { work, textNodes } = this.props;
		let textLocation = this.props.location || [];

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
	}

	render() {
		const readingClassName = classnames('clearfix', {
			'with-entities': this.state.toggleEntities,
			'with-left-panel': this.state.toggleDefinitions,
			'with-media': this.state.toggleMedia,
			'with-right-panel': this.state.toggleCommentary || this.state.toggleTranslations,
			'with-right-metadata': (
				this.state.toggleMedia ||
				this.state.toggleEntities ||
				this.state.toggleAnnotations ||
				this.state.toggleRelatedPassages
			),
			'with-scansion': this.state.toggleScansion,
		});

		return (
			<div className="cltk-layout reading-layout">
				{this.props.work ?
					<div>
						<HeaderReading
							work={this.props.work}
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
							textNodes={this.props.textNodes}
						/>
						<CommentaryPanel
							toggleCommentary={this.state.toggleCommentary}
							toggleTranslations={this.state.toggleTranslations}
							work={(this.props.work && 'title' in this.props.work) ? this.props.work.title : ''}
							textNodes={this.props.textNodes}
						/>
						<AnnotateWidget
							annotationCheckList={this.state.annotationCheckList}
							work={this.props.work || {}}
							submitAnnotation={this.submitAnnotation}
						/>
						<SearchModal
							changeSearchParams={() => console.log('search params changed -- noop')}
							closeSearchModal={this.closeSearchModal}
							visible={this.state.searchModalVisible}
							work={this.props.work}
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
	}
}

const ReadingLayoutContainer = createContainer(props => {
	const workQuery = {
		_id: new Meteor.Collection.ObjectID(props.params.id),
	};
	const textLocation = (props.queryParams.location || '').split('.').map(n => parseInt(n, 10));
	const work = Works.findOne(workQuery);

	let attachment = null;

	Meteor.subscribe('workSingle', workQuery);

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
	const query = {
		work: new Meteor.Collection.ObjectID(props.params.id),
	};


	Meteor.subscribe('textNodes', query, props.limit || 0);
	const textNodes = TextNodes.find(query).fetch();

	return {
		work,
		attachment,
		textNodes,
	};
}, ReadingLayout);

export default ReadingLayoutContainer;
