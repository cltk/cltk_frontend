import React from 'react';
import Masonry from 'react-masonry-component/lib';
import PropTypes from 'prop-types';

import WorkTeaser from '../../../works/components/WorkTeaser';

class WorksList extends React.Component {

	renderWorks() {
		const { works } = this.props;
		if (!works) {
			return null;
		}

		return works.map((work) => (
			<WorkTeaser
				key={work._id}
				work={work}
			/>
		));
	}

	render() {
		const masonryOptions = {
			isFitWidth: true,
			transitionDuration: 300,
		};

		const { works } = this.props;

		return (
			<div className="works-list">
				{works && works.length ?
					<Masonry
						options={masonryOptions}
						className="works-container works-container--grid row"
					>
						{this.renderWorks()}
					</Masonry>
					:
					<div className="reading-loading">
						<div className="well-spinner-double">
							<div className="double-bounce1" />
							<div className="double-bounce2" />
						</div>
					</div>
				}
			</div>
		);
	}
}

WorksList.propTypes = {
	limit: PropTypes.number,
	skip: PropTypes.number,
};


export default WorksList;
