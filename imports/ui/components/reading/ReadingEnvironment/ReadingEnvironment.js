import React from 'react';
// import Annotatable from 'draft-js-annotations';
import PropTypes from 'prop-types';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import LoadingWell from '/imports/ui/components/spinkit/LoadingWell';
import ReadingTextNode from '/imports/ui/components/reading/ReadingTextNode';
import ReadingWorkHeader from '/imports/ui/components/reading/ReadingWorkHeader';

import ReadingEnvironmentPrevButton from '../ReadingEnvironmentPrevButton';
import ReadingEnvironmentNextButton from '../ReadingEnvironmentNextButton';

class ReadingEnvironment extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
		};
	}

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	}

	renderText() {
		const textNodes = this.props.work.text_nodes;

		return textNodes.map((textNode) => {
			let showNumber = false;

			return (
				<ReadingTextNode
					key={textNode.id}
					showNumber={showNumber}
					addAnnotationCheckList={this.addAnnotationCheckList}
					toggleReadingMeta={this.props.toggleReadingMeta}
					showLoginModal={this.props.showLoginModal}
					showSignupModal={this.props.showSignupModal}
					closeLoginModal={this.props.closeLoginModal}
					closeSignupModal={this.props.closeSignupModal}
					{...textNode}
				/>
			);
		});
	}

	render() {
		const { work } = this.props;
		const form = work.form || 'prose';
		const textNodes = work.text_nodes;

		return (
			<div className={`reading-container reading-container--${form}`}>
				<ReadingWorkHeader
					author={work.author}
					englishTitle={work.english_title}
					originalTitle={work.original_title}
				/>

				{textNodes && textNodes.length ?
					<div>
						<ReadingEnvironmentPrevButton
							locationPrev={work.textLocationPrev}
						/>
						<div className="reading-text-outer">
							{this.renderText()}
						</div>
						<ReadingEnvironmentNextButton
							locationNext={work.textLocationNext}
						/>
					</div>
				:
					<LoadingWell />
				}
			</div>
		);
	}

}

ReadingEnvironment.propTypes = {
	work: PropTypes.object.isRequired,
	textNodes: PropTypes.array.isRequired,
	loadMore: PropTypes.func.isRequired,
	highlightId: PropTypes.string,
	toggleReadingMeta: PropTypes.func,
	isLoading: PropTypes.bool,
	showLoginModal: PropTypes.func,
	showSignupModal: PropTypes.func,
	closeLoginModal: PropTypes.func,
	closeSignupModal: PropTypes.func,
};

ReadingEnvironment.childContextTypes = {
	muiTheme: PropTypes.object.isRequired,
};

export default ReadingEnvironment;
