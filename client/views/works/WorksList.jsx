import Masonry from 'react-masonry-component/lib';

WorksList = React.createClass({

	propTypes: {
		limit: React.PropTypes.number,
	},

	mixins: [ReactMeteorData],

	getMeteorData() {
		const query = {};
		let works = [];
		const limit = this.props.limit || null;
		const handle = Meteor.subscribe('works', query);
		if (handle.ready()) {
			works = Works.find(query,
				{
					sort: {
						english_tile: 1,
					},
				}
			).fetch();

			works.forEach((work, i) => {
				works[i].authors = Authors.find({
					_id: {
						$in: work.authors,
					},
				}).fetch();
			});
		}

		works.sort((a, b) => {
			if (a.authors[0].english_name > b.authors[0].english_name) {
				return 1;
			} else if (b.authors[0].english_name > a.authors[0].english_name) {
				return -1;
			}
			return 0;
		});

		works = works.splice(0, limit);

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
				<Masonry
					options={masonryOptions}
					className="works-container works-container--grid row"
				>
					{this.renderWorks()}
				</Masonry>
			</div>
		);
	},
});
