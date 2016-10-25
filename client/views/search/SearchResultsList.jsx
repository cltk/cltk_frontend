import Masonry from 'react-masonry-component/lib';

SearchResultsList = React.createClass({

	propTypes: {
		works: React.PropTypes.array.isRequired,
	},

	renderWorks() {
		return this.props.works.map((work) => (
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
			<div className="works-list search-results-list">
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
