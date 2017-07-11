import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import LoadingWell from '/imports/ui/components/spinkit/LoadingWell';
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

	textNodesLength = 0
	isLoading = false

	loadMore(direction) {
		if (!this.isLoading) {
			this.isLoading = true;
			this.props.loadMore(direction);
		}
	}

	renderText() {
		const textNodes = this.props.textNodes;

		if (textNodes.length !== this.textNodesLength) {
			// If this isn't working, it's something wrong somewhere else
			this.isLoading = false;
			this.textNodesLength = textNodes.length;
		}

		return textNodes.map((text, index) => {
			let showNumber = false;
			let numbering = '';

			if (text.n_3) {
				if (index === 0) {
					showNumber = true;
				} else {
					showNumber = textNodes[index - 1].n_2 !== text.n_2;
				}
				if (showNumber) {
					numbering = `${text.n_1}.${text.n_2}`;
				}
			} else if (text.n_2) {
				if (index === 0) {
					showNumber = true;
				} else {
					showNumber = textNodes[index - 1].n_1 !== text.n_1;
				}
				if (showNumber) {
					numbering = (text.n_1).toString();
				}
			}

			return (
				<ReadingTextNode
					key={text._id}
					index={index}
					showNumber={showNumber}
					text={text}
					numbering={numbering}
					addAnnotationCheckList={this.addAnnotationCheckList}
					highlight={this.props.highlightId === text._id}
					toggleReadingMeta={this.props.toggleReadingMeta}
					showLoginModal={this.props.showLoginModal}
					showSignupModal={this.props.showSignupModal}
					closeLoginModal={this.props.closeLoginModal}
					closeSignupModal={this.props.closeSignupModal}
				/>
			);
		});
	}

	render() {
		const work = this.props.work;
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
									className={`load-more ${this.isLoading ? 'load-more--loading' : ''}`}
									onClick={this.loadMore.bind(null, 'previous')}
									label={this.isLoading ? 'Loading . . .' : 'Previous'}
								/>
							</div>
						: '' }
						<div className="reading-text-outer">
							{this.renderText()}
						</div>
						{this.props.isTextAfter ?
							<div className="reading-load-more reading-load-more--after">
								<FlatButton
									className={`load-more ${this.isLoading ? 'load-more--loading' : ''}`}
									onClick={this.loadMore.bind(null, 'next')}
									label={this.isLoading ? 'Loading . . .' : 'Next'}
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
