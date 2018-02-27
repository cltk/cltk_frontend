import React from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router';

import ReadingHeaderContainer from '../../containers/ReadingHeaderContainer';
import Footer from '../../../../components/navigation/Footer';
import CommentaryPanelContainer from '../../../commentary/containers/CommentaryPanelContainer';
import DefinitionsPanelContainer from '../../../definitions/containers/DefinitionsPanelContainer';


class ReadingLayout extends React.Component {
	constructor(props) {
		super(props);

		// TODO: move this to redux store
		this.state = {
			showEntities: false,
			showDefinitions: false,
			showMedia: false,
			showCommentary: false,
			showTranslations: false,
			showAnnotations: false,
			showRelatedPassages: false,
			showScansion: false,
		};
	}

	render() {
		const readingClassName = classnames('clearfix', {
			'with-entities': this.state.showEntities,
			'with-left-panel': this.state.showDefinitions,
			'with-media': this.state.showMedia,
			'with-right-panel': this.state.showCommentary || this.state.showTranslations,
			'with-right-metadata': (
				this.state.showMedia ||
				this.state.showEntities ||
				this.state.showAnnotations ||
				this.state.showRelatedPassages
			),
			'with-scansion': this.state.showScansion,
		});

		return (
			<div className="cltk-layout reading-layout">
				<ReadingHeaderContainer
					params={this.props.router.params}
				/>
				<main className={readingClassName}>
					{this.props.children}
				</main>
				<DefinitionsPanelContainer />
				<CommentaryPanelContainer />
				<Footer />
			</div>
		);
	}
}

export default withRouter(ReadingLayout);
