import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import classnames from 'classnames';

import CommentaryPanel from '../../../commentary/components/CommentaryPanel';
import DefinitionsPanel from '../../../definitions/components/DefinitionsPanel';
import ReadingEnvironment from '../../components/ReadingEnvironment';


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
			annotationCheckList: [],
			searchModalVisible: false,
			AuthModalLowered: false,
			modalSignupLowered: false,
			location,
			textNodesDepths: [],
			textsearch: '',
			limit: 21,
			offset: 0,
		};

		autoBind(this);
	}

	loadMorePrev() {
		const { work } = this.props;
		const textLocationPrev = work.text_location_prev;
		this.props.history.push(`/works/${work.id}/${work.slug}/${textLocationPrev.join('.')}`);
	}

	loadMoreNext() {
		const { work } = this.props;
		const textLocationNext = work.text_location_next;
		this.props.history.push(`/works/${work.id}/${work.slug}/${textLocationNext.join('.')}`);
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

	handleChangeTextsearch(newValue) {
		this.setState({
			textsearch: newValue.textsearch,
		});
	}


	showLoginModal() {
		this.setState({
			AuthModalLowered: true,
		});
	}

	showSignupModal() {
		this.setState({
			modalSignupLowered: true,
		});
	}

	closeLoginModal() {
		this.setState({
			AuthModalLowered: false,
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

	loadMore() {
		this.setState({
			limit: this.state.limit + 21,
		});
	}

	renderReadingEnvironment() {
		const { work, textNodes } = this.props;

		// If data is loaded
		if (work && textNodes) {
			return (
				<ReadingEnvironment
					work={work}
					textNodes={textNodes}
					loadMorePrev={this.loadMorePrev}
					loadMoreNext={this.loadMoreNext}
					toggleReadingMeta={this.toggleReadingMeta}
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
							author={this.props.work.author}
							corpus={this.props.work.corpus}
							workId={this.props.work.id}
							workSlug={this.props.work.slug}
							workForm={this.props.work.form}
							englishTitle={this.props.work.english_title}
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
						/>
						<main>
							<div id="reading-environment" className={readingClassName}>
								{this.renderReadingEnvironment()}
							</div>
						</main>
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
						{/*
						<AnnotateWidget
							annotationCheckList={this.state.annotationCheckList}
							work={this.props.work || {}}
							submitAnnotation={this.submitAnnotation}
						/>
						*/}
						<SearchModal
							handleChangeTextsearch={this.handleChangeTextsearch}
							closeSearchModal={this.closeSearchModal}
							visible={this.state.searchModalVisible}
							textsearch={this.state.textsearch}
							loadMore={this.loadMore}
							limit={this.state.limit}
							offset={this.state.offset}
						/>
					</div>
				:
					<div>
						<div className="loading-reading-layout">
						</div>
					</div>
				}
				{this.state.AuthModalLowered ?
					<AuthModal
						lowered={this.state.AuthModalLowered}
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

export default ReadingLayout;
