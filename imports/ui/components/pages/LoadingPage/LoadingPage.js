import React from 'react';

const LoadingPage = React.createClass({
	render() {
		return (
			<div className="loading">
				<section className="block header header-page cover">
					<div className="block-screen brown" />
					<div className="container v-align-transform">
						<div className="row">
							<div className="col-sm-10 col-sm-offset-1 text-center" />
						</div>
					</div>
				</section>
				<section className="page-content">
					<div className="loading-mock content-filler content-filler-1" />
					<div className="loading-mock content-filler content-filler-2" />
				</section>
			</div>
		);
	},
});

export default LoadingPage;
