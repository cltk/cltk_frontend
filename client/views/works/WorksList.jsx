import Masonry from 'react-masonry-component/lib';

WorksList = React.createClass({

	propTypes: {
	},

	mixins: [ReactMeteorData],

	getMeteorData() {
		const query = {};
		let works = [];
		// const handle = Meteor.subscribe('works', query, 0, 9);
		// if (handle.ready()) {
		works = Works.find(query,
				{ sort: { english_title: 1 } }).fetch();

		works.forEach((work, i) => {
			works[i].authors = Authors.find({ _id: { $in: work.authors } }).fetch();
		});

		works.sort((a, b) => {
			if (a.authors[0].english_name > b.authors[0].english_name) {
				return 1;
			} else if (b.authors[0].english_name > a.authors[0].english_name) {
				return -1;
			}
			return 0;
		});
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
			// columnWidth : "400px",
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
