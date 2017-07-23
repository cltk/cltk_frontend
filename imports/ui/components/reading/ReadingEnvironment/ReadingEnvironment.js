import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import LoadingWell from '/imports/ui/components/spinkit/LoadingWell';
import ReadingTextNode from '/imports/ui/components/reading/ReadingTextNode';
import ReadingWorkHeader from '/imports/ui/components/reading/ReadingWorkHeader';

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
		const { textNodes } = this.props;

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

		return (
			<div className={`reading-container reading-container--${form}`}>
				<ReadingWorkHeader
					work={work}
				/>

				{this.props.textNodes.length ?
					<div>
						{this.props.isTextBefore ?
							<div className="reading-load-more reading-load-more--before">
								<FlatButton
									className={`load-more ${this.state.isLoading ? 'load-more--loading' : ''}`}
									onClick={this.props.loadMore.bind(this, 'previous')}
									label={this.state.isLoading ? 'Loading . . .' : 'Previous'}
								/>
							</div>
						: '' }
						<div className="reading-text-outer">
							{this.renderText()}
						</div>
						{this.props.isTextAfter ?
							<div className="reading-load-more reading-load-more--after">
								<FlatButton
									className={`load-more ${this.state.isLoading ? 'load-more--loading' : ''}`}
									onClick={this.props.loadMore.bind(this, 'next')}
									label={this.state.isLoading ? 'Loading . . .' : 'Next'}
								/>
							</div>
						: '' }
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
	calculateTextNodeDepths: PropTypes.func.isRequired,
	highlightId: PropTypes.string,
	toggleReadingMeta: PropTypes.func,
	isTextAfter: PropTypes.bool,
	isTextBefore: PropTypes.bool,
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
