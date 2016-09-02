WorksList = React.createClass({

	propTypes: {
	},

	mixins: [ReactMeteorData],

	getMeteorData() {
		const query = {};

		const works = Works.find(query,
			{ sort: { 'author.english_name': 1, english_title: 1 } }).fetch();

		works.forEach((work, i) => {
			works[i].authors = Authors.find({ _id: { $in: work.authors } }).fetch();
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
		return (
			<div className="works-list">
			{this.renderWorks()}
			</div>
		);
	},
});
