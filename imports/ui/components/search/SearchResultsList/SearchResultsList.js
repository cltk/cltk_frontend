import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component/lib';

import WorkTeaser from '/imports/ui/components/works/WorkTeaser';

class SearchResultsList extends React.Component {

	isLoading = false
	worksCount = 0

	loadMore() {
		this.isLoading = true;
		this.props.loadMore();
	}

	renderWorks() {
		return this.props.works.map((work) => (
			<WorkTeaser
				key={work.id}
				work={work}
			/>
		));
	}

	render() {
		const masonryOptions = {
			// columnWidth : 400,
			// itemSelector: '.work-teaser',
			isFitWidth: true,
			transitionDuration: 300,
		};

		const works = this.props.works;

		if (this.worksLength !== works.length) {
			this.isLoading = false;
		}

		this.worksLength = works.length;

		return (
			<div className="works-list search-results-list">
				{works.length ?
					<Masonry
						options={masonryOptions}
						className="works-container works-container--grid row"
					>
						{this.renderWorks()}
					</Masonry>
				:
					<div className="works-container works-container--no-results">
						<p className="no-results">
							No results found for your query.
						</p>
					</div>
				}

				{this.props.hasMoreWorks ?
					<div>
					{this.isLoading ?
						<LoadingWell />
					:
						<a
							className="waves-effect waves-light btn-large"
							aria-label="View more"
							onClick={this.loadMore}
						>
							Load more
						</a>
					}
					</div>
				: '' }

			</div>
		);
	}
}

SearchResultsList.propTypes = {
	works: PropTypes.array.isRequired,
	loadMore: PropTypes.func.isRequired,
	hasMoreWorks: PropTypes.bool,
};

export default SearchResultsList;
