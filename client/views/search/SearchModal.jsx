SearchModal = React.createClass({

	propTypes: {
		visible: React.PropTypes.bool,
	},

	mixins: [ReactMeteorData],

	getInitialState() {
		return {
			layout: 'grid',
			filters: [],
			skip: 0,
			limit: 12,
		};
	},

	getMeteorData() {
		const query = {};

		return {
			works: Works.find(query, { sort: { author: 1, title: 1 } }).fetch(),
		};
	},

	loadMoreObjects() {
		console.log('SearchModal.loadMoreObjects', this.state.skip + this.state.limit);
		this.setState({
			skip: this.state.skip + this.state.limit,
		});
	},

	toggleSearchTerm(key, value) {
		const filters = this.state.filters;
		let keyIsInFilter = false;
		let valueIsInFilter = false;
		let filterValueToRemove;
		let filterToRemove;

		filters.forEach((filter, i) => {
			if (filter.key === key) {
				keyIsInFilter = true;

				if (filter.values.indexOf(value) >= 0) {
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

		this.setState({
			filters,
			skip: 0,
		});
	},

	handleChangeTextsearch(textsearch) {
		const filters = this.state.filters;

		if (textsearch && textsearch.length) {
			let textsearchInFilters = false;
			console.log(filters);

			filters.forEach((filter, i) => {
				if (filter.key === 'textsearch') {
					filters[i].values = [textsearch];
					textsearchInFilters = true;
				}
			});
			console.log(filters);

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

		this.setState({
			filters,
		});
	},

	handleChangeDate(e) {
		const filters = this.state.filters;

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

		this.setState({
			filters,
		});
	},

	toggleLayout(layout) {
		this.setState({
			layout,
		});
	},


	render() {
		return (
			<div className="cltk-modal search-modal">
				<SearchTools
					filters={this.state.filters}
					toggleSearchTerm={this.toggleSearchTerm}
					handleChangeDate={this.handleChangeDate}
					handleChangeTextsearch={this.handleChangeTextsearch}
				/>

				<section className="search-results">
					<WorksList />

				</section>


			</div>
		);
	},
});
