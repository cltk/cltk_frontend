import Works from '/imports/collections/works';
import Authors from '/imports/collections/authors';

import Masonry from 'react-masonry-component/lib';

WorksList = React.createClass({

	propTypes: {
		limit: React.PropTypes.number,
		skip: React.PropTypes.number,
	},

	mixins: [ReactMeteorData],

	getMeteorData() {
		const query = {};
		let works = [];
		const limit = this.props.limit || 15;
		const skip = this.props.skip || 0;
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
	},

	renderWorks() {
		return this.data.works.map((work) => (
			<WorkTeaser
				key={work._id}
				work={work}
			/>
		));
	},

	render() {
		const masonryOptions = {
			isFitWidth: true,
			transitionDuration: 300,
		};

		return (
			<div className="works-list">
				{this.data.works.length ?
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
	},
});
