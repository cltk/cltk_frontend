import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import IconButton from 'material-ui/IconButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


SearchModal = React.createClass({

	propTypes: {
		closeSearchModal: React.PropTypes.func,
		visible: React.PropTypes.bool,
	},

	mixins: [ReactMeteorData],

	childContextTypes: {
		muiTheme: React.PropTypes.object.isRequired,
	},

	getInitialState() {
		return {
			layout: 'grid',
			filters: [],
			skip: 0,
			limit: 12,
		};
	},

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	},


	getMeteorData() {
		const query = {};
		let works = [];
		let stillMoreWorks = true;

		// Parse the filters to the query
		this.state.filters.forEach((filter) => {
			const date = moment(`${filter.values[0]}-01-01`, 'YYYY MM DD');
			switch (filter.key) {
			case 'textsearch':
				query.$text = { $search: filter.values[0] };
				break;

			case '':
				query.$or = [{$where: "this.miradorLink && this.miradorLink.length > 0"}, {hasImageViewer: true}];
				break;

			case 'scribes':
				query.scribe = { $in: filter.values };
				break;

			case 'illuminators':
				query.illuminator = { $in: filter.values };
				break;

			case 'institutions':
				query.institution = { $in: filter.values };
				break;

			case 'places':
				query.place = { $in: filter.values };
				break;

			case 'dateFrom':
				query.dateBegun = { $gte: new Date(date.toISOString()) };
				break;

			case 'dateTo':
				query.dateEnded = { $lte: new Date(date.toISOString()) };
				break;
			default:
				// do nothing
			}
		});

		console.log('Works query:', query);
		const handle = Meteor.subscribe('works', query, this.props.skip, this.props.limit);
		if (handle.ready()) {
			works = Works.find({}, {}).fetch();
			/*
			objects.forEach((object, i) => {
				const imageSubscription = Meteor.subscribe('objectImages', object.slug);
				if (imageSubscription.ready()) {
					objects[i].images = Images.find({}).fetch();
					objects[i].thumbnails = Thumbnails.find({}).fetch();
				}
			});
			*/

			if (works.length < this.props.limit) {
				stillMoreWorks = false;
			}
		}

		return {
			works,
			stillMoreWorks,
		};
	},

	loadMoreWorks() {
		console.log('SearchModal.loadMoreWorks', this.state.skip + this.state.limit);
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
			<div className={'cltk-modal search-modal ' + (this.props.visible ? 'search-modal--visible' : '')} >
				<div className="close-search">
					<IconButton
						iconClassName={'close-search-icon mdi mdi-close'}
						onClick={this.props.closeSearchModal}
						onTouchTap={this.props.closeSearchModal}
						/>
				</div>

				{this.props.visible ?
					<div>
						<SearchTools
							filters={this.state.filters}
							toggleSearchTerm={this.toggleSearchTerm}
							handleChangeDate={this.handleChangeDate}
							handleChangeTextsearch={this.handleChangeTextsearch}
						/>
						<SearchFilters
							filters={this.state.filters}
							toggleSearchTerm={this.toggleSearchTerm}
						/>

						<section className="search-results">
							<SearchResultsList
								works={this.data.works}
								/>

						</section>

					</div>
					: ""
				}


			</div>
		);
	},
});
