import React from 'react';
import PropTypes from 'prop-types';

class ReadingWorkHeader extends React.Component {

	render() {
		const { author, englishTitle, originalTitle } = this.props;

		return (
			<section className="page-head fullscreen image-bg ">

				<div className="background-image-holder less-blur blur">
					<img className="background-image" alt="background" src="/images/temple.jpg" />
				</div>

				<div className="background-screen reading-page-background-screen" />

				<div className="container v-align-transform">
					<div className="row">
						<div className="col-sm-10 col-sm-offset-1 text-center">
							<div className="work-authors">
								<a
									href={`/authors/${author.id}/${author.slug}`}
									className="work-author"
								>
									<h4>
										{author.name}
										{author.original_name ?
										<span className="work-author-original-name">
											({author.original_name})
										</span>
										: ''}
									</h4>
								</a>
							</div>

							<div className="work-title-outer">
								<h1 className="work-title">
									{englishTitle}
								</h1>
								{originalTitle ?
									<span className="work-original-title">
										{originalTitle}
									</span>
									:
									''
								}
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

ReadingWorkHeader.propTypes = {
	author: PropTypes.object.isRequired,
	englishTitle: PropTypes.string.isRequired,
	originalTitle: PropTypes.string.isRequired,
};

export default ReadingWorkHeader;
