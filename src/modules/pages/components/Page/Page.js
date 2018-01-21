import React from 'react';
import PropTypes from 'prop-types';

class Page extends React.Component {

	render() {
		const { page, slug, loading } = this.props;
		const headerImageUrl = '/images/apotheosis_homer.jpg';

		if (loading) {
			return (
				<div>Loading</div>
			);
		} else if (!loading && !page) {
			return (
				<div>Not found</div>
			);
		}

		if (page && page.title) {
			// Utils.setTitle(`${page.title} | ${settings.title}`);
		}
		if (headerImageUrl) {
			// Utils.setMetaImage(headerImageUrl);
		}

		return (
			// todo: return 404 if !page.length
			<div className={`page page-${slug} content primary`}>

				<section className="block header header-page cover parallax">
					{/* <BackgroundImageHolder */}
					{/* imgSrc="/images/apotheosis_homer.jpg" */}
					{/* /> */}

					<div className="container v-align-transform">
						<div className="grid inner">
							<div className="center-content">
								<div className="page-title-wrap">
									<h1 className="page-title">
										{page.title}
									</h1>
									<h2>
										{page.subtitle}
									</h2>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="page-content container">
					{page.byline ?
						<div className="page-byline">
							<h3>
								{page.byline}
							</h3>
						</div>
						: ''}
					<div dangerouslySetInnerHTML={{ __html: page.content }} />
				</section>
			</div>
		);
	}
}

Page.propTypes = {
	slug: PropTypes.string,
	page: PropTypes.object,
	ready: PropTypes.bool,
	images: PropTypes.array,
	thumbnails: PropTypes.array,
	loading: PropTypes.bool,
	settings: PropTypes.object,
};

export default Page;
