import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql } from 'react-apollo';
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

	loadMoreWorks() {
		const { offset, limit } = this.props;
		this.props.changeSearchParams({
			offset: offset + limit,
		});
	}

	toggleSearchTerm(key, value) {
		const { filters } = this.props;
		let keyIsInFilter = false;
		let valueIsInFilter = false;
		let filterValueToRemove;
		let filterToRemove;

		filters.forEach((filter, i) => {
			if (filter.key === key) {
				keyIsInFilter = true;

				if (
						key === 'authors'
						&& filter.values.some((existingValue) =>
							existingValue._id === value._id
						)) {
					valueIsInFilter = true;
					filterValueToRemove = filter.values.indexOf(value);
				} else if (filter.values.indexOf(value) >= 0) {
					valueIsInFilter = true;
					filterValueToRemove = filter.values.indexOf(value);
				}

				if (valueIsInFilter) {
					filter.values.splice(filterValueToRemove, 1);
					if (filter.values.length === 0) {
						filterToRemove = i;
					}
				} else {
					filter.values.push(value);
				}
			}
		});


		if (typeof filterToRemove !== 'undefined') {
			filters.splice(filterToRemove, 1);
		}

		if (!keyIsInFilter) {
			filters.push({
				key,
				values: [value],
			});
		}

		this.props.changeSearchParams({
			filters,
			offset: 0,
		});
	}

	handleChangeTextsearch(textsearch) {
		const { filters } = this.props;

		if (textsearch && textsearch.length) {
			let textsearchInFilters = false;

			filters.forEach((filter, i) => {
				if (filter.key === 'textsearch') {
					filters[i].values = [textsearch];
					textsearchInFilters = true;
				}
			});

			if (!textsearchInFilters) {
				filters.push({
					key: 'textsearch',
					values: [textsearch],
				});
			}
		} else {
			let filterToRemove;

			filters.forEach((filter, i) => {
				if (filter.key === 'textsearch') {
					filterToRemove = i;
				}
			});

			if (typeof filterToRemove !== 'undefined') {
				filters.splice(filterToRemove, 1);
			}
		}

		this.props.changeSearchParams({
			filters,
			offset: 0,
		});
	}

	handleChangeDate(e) {
		const { filters } = this.props;

		let dateFromInFilters = false;

		filters.forEach((filter, i) => {
			if (filter.key === 'dateFrom') {
				filters[i].values = [e.from];
				dateFromInFilters = true;
			}
		});

		if (!dateFromInFilters) {
			filters.push({
				key: 'dateFrom',
				values: [e.from],
			});
		} else {
			let filterToRemove;

			filters.forEach((filter, i) => {
				if (filter.key === 'dateFrom') {
					filterToRemove = i;
				}
			});

			if (typeof filterToRemove !== 'undefined') {
				filters.splice(filterToRemove, 1);
			}
		}

		let dateToInFilters = false;

		filters.forEach((filter, i) => {
			if (filter.key === 'dateTo') {
				filters[i].values = [e.to];
				dateToInFilters = true;
			}
		});

		if (!dateToInFilters) {
			filters.push({
				key: 'dateTo',
				values: [e.to],
			});
		} else {
			let filterToRemove;

			filters.forEach((filter, i) => {
				if (filter.key === 'dateTo') {
					filterToRemove = i;
				}
			});

			if (typeof filterToRemove !== 'undefined') {
				filters.splice(filterToRemove, 1);
			}
		}

		this.props.changeSearchParams({
			filters,
			offset: 0,
		});
	}

	toggleLayout(layout) {
		this.setState({
			layout,
		});
	}

	closeSearchModal() {
		this.props.changeSearchParams({ filters: [] });
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
						<SearchFilters
							filters={this.props.filters}
							toggleSearchTerm={this.toggleSearchTerm}
						/>
						<section className="search-results">
							<SearchResultsList
								works={works}
								hasMoreWorks={hasMoreWorks}
								loadMore={this.loadMoreWorks}
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
	changeSearchParams: PropTypes.func.isRequired,
	closeSearchModal: PropTypes.func,
	filters: PropTypes.array,
	limit: PropTypes.number,
	offset: PropTypes.number,
	visible: PropTypes.bool,
	work: PropTypes.object,
};

const withData = graphql(gql`{
  works {
		id
		english_title
		original_title
		slug
		author
		corpus
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
	worksCount
}`, {
  options: ({ filters, offset, limit } ) => {
		const query = {};

		// Parse the filters to the query
		filters.forEach((filter) => {
			const date = moment(`${filter.values[0]}-01-01`, 'YYYY MM DD');
			switch (filter.key) {
			case 'textsearch': {
				query.textsearch = filter.values[0];
				break;
			}

			case 'languages': {
				query.languages = filter.values;
				break;
			}

			case 'corpora': {
				query.corpora = filter.values;
				break;
			}

			case 'authors': {
				const values = [];

				filter.values.forEach((value) => {
					values.push(value.id);
				});

				query.authors = values;
				break;
			}

			case 'dateStart': {
				query.dateBegun = new Date(date.toISOString());
				break;
			}

			case 'dateEnd': {
				query.dateEnded = new Date(date.toISOString());
				break;
			}

			default: {
				// do nothing
				break;
			}
			}
		});

		return {
	    variables: {
				...query,
				limit,
				offset,
			},
		};
  },
  props: ({ data: { works, worksCount, uniqueCorpora, uniqueLanguages } }) => ({
		works, worksCount, uniqueCorpora, uniqueLanguages,
  }),
});

export default withData(SearchModal);
