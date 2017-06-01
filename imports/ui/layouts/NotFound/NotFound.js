import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

// layouts
import Header from '/imports/ui/components/header/Header';

// components
import BackgroundImageHolder from '/imports/ui/components/pages/BackgroundImageHolder';

// lib
import muiTheme from '/imports/lib/muiTheme';

const NotFound = React.createClass({

	propTypes: {
		isTest: React.PropTypes.bool,
	},

	childContextTypes: {
		muiTheme: React.PropTypes.object.isRequired,
	},

	getChildContext() {
		return { muiTheme: getMuiTheme(muiTheme) };
	},

	render() {
		const expressionsOfWoe = [
			'ἰὼ ἰώ',
			'αἶ, αἶ',
			'οἴμοι μοι',
			'φεῦ φεῦ',
			'ἰώ μοί μοι',
			'ὦ Ζεῦ',
			'βοᾷ βοᾷ',
			'αἰαῖ αἰαῖ',
			'ἔα ἔα',
			'ὀττοτοτοτοτοῖ',
			'ἄλγος ἄλγος βοᾷς',
			'ἐλελεῦ',
			'μὴ γένοιτο',
			'οὐαί'
		];
		let randomExpression = expressionsOfWoe[Math.round(Math.random() * expressionsOfWoe.length)];

		// If this is just a test, set the same expression each time to not disrupt snapshot
		if (this.props.isTest) {
			randomExpression = 'ὦ Ζεῦ';
		}

		return (
			<div className="chs-layout master-layout not-found-layout">
				<Header />
				<div className="page page-not-found content primary">

					<section className="block header header-page	cover parallax">
						<BackgroundImageHolder
							imgSrc="/images/odysseus.jpg"
						/>

						<div className="container v-align-transform">
							<div className="grid inner">
								<div className="center-content">
									<div className="page-title-wrap">
										<h1 className="page-title">
											{randomExpression}, 404 Error!
										</h1>
										<h2>Viewing this page is against the will of the gods</h2>
										<h4>(Or there's an error somewhere).</h4>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="page-content container">
						<p>
							Are you sure this is where you wanted to go?	If not, please return to the previous page with the back button.
						</p>
						<p>
							If this is a persistent error, please send us an email at <a href="mailto:muellner@chs.harvard.edu">muellner@chs.harvard.edu</a> and lament your woes (hexameter preferred).
						</p>
						<p>
							Please include what paths you were wandering and what device you were using when you went astray.
						</p>
						<p>
							Many thanks,
						</p>
						<p>
							The CHS IT team
						</p>
					</section>
				</div>
			</div>
		);
	},
});

export default NotFound;
