

HomeFeatures = React.createClass({

	render() {
		return (
			<section id="features" >

				<div className="feature f1">
					<div className="feature-image-screen" />
					<div className="feature-inner">
						<h3 className="feature-n">137</h3>
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
						<h3 className="feature-n">482</h3>
						<span className="feature-title">Texts</span>

						<div className="feature-line" />

						<span className="feature-desc">
							Texts in multiple languages, with metadata, criticism, and commentary
						</span>
					</div>
				</div>
				<div className="feature f3">
					<div className="feature-image-screen" />
					<div className="feature-inner">

						<h3 className="feature-n">1,427</h3>
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
