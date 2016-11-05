HomeFeatures = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData() {
		let authorsCount = 0;
		let worksCount = 0;
		let entitiesCount = 0;

		worksCount = Counts.get('worksCount');
		authorsCount = Counts.get('authorsCount');

		return {
			authorsCount,
			worksCount,
			entitiesCount,
		};
	},

	render() {

		return (
			<section id="features" >

				<div className="feature f1">
					<div className="feature-image-screen" />
					<div className="feature-inner">
						<h3 className="feature-n">{this.data.authorsCount}</h3>
						<span className="feature-title">Authors</span>

						<div className="feature-line" />

						<span className="feature-desc">
							Classical authors with books and works included in the archive
						</span>
					</div>
				</div>
				<div className="feature f2">
					<div className="feature-image-screen" />
					<div className="feature-inner">
						<h3 className="feature-n">{this.data.worksCount}</h3>
						<span className="feature-title">Works</span>

						<div className="feature-line" />

						<span className="feature-desc">
							Works in multiple languages, with metadata, criticism, and commentary
						</span>
					</div>
				</div>
				<div className="feature f3">
					<div className="feature-image-screen" />
					<div className="feature-inner">

						<h3 className="feature-n">{this.data.entitiesCount}</h3>
						<span className="feature-title">Entities</span>

						<div className="feature-line" />

						<span className="feature-desc">
							Named entities annotated in text and linked to public datasets
						</span>

					</div>

				</div>

			</section>

		);
	},
});
