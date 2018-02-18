import React from 'react';
import Masonry from 'react-masonry-component/lib';
import PropTypes from 'prop-types';

class BookshelfList extends React.Component {
	render() {
		const masonryOptions = {
			isFitWidth: true,
			transitionDuration: 300,
		};

		return (
			<div className="works-list works-list--bookshelf">
				{this.props.works && this.props.works.length ?
					<Masonry
						options={masonryOptions}
						className="works-container works-container--grid row"
					>
						{this.props.works.map((work, i) => (
							<WorkTeaser
								key={i}
								work={work}
							/>
						))}
					</Masonry>
				:
					<div>
						<p className="no-results no-results--bookshelf">
							You do not have any works saved on your bookshelf yet. <a href="/browse">Add one by browsing the corpora.</a>
						</p>
					</div>
				}
			</div>
		);
	}
};

BookshelfList.propTypes = {
	works: PropTypes.array,
};

export default BookshelfList;
