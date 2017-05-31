
HomeIntro = React.createClass({
	propTypes: {
		showSearchModal: React.PropTypes.func.isRequired,
	},

	scrollDown() {
		$('html, body').animate({ scrollTop: $('#get-started').offset().top - 100 }, 300);
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
								Read and research works in Chinese, Coptic,
								Greek, Hebrew, Latin, Pali, Punjabi, Sanskrit,
								<br />
								Telugu, and Tibetan and contribute annotations to the community.
							</h6>

							<a
								className="waves-effect waves-light btn-large"
								href="#get-started"
								aria-label="Learn More"
								onClick={this.scrollDown}
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
