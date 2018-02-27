import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';

import SearchTools from '../SearchTools';
import SearchResultsList from '../SearchResultsList';

class SearchModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			layout: 'grid',
		};

		autoBind(this);
	}

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	}

	handleChangeTextsearch(textsearch) {
		this.props.handleChangeTextsearch({
			textsearch,
			offset: 0,
			limit: 21,
		});
	}

	toggleLayout(layout) {
		this.setState({
			layout,
		});
	}

	closeSearchModal() {
		this.props.closeSearchModal();
	}

	render() {
		let hasMoreWorks = true;
		const { works, worksCount, limit } = this.props;

		if (works) {
			if (worksCount && worksCount <= works.length) {
				hasMoreWorks = false;
			} else if (works.length < limit) {
				hasMoreWorks = false;
			}
		}

		return (
			<div
				className={`cltk-modal search-modal
				${(this.props.visible ? 'search-modal--visible' : '')}`}
			>
				<div className="close-search">
					<IconButton
						iconClassName={'close-search-icon mdi mdi-close'}
						onClick={this.closeSearchModal}
						onTouchTap={this.closeSearchModal}
					/>
				</div>

				{this.props.visible ?
					<div>
						<SearchTools
							filters={this.props.filters}
							toggleSearchTerm={this.toggleSearchTerm}
							handleChangeDate={this.handleChangeDate}
							handleChangeTextsearch={this.handleChangeTextsearch}
						/>
						<section className="search-results">
							<SearchResultsList
								works={works}
								hasMoreWorks={hasMoreWorks}
								loadMore={this.props.loadMore}
							/>
						</section>
					</div>
					: ''
				}
			</div>
		);
	}
};

SearchModal.childContextTypes = {
	muiTheme: PropTypes.object.isRequired,
};

SearchModal.propTypes = {
	handleChangeTextsearch: PropTypes.func,
	closeSearchModal: PropTypes.func,
	textsearch: PropTypes.string,
	limit: PropTypes.number,
	offset: PropTypes.number,
	visible: PropTypes.bool,
	work: PropTypes.object,
};


export default SearchModal;
