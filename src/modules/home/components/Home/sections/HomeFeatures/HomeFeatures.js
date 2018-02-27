import React from 'react';
import PropTypes from 'prop-types';

import './HomeFeatures.css';


const HomeFeatures = ({ collectionsCount, textGroupsCount, worksCount }) => {
	return (
		<section id="features" >

			<div className="feature f1">
				<div className="feature-image-screen" />
				<div className="feature-inner">
					<h3 className="feature-n">{collectionsCount}</h3>
					<span className="feature-title">Collections</span>

					<div className="feature-line" />

					<span className="feature-desc">
						Independent groups of classical texts maintained by open source communities
					</span>
				</div>
			</div>
			<div className="feature f2">
				<div className="feature-image-screen" />
				<div className="feature-inner">
					<h3 className="feature-n">{textGroupsCount}</h3>
					<span className="feature-title">Text Groups</span>

					<div className="feature-line" />

					<span className="feature-desc">
						Text groups that may reflect authorship or be a standalone corpus (<a href="http://cite-architecture.github.io/ctsurn/overview/" target="_blank" rel="noopener noreferrer">read more</a>)
					</span>
				</div>
			</div>
			<div className="feature f3">
				<div className="feature-image-screen" />
				<div className="feature-inner">

					<h3 className="feature-n">{worksCount}</h3>
					<span className="feature-title">Works</span>

					<div className="feature-line" />

					<span className="feature-desc">
						Classical works in multiple languages, with metadata, criticism, and commentary
					</span>

				</div>

			</div>

		</section>

	);
}

HomeFeatures.propTypes = {
	collectionsCount: PropTypes.number,
	textGroupsCount: PropTypes.number,
	worksCount: PropTypes.number,
};

export default HomeFeatures;
