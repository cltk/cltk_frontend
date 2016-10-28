

BrowseView = React.createClass({

	propTypes: {
	},


	render() {
		return (
			<div className="page page-browse">

				<section className="page-head fullscreen image-bg bg-dark">

					<div className="background-image-holder more-blur blur">
						<img className="background-image" alt="background" src="/images/books4.jpg" />
					</div>

					<div className="background-screen light" />

					<div className="container v-align-transform">
						<div className="row">
							<div className="col-sm-10 col-sm-offset-1 text-center">
								<h1 className="mb40 mb-xs-16 large">
									Browse
								</h1>
							</div>
						</div>

					</div>

				</section>

				<section className="page-content">
					<WorksList />
				</section>


			</div>
		);
	},
});
