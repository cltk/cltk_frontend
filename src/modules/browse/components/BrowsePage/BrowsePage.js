import React from 'react';
import { withRouter } from 'react-router';

import SearchToolsContainer from '../../../search/containers/SearchToolsContainer';
import SearchResultsContainer from '../../../search/containers/SearchResultsContainer';

import './BrowsePage.css';

class BrowsePage extends React.Component {

	render() {
		let textsearch = this.props.location.query.textsearch;
		let language = this.props.location.query.language;
		let page = parseInt(this.props.location.query.page, 10) || 1;

		return (
			<div className="page pageBrowse">
				<div
					className="pageBrowseHead"
					style={{
						backgroundImage: 'url(/images/chariots_boar.jpg)',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				/>
				<div className="pageBrowseSearchTools">
					<SearchToolsContainer />
				</div>
				<section className="pageContent">
					<SearchResultsContainer
						textsearch={textsearch}
						language={language}
						offset={Math.abs(page - 1) * 30}
					/>
				</section>
			</div>
		);
	}
}
export default withRouter(BrowsePage);
