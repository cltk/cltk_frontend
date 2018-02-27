import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';

import WorkTeaser from '../../../works/components/WorkTeaser';
import Pagination from '../../../../components/pagination/Pagination';

import './SearchResults.css';


class SearchResults extends React.Component {

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
			fitWidth: true,
			isFitWidth: true,
			transitionDuration: 300,
		};

		const { works, total } = this.props;

		return (
			<div
				className="works-list search-results-list"
			>
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
				<Pagination
					total={total}
					limit={30}
				/>
			</div>
		);
	}
}

SearchResults.propTypes = {
	works: PropTypes.array.isRequired,
};

export default SearchResults;
