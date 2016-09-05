SearchView = React.createClass({

	propTypes: {
	},

	mixins: [ReactMeteorData],

	getMeteorData() {
		const query = {};

		return {
			works: Works.find(query, { sort: { author: 1, title: 1 } }).fetch(),
			currentUser: Meteor.user(),
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
			<div className="page page-search">

				<section className="page-head fullscreen image-bg bg-dark">

					<div className="background-image-holder less-blur blur">
						<img className="background" alt="background" src="/images/library-428034.jpg" />
					</div>

					<div className="background-screen light" />

					<div className="container v-align-transform">
						<div className="row">
							<div className="col-sm-10 col-sm-offset-1 text-center">
								<h1 className="mb40 mb-xs-16 large">
									Search
								</h1>
							</div>
						</div>

					</div>

				</section>

				<section className="page-content">
					{this.renderWorks}

				</section>


			</div>
		);
	},
});
