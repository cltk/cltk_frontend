import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import debounce from 'throttle-debounce/debounce';
import { graphql, gql } from 'react-apollo';

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
		id: PropTypes.number,
		slug: PropTypes.number,
		textNodes: PropTypes.array,
	}

	constructor(props) {
		super(props);
		let location = [];


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
			searchParams: {
				filters: [],
				limit: 21,
				offset: 0,
			},
		};

		autoBind(this);
	}

	componentDidMount() {
		window.addEventListener('resize', this.calculateTextNodeDepths);
		window.addEventListener('scroll', debounce(100, this.handleScroll));
	}

	loadMore(direction) {
		const { textNodes, work, textLocationNext, textLocationPrev } = this.props;

		if (direction === 'next') {
			this.props.history.push(`/works/${work.id}/${work.slug}/${textLocationNext.join('.')}`);
		} else {
			this.props.history.push(`/works/${work.id}/${work.slug}/${textLocationPrev.join('.')}`);
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
		this.setState({
			textNodesDepths,
		})
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
			activeTextNode = this.state.textNodesDepths[0];
		}

		if (
			activeTextNode
			&& 'location' in this.props.queryParams
			&& activeTextNode.location !== this.props.queryParams.location
		) {
			/*
			FlowRouter.withReplaceState(() => {
				FlowRouter.setQueryParams({ location: activeTextNode.location });
			});
			*/
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

	changeSearchParams(searchParams) {
		this.setState({
			...this.state.searchParams,
			...searchParams
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
		const { work, textNodes, textLocationPrev, textLocationNext } = this.props;
		let textLocation = this.props.location || [];

		// If data is loaded
		if (work && textNodes) {
			return (
				<ReadingEnvironment
					work={work}
					textNodes={textNodes}
					loadMore={this.loadMore}
					calculateTextNodeDepths={this.calculateTextNodeDepths}
					toggleReadingMeta={this.toggleReadingMeta}
					textLocationPrev={textLocationPrev}
					textLocationNext={textLocationNext}
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

		console.log(this.props);

		return (
			<div className="cltk-layout reading-layout">
				{this.props.work ?
					<div>
						{/*}<HeaderReading
							work={this.props.work}
							loc={this.props.match.params.loc}
							showSearchModal={this.showSearchModal}
							toggleSidePanel={this.toggleSidePanel}
							toggleDefinitions={this.state.toggleDefinitions}
							toggleCommentary={this.state.toggleCommentary}
							toggleTranslations={this.state.toggleTranslations}
							toggleScansion={this.state.toggleScansion}
							toggleMedia={this.state.toggleMedia}
							toggleEntities={this.state.toggleEntities}
							toggleAnnotations={this.state.toggleAnnotations}
						/>*/}
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
							changeSearchParams={this.changeSearchParams}
							closeSearchModal={this.closeSearchModal}
							visible={this.state.searchModalVisible}
							{...this.state.searchParams}
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

const withData = graphql(gql`
	query TextForReadingEnv($workId: ID!, $loc: [Int]) {
		work_by_id(id: $workId) {
			id
			slug
			original_title
			english_title
			text_nodes_by_location(location: $loc) {
				id
				index
				location
				text
			}
		}
	}
`, {
  options: ({ match: { params } }) => {
		const workId = params.id;
		const loc = params.loc ?
								params.loc.split('.')
								: null ;

		loc.forEach((n, i) => {
			loc[i] = parseInt(n, 10);
		});

		return {
	    variables: {
				workId,
				loc,
			},
		};
	},
  props: ({ data }) => {
		return {
			work: data.work_by_id,
			textLocationPrev: data.textLocationPrev,
			textLocationNext: data.textLocationNext,
		};
  },
});

export default withData(ReadingLayout);
