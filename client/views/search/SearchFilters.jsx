import RaisedButton from 'material-ui/RaisedButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

SearchFilters = React.createClass({

	propTypes: {
		filters: React.PropTypes.array.isRequired,
		toggleSearchTerm: React.PropTypes.func,
	},

	childContextTypes: {
		muiTheme: React.PropTypes.object.isRequired,
	},

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	},

	getMeteorData() {

		return {
			authors: [],
		}
	},

	render() {
		const self = this;
		return (
			<div className="filters">
				{this.props.filters.map((filter, i) => ((['lineFrom', 'lineTo'].indexOf(filter.key) < 0) ?
					<div
						key={i}
						className={`filter filter-${filter.key}`}
					>
						<span className="filter-key paper-shadow">{filter.key}</span>
						{filter.values.map((val, j) => {
							if (['dateFrom', 'dateTo', 'hasViewer', 'textsearch'].indexOf(filter.key) >= 0) {
								return (
									<RaisedButton
										key={j}
										labelPosition="before"
										className="filter-val no-cursor-pointer"
										label={val.title || val.name || val}
									/>
								);
							}else if (['authors'].indexOf(filter.key) >= 0) {
								return (
									<RaisedButton
										key={j}
										labelPosition="before"
										className="filter-val "
										label={val.english_name || val.original_name}
										onClick={self.props.toggleSearchTerm.bind(null, filter.key, val)}
									>
										<i className="mdi mdi-close" />
									</RaisedButton>
								);
							}
							return (
								<RaisedButton
									key={j}
									labelPosition="before"
									className="filter-val "
									label={val.title || val.name || val}
									onClick={self.props.toggleSearchTerm.bind(null, filter.key, val)}
								>
									<i className="mdi mdi-close" />
								</RaisedButton>
							);
						})}
					</div>
					:
					''
				))}
			</div>
		);
	},
});
