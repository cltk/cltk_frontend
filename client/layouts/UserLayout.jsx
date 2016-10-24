UserLayout = React.createClass({
	render() {
		return (
			<div className="cltk-layout user-layout">
				<div className="master-content">
					<Header />
					<main>
						<div className="page page-user-profile">

							<section className="page-head fullscreen image-bg bg-dark">

								<div className="background-image-holder more-blur blur">
									<img className="background-image" alt="background" src="/images/books4.jpg" />
								</div>

								<div className="background-screen light" />

								<div className="container v-align-transform">
									<div className="row">
										<div className="col-sm-10 col-sm-offset-1 text-center">
											{/* <h1 className="mb40 mb-xs-16 large">
												Browse
											</h1>*/}
										</div>
									</div>

								</div>

							</section>
							<div className="content primary row">
								<div className="col-md-8">
									<Profile />
								</div>
								<div className="col-md-4">
									<div>
										<BookmarkList />
									</div>
									<div>
										<NotesList />
									</div>
								</div>
							</div>
						</div>
					</main>
					<Footer />
				</div>
			</div>
		);
	},

});
