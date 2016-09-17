

HomeGetStarted = React.createClass({

	render() {
		return (
			<section id="get-started" className="bg-gray" >
				<div className="container text-center">
					<div className="row">
						<h2 className="section-title">Get Started </h2>
						<hr className="section-header-line" />
						<h4 className="uppercase" >
							Browse the authors, poets, and historians in the archive
						</h4>
					</div>
				</div>
				<WorksList />
				<div className="container text-center">
					<div className="row">
						<a className="waves-effect waves-light btn-large" aria-label="View more">View more</a>
					</div>
				</div>
			</section>

		);
	},
});
