

HomeIntro = React.createClass({
	propTypes: {
		showSearchModal: React.PropTypes.func.isRequired,
	},

	render() {
		return (
			<section id="intro" className="cover fullscreen image-bg bg-dark ">

				<div className="background-image-holder less-blur blur">
					<img src="/images/column.jpg" role="presentation" />
				</div>
				<div className="background-screen light" />

				<div className="container v-align-transform header-container">
					<div className="row">

						<div className="header-center text-center">

							<h1>Explore open classical literature</h1>
							<input
								className="header-search"
								type="text"
								placeholder="Search . . ."
								readOnly
								onClick={this.props.showSearchModal}
								onTouchTap={this.props.showSearchModal}
								/>

							<h6 className="uppercase mb16">
								Read classical works in Greek, Latin, Chinese, Coptic, and Pali <br />
								and research metadata on your favorite texts.
							</h6>

							<a
								className="waves-effect waves-light btn-large"
								href="#beliefs" aria-label="Learn More"
							>
								Learn More
							</a>

						</div>

					</div>

				</div>

			</section>

		);
	},
});
