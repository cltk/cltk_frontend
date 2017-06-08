import React from 'react';
import { Meteor } from 'meteor/meteor';
import Masonry from 'react-masonry-component/lib';
import { createContainer } from 'meteor/react-meteor-data';

import Works from '/imports/api/collections/works';
import Authors from '/imports/api/collections/authors';

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
	limit: React.PropTypes.number,
	skip: React.PropTypes.number,
};

export default createContainer(props => {
	const query = {};
	let works = [];
	const limit = props.limit || 15;
	const skip = props.skip || 0;
	const handle = Meteor.subscribe('works', query, skip, limit);
	if (handle.ready()) {
		works = Works.find(query,
			{
				sort: {
					english_tile: 1,
				},
			}
		).fetch();

		works.forEach((work, i) => {
			if ('authors' in work) {
				works[i].authors = Authors.find({
					_id: {
						$in: work.authors,
					},
				}).fetch();
			} else {
				works[i].authors = [];
			}
		});
	}

	works.sort((a, b) => {
		if (a.authors.length && b.authors.length) {
			if (a.authors[0].english_name > b.authors[0].english_name) {
				return 1;
			} else if (b.authors[0].english_name > a.authors[0].english_name) {
				return -1;
			}
		}
		return 0;
	});

	if (limit) {
		works = works.splice(0, limit);
	}

	return {
		works,
	};
}, WorksList);
