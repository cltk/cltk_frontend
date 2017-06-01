
import React from 'react';
import PropTypes from 'prop-types';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import FlatButton from 'material-ui/FlatButton';
import LoadingWell from '/imports/ui/components/spinkit/LoadingWell';

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
	work: React.PropTypes.object.isRequired,
	textNodes: React.PropTypes.array.isRequired,
	loadMore: React.PropTypes.func.isRequired,
	calculateTextNodeDepths: React.PropTypes.func.isRequired,
	highlightId: React.PropTypes.string,
	toggleReadingMeta: React.PropTypes.func,
	isTextAfter: React.PropTypes.bool,
	isTextBefore: React.PropTypes.bool,
	isLoading: React.PropTypes.bool,
	showLoginModal: React.PropTypes.func,
	showSignupModal: React.PropTypes.func,
	closeLoginModal: React.PropTypes.func,
	closeSignupModal: React.PropTypes.func,
};

ReadingEnvironment.childContextTypes = {
	muiTheme: React.PropTypes.object.isRequired,
};

export default ReadingEnvironment;
