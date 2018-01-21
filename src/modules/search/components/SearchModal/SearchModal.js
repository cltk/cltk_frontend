import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql } from 'react-apollo';
import moment from 'moment';
import autoBind from 'react-autobind';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';

import Authors from '/imports/api/collections/authors';
import Works from '/imports/api/collections/works';

import SearchTools from '/imports/ui/components/search/SearchTools';
import SearchFilters from '/imports/ui/components/search/SearchFilters';
import SearchResultsList from '/imports/ui/components/search/SearchResultsList';

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
	handleChangeTextsearch: PropTypes.func.isRequired,
	closeSearchModal: PropTypes.func,
	textsearch: PropTypes.string,
	limit: PropTypes.number,
	offset: PropTypes.number,
	visible: PropTypes.bool,
	work: PropTypes.object,
};

const withData = graphql(gql`
  query SearchWorksWithTitle($textsearch: String!){
		search_works_by_title(title: $textsearch) {
			id
			english_title
			original_title
			slug
			language {
				title
			}
			author {
				id
				name
			}
			corpus {
				id
				title
				slug
			}
		}
		corpora {
			id
			slug
			title
		}
		languages {
			id
			slug
			title
		}
		works_count
	}`, {
		options: ({ textsearch, limit, offset }) => {
			return {
	    variables: {
		textsearch,
		limit,
		offset,
	},
			};
		},
		props: ({ data: { search_works_by_title, works_count, uniqueCorpora, uniqueLanguages } }) => ({
			works: search_works_by_title,
			worksCount: works_count,
			uniqueCorpora,
			uniqueLanguages,
		}),
	});

export default withData(SearchModal);
