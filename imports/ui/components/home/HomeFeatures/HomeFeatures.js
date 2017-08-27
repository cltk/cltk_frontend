import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql } from 'react-apollo';

const HomeFeatures = ({ worksCount, authorsCount }) => {
	return (
		<section id="features" >

			<div className="feature f1">
				<div className="feature-image-screen" />
				<div className="feature-inner">
					<h3 className="feature-n">{authorsCount}</h3>
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
					<h3 className="feature-n">{worksCount}</h3>
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

					<h3 className="feature-n">0</h3>
					<span className="feature-title">Entities</span>

					<div className="feature-line" />

					<span className="feature-desc">
						Named entities annotated in text and linked to public datasets
					</span>

				</div>

			</div>

		</section>

	);
}

HomeFeatures.propTypes = {
	authorsCount: PropTypes.number,
	entitiesCount: PropTypes.number,
	worksCount: PropTypes.number,
};

const withData = graphql(gql`{
  works_count
  authors_count
}`, {
  options: ({}) => ({
  }),
  props: ({ data: { works_count, authors_count } }) => ({
    worksCount: works_count,
		authorsCount: authors_count,
  }),
});

export default withData(HomeFeatures);
