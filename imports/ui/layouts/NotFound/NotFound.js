import React from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Header from '/imports/ui/components/header/Header';
import BackgroundImageHolder from '/imports/ui/components/pages/BackgroundImageHolder';
import muiTheme from '/imports/lib/muiTheme';

class NotFound extends React.Component {

	getChildContext() {
		return { muiTheme: getMuiTheme(muiTheme) };
	}

	render() {
		return (
			<div className="cltk-layout master-layout not-found-layout">
				<Header />
				<div className="page page-not-found content primary">

					<section className="block header header-page	cover parallax">
						<BackgroundImageHolder
							imgSrc="/images/aeneid-demo-image-2.jpg"
						/>

						<div className="container v-align-transform">
							<div className="grid inner">
								<div className="center-content">
									<div className="page-title-wrap">
										<h1 className="page-title">
											Page not found, 404
										</h1>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="page-content container">
						<p>
							Page not found.
						</p>
					</section>
				</div>
			</div>
		);
	}
}

NotFound.childContextTypes = {
	muiTheme: PropTypes.object.isRequired,
};

export default NotFound;
