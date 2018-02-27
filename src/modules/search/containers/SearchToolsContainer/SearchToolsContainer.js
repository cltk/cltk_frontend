import React from 'react';
import { withRouter } from 'react-router';
import { compose } from 'react-apollo';
import autoBind from 'react-autobind';

import SearchTools from '../../components/SearchTools';
import languageListQuery from '../../../languages/graphql/queries/list';


class SearchToolsContainer extends React.Component {

	constructor(props) {
		super(props);
		autoBind(this);
	}


	handleSubmit(values) {
		this.props.router.push({
			pathname: '/browse',
			query: {
				textsearch: values.textsearch,
				language: values.language,
			},
		});
	}

	render() {
		let languages = [];
		let language = null;
		let textsearch = null;

		if (
      this.props.languageListQuery
      && this.props.languageListQuery.languages
      && this.props.languageListQuery.languages.length
    ) {
			languages = this.props.languageListQuery.languages;
		}

		if (this.props.location.query) {
			textsearch = this.props.location.query.textsearch;
			language = this.props.location.query.language;
		}

		return (
			<SearchTools
				onSubmit={this.handleSubmit}
				initialValues={{
					textsearch,
					language,
				}}
				languages={languages}
      />
		);
	}
}

export default compose(
  withRouter,
  languageListQuery,
)(SearchToolsContainer);
